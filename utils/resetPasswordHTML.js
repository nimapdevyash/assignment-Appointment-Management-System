exports.htmlContent = (resetUrl) => `
  <p style="font-family: Arial, sans-serif; color: #333; font-size: 16px; line-height: 1.5; margin: 0;">
    You requested a password reset for your account. Click the button below to reset your password. The link will expire in 15 minutes.
  </p>
  <p style="text-align: center; margin: 20px 0;">
    <a href="${resetUrl}" 
       style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 4px;">
      Reset Password
    </a>
  </p>
  <p style="font-family: Arial, sans-serif; color: #333; font-size: 16px; line-height: 1.5; margin: 20px 0 0;">
    If you did not request this password reset, please ignore this email or contact support if you have any questions.
  </p>
  <p style="font-family: Arial, sans-serif; color: #777; font-size: 14px; text-align: center; margin: 20px 0 0;">
    Thank you,<br>
    The Zenput Team<br>
    <a href="${
      process.env.URL || "http://localhost:3000"
    }" style="color: #007bff; text-decoration: none;">Visit our website</a>
  </p>
  `;
