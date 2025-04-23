const mongoose = require("mongoose");
const { userSchema } = require("./user");
const { DataNotFoundError } = require("../../utils/customError");

const db = {
  user: mongoose.model("user", userSchema),
};

const { Schema } = mongoose;

const meetingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    attendeesStatus: [
      {
        attendee: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        status: {
          type: String,
          enum: ["Pending", "Accepted", "Declined"],
          default: "Pending",
          required: true,
        },
      },
    ],
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "meeting",
  }
);

// 🧹 Automatically filter out soft-deleted meetings
meetingSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

// Validate creator and attendees before saving
meetingSchema.pre("save", async function (next) {
  try {
    // cheak if creator is valid
    const creator = await db.user.findById(this.createdBy);
    if (!creator) {
      throw new DataNotFoundError("Creator not found");
    }

    for (const id of this.attendees) {

      // cheak if all the attendies are valid
      const attendee = await db.user.findById(id);
      if (!attendee) {
        throw new DataNotFoundError(`User not found with ID: ${id}`);
      }

      // cheak if creator is blocked by any attendies
      if (attendee.blockedUser.includes(this.createdBy)) {
        const error = new DataNotFoundError(
          `You are blocked by user: ${attendee.userName}`
        );
        error.status = 403;
        return next(error);
      }
    }

    next();
  } catch (err) {
    next(err);
  }
});

const Meeting = mongoose.model("meeting", meetingSchema);

module.exports = Meeting;