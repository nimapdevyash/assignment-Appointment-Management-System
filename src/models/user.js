const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

/**
 * User Schema Definition
 */
const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },

    userName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    mobileNumber: {
      type: String,
      unique: true,
    },

    role: {
      type: Schema.Types.ObjectId,
      ref: "role",
      required: true,
    },

    blockedUser: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
        default: [],
      },
    ],

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "user",
  }
);

// 🔐 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 🔐 Hash password before updating
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this._update;

  if (update.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(update.password, salt);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

// 🧹 Exclude soft-deleted users by default
userSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

// 🧪 Compare password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
