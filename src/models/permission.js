const mongoose = require("mongoose");
const { Schema } = mongoose;

const permissionSchema = new Schema(
  {
    entity: {
      type: Schema.Types.ObjectId,
      ref: "entity",
      required: false,
    },
    actionName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    baseUrl: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "permission",
  }
);

// 🔍 Exclude soft-deleted roles by default on all find queries
permissionSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

const permission = mongoose.model("permission", permissionSchema);

module.exports = permission;
