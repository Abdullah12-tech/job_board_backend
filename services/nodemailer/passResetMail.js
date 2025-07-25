const transporter = require("./transporter")

const sendPasswordResetEmail = (email,firstName,token) =>{
    const options = {
        from: "JobFuse JobFuse@gmail.com",
        to: email,
        subject: "Reset your password for jobfuse Account",
        replyTo: "sheiriffabdullah200@gmail.com",
        html: `
            <div style="font-family: 'Arial', 'Helvetica Neue', Helvetica, sans-serif; color: #333333; max-width: 600px; margin: 0 auto; line-height: 1.6; border: 1px solid #e9ecef; border-radius: 8px; overflow: hidden;">
  <div style="background: #f8f9fa; padding: 20px; text-align: center; border-bottom: 1px solid #e9ecef;">
    <h2 style="color: #dc3545; margin: 0; font-size: 22px;">Password Reset Request</h2>
  </div>
  
  <div style="padding: 30px;">
    <h3 style="color: #212529; margin-top: 0; font-size: 18px;">Hello ${firstName},</h3>
    
    <p style="font-size: 16px; margin-bottom: 25px;">
      We received a request to reset your password. Click the button below to proceed:
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.client_domain}/reset-password/${token}" 
         style="display: inline-block; 
                padding: 14px 28px; 
                background-color: #dc3545; 
                color: white; 
                text-decoration: none; 
                border-radius: 6px; 
                font-weight: bold;
                font-size: 16px;
                box-shadow: 0 2px 5px rgba(220,53,69,0.3);
                transition: background-color 0.3s ease;">
        Reset Password
      </a>
    </div>

    <p style="font-size: 14px; color: #6c757d; margin-bottom: 5px;">
      <strong>Important:</strong> This link will expire in 1 hour for security reasons.
    </p>
    
    <p style="font-size: 14px; color: #6c757d; margin-bottom: 5px;">
      If you didn't request this password reset, please ignore this email or 
      <a href="mailto:support@yourdomain.com" style="color: #dc3545;">contact support</a> 
      if you have concerns.
    </p>
    
    <div style="border-top: 1px solid #e9ecef; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #6c757d;">
      <p style="margin: 0 0 5px 0;">For your security:</p>
      <ul style="margin: 0; padding-left: 20px;">
        <li>Never share this link with anyone</li>
        <li>Our team will never ask for your password</li>
        <li>Change your password regularly</li>
      </ul>
    </div>
  </div>
</div>
        `
    }
    transporter.sendMail(options, (err,info)=>{
        if (err) {
            console.log("Email not sent");
        }else{
            console.log("Password reset email has been sent");
        }
    })
}


module.exports = sendPasswordResetEmail