const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set the storage engine for multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dest = "public/uploads/";

    // Ensure the directory exists or create it
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    cb(null, dest);
  },
  filename(req, file, cb) {
    const fileName = `${file.originalname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, fileName);
  },
});

// File type validation
function checkFileType(file, cb) {
  const allowedFileTypes = [".xlsx"];

  // Extract the file extension
  const fileExtension = path.extname(file.originalname).toLowerCase();

  // Check if the file extension is allowed
  if (allowedFileTypes.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
}

// Initialize the multer upload
exports.upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB file size limit
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).fields([{ name: "file", maxCount: 1 }]);
