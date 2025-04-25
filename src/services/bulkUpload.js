const path = require("path");
const ExcelJS = require("exceljs");
const db = require("../models/index");
const { DataNotFoundError } = require("../../utils/customError");
const { handleSuccess } = require("../../utils/successHandler");

exports.addBulkUpload = async (req, userId) => {
  const file = req?.file?.[0];
  if (!file) throw new DataNotFoundError("No file uploaded.");

  const filePath = file.path;
  const extension = path.extname(file.originalname);
  const fileId = file.filename;

  const parsedData = await parseExcelFile(filePath);

  const bulkUpload = await db.bulkUpload.create({
    user: userId,
    fileId,
    filePath,
    extension,
    status: parsedData.length ? "Success" : "Failed",
  });

  if (parsedData.length > 0) {
    await db.user.insertMany(parsedData, { validate: true });
  }

  return handleSuccess("Data bulk uploaded successfully.");
};

exports.getUploadDetails = async () => {
  const uploads = await db.bulkUpload
    .find({})
    .populate({ path: "user", select: "username email" });

  if (!uploads || uploads.length === 0) {
    throw new DataNotFoundError("No upload records found.");
  }

  const transformed = uploads.map((upload) => {
    const filePath = `${process.env.URL}${upload.filePath.replace("public", "")}`;
    return { ...upload.toObject(), filePath };
  });

  return handleSuccess("Upload details fetched successfully.", transformed);
};

exports.deleteUploadDetails = async (id) => {
  const upload = await db.bulkUpload.findOne({ id });
  if (!upload) throw new DataNotFoundError("Upload record not found.");

  upload.deletedAt = new Date();
  await upload.save();

  return handleSuccess("Upload record deleted successfully.", upload);
};

// ================================
// Utilities
// ================================

async function parseExcelFile(filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const sheet = workbook.getWorksheet(1);
  
  if (!sheet) return [];

  const headers = extractHeaders(sheet);
  return extractRows(sheet, headers);
}

function extractHeaders(sheet) {
  const headers = [];
  sheet.getRow(1).eachCell((cell) => {
    const raw = typeof cell.value === "string" ? cell.value : "";
    const header = raw.trim(); 
    headers.push(header);
  });
  return headers;
}

function extractRows(sheet, headers) {
  const rows = [];

  for (let i = 2; i <= sheet.lastRow.number; i++) {
    const row = sheet.getRow(i);
    const data = {};
    let isFoundValues=false;
    headers.forEach((key, index) => {
      const cellValue = row.getCell(index + 1).value;
      if(!cellValue){
        return;
      }
      if (key) {
        isFoundValues=true;
        data[key] = cellValue;
      }
    });
    if(isFoundValues){
      rows.push(data);
    }
  }
  return rows;
}
