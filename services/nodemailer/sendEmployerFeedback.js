const transporter = require("./transporter");
const sendEmployerNotification = async ({
  employerEmail,
  employerName,
  applicantName,
  jobTitle,
  resumeLink,
  coverLetterText
}) => {
  try {

    const htmlTemplate = `
      <div style="font-family: 'Arial', 'Helvetica Neue', Helvetica, sans-serif; color: #333333; max-width: 600px; margin: 0 auto; line-height: 1.6;">
  <div style="background: #007BFF; padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">New Job Application Received</h1>
  </div>
  
  <div style="padding: 20px;">
    <h2 style="color: #007BFF; margin-top: 0;">Hello ${employerName},</h2>
    <p style="font-size: 16px;">You have received a new application for <strong style="color: #007BFF;">${jobTitle}</strong> position.</p>
    
    <div style="background: #f8f9fa; border-radius: 5px; padding: 15px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #495057;">Applicant Details:</h3>
      <ul style="padding-left: 20px; margin-bottom: 0;">
        <li style="margin-bottom: 8px;"><strong style="color: #343a40;">Name:</strong> ${applicantName}</li>
      </ul>
    </div>

    <h3 style="color: #007BFF; margin-bottom: 10px;">Cover Letter:</h3>
    <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #007BFF; border-radius: 0 4px 4px 0; font-style: italic;">
      ${coverLetterText}
    </div>

    <div style="text-align: center; margin: 25px 0;">
      <a href="${resumeLink}" target="_blank" style="display: inline-block; background: #007BFF; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold;">
        View Resume
      </a>
    </div>

    <div style="border-top: 1px solid #e9ecef; padding-top: 20px; margin-top: 20px; font-size: 14px; color: #6c757d;">
      <p style="margin: 0;">Regards,<br>The Job Board Team</p>
    </div>
  </div>
</div>
    `;

    const mailOptions = {
      from: `"JobFuse" <${process.env.nodemailer_mail}>`,
      to: employerEmail,
      subject: `New Application for ${jobTitle}`,
      html: htmlTemplate
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${employerEmail}:`, info.messageId);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw new Error(`Failed to send confirmation email: ${error.message}`);
  }
};

module.exports = sendEmployerNotification;