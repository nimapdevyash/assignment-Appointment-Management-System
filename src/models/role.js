const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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

roleSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

const role = mongoose.model("role", roleSchema);

module.exports = role;
