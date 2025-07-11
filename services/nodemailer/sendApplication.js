const transporter = require("./transporter")
const sendApplicationFeedback = async ({ applicantEmail, applicantName, jobTitle, companyName }) => {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Application Received</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          line-height: 1.6;
          background-color: #f9f9f9;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          background: #fff;
          padding: 30px;
          margin: auto;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
        }
        .header h1 {
          color: #007bff;
        }
        .content {
          font-size: 16px;
        }
        .footer {
          margin-top: 30px;
          font-size: 13px;
          text-align: center;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Application Received</h1>
        </div>
        <div class="content">
          <p>Hi <strong>${applicantName}</strong>,</p>
          <p>Thank you for applying for the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>.</p>
          <p>We’ve received your application and our team will review your profile shortly. If you are shortlisted, we’ll be in touch with the next steps.</p>
          <p>We appreciate your interest and wish you the best of luck!</p>
          <p>Best regards,<br />
          <strong>${companyName} Team</strong></p>
        </div>
        <div class="footer">
          This is an automated message. Please do not reply.
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"${companyName}" <${process.env.EMAIL_USER}>`,
    to: applicantEmail,
    subject: 'Application Received - Thank You!',
    html: htmlTemplate
  });
};
module.exports = sendApplicationFeedback;