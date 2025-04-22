const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Sends an email using nodemailer
 * @param {string} to - Recipient's email address
 * @param {string} subject - Email subject
 * @param {string} html - Email body in HTML format
 * @param {string} [from=process.env.EMAIL_USER] - Optional sender name/email
 */
const sendEmail = async (to, subject, html, from = `"Yash" <${process.env.EMAIL_USER}>`) => {
  try {
    await transporter.sendMail({ to, from, subject, html });
    console.log(`✅ Email sent successfully to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
