const mongoose = require("mongoose");
const { Schema } = mongoose;

const userTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    token: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "user_token",
  }
);

const userToken = mongoose.model("userToken", userTokenSchema);

module.exports = userToken;
