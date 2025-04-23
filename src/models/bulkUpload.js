const mongoose = require("mongoose");
const { Schema } = mongoose;

const bulkUploadSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  fileId: {
    type: String,
    trim:true,
    required: true,
  },
  filePath: {
    type: String,
    trim:true,
    required: true,
  },
  extension: {
    type: String,
    trim:true,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Success", "Failed"],
    default: "Pending",
    required: true,
  },
});

const bulkUpload = mongoose.model("bulkUpload", bulkUploadSchema);

module.exports = bulkUpload;