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
      <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Hello ${employerName},</h2>
      <p>You have received a new job application for the position of <strong>${jobTitle}</strong>.</p>
      
      <h3>Applicant Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${applicantName}</li>
      </ul>

      <h3>Cover Letter:</h3>
      <p style="background: #f9f9f9; padding: 10px; border-left: 4px solid #007BFF;">
        ${coverLetterText}
      </p>

      <p>
        <strong>Resume:</strong>
        <a href="${resumeLink}" target="_blank" style="color: #007BFF; text-decoration: underline;">
          Click here to view resume
        </a>
      </p>

      <p>Regards,<br/>Your Job Board Team</p>
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