const { userSchema } = require("./user");
const mongoose = require("mongoose");
const db = {
  user: mongoose.model("user", userSchema),
};
const {
  DataNotFoundError,
  BadRequestError,
} = require("../../utils/customError");
const { Schema } = mongoose;

const meetingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
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
});

meetingSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

meetingSchema.pre("save", async function (next) {
  const creator = await db.user.findById(this.createdBy);
  if (!creator) {
    throw new DataNotFoundError("Creator not found");
  }
  for (let id of this.attendees) {
    const attendee = await db.user.findById(id);
    if (!attendee) {
      throw new DataNotFoundError(`User not found ${attendee.userName}`);
    }
    if (attendee.blockedUser.includes(this.createdBy)) {
      const error = new DataNotFoundError(
        `User not found ${attendee.userName}`
      );
      error.status = 403;
      return next(error);
    }
  }
  next();
});

const meeting = mongoose.model("meeting", meetingSchema);

module.exports = meeting;
