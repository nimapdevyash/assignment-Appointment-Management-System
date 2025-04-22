const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, 
    },
    description: {
      type: String,
      trim: true,
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "permission",
      },
    ],
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "role",
  }
);

// 🔍 Exclude soft-deleted roles by default on all find queries
roleSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

const Role = mongoose.model("role", roleSchema);

module.exports = Role;
