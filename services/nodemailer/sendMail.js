const transporter = require("./transporter");


const sendVerificationEmail = (email,userFirstName, token)=>{
    const options = {
        from: "CareerFuse Careerfuse@gmail.com",
        to: email,
        replyTo: "careerfuse@gmail.com",
        subject: "Verify your Account",
        html: `
        <div style="font-family: 'Arial', 'Helvetica Neue', Helvetica, sans-serif; color: #333333; max-width: 600px; margin: 0 auto; line-height: 1.6;">
  <div style="background: #f8f9fa; padding: 30px 20px; text-align: center; border-bottom: 1px solid #e9ecef;">
    <h2 style="color: #007BFF; margin: 0; font-size: 22px;">Email Verification Required</h2>
  </div>
  
  <div style="padding: 30px 20px;">
    <p style="font-size: 16px; margin-bottom: 25px;">Hi <strong>${userFirstName}</strong>,</p>
    
    <p style="font-size: 16px; margin-bottom: 25px;">
      Thank you for registering! Please verify your email address to complete your account setup.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.client_domain}/verify-account/${token}" 
         style="display: inline-block; 
                padding: 14px 28px; 
                background-color: #007BFF; 
                color: white; 
                text-decoration: none; 
                border-radius: 6px; 
                font-weight: bold;
                font-size: 16px;
                box-shadow: 0 2px 5px rgba(0,123,255,0.3);
                transition: background-color 0.3s ease;">
        Verify My Email
      </a>
    </div>

    <p style="font-size: 14px; color: #6c757d; margin-bottom: 5px;">
      If you didn't create an account, you can safely ignore this email.
    </p>
    
    <div style="border-top: 1px solid #e9ecef; padding-top: 20px; margin-top: 30px; font-size: 14px; color: #6c757d;">
      <p style="margin: 0;">Need help? Contact our support team.</p>
    </div>
  </div>
</div>
    `
    };
    transporter.sendMail(options, (err, info)=>{
        if (err) {
            console.log(err.message);
        }else{
            console.log("Email sent successfully");
            console.log(info);
        }
    })
}

module.exports = sendVerificationEmail