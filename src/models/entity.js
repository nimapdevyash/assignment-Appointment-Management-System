const mongoose = require("mongoose");
const { Schema } = mongoose;

const entitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "entity",
  }
);

// 🔍 Exclude soft-deleted roles by default on all find queries
entitySchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

const entity = mongoose.model("entity", entitySchema);

module.exports = entity;
