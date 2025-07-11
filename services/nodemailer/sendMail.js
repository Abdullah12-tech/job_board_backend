const transporter = require("./transporter");


const sendVerificationEmail = (email,userFirstName, token)=>{
    const options = {
        from: "CareerFuse Careerfuse@gmail.com",
        to: email,
        replyTo: "careerfuse@gmail.com",
        subject: "Verify your Account",
        html: `
        <div>
            Hi ${userFirstName},
        </div>
        <p style="margin: 20px 0;">
            <a href="${process.env.client_domain}/verify-account/${token}" style="display: inline-block; padding: 12px 24px; background-color: #007bff;color: white; text-decoration: none; border-radiud: 5px; font-weight: bold;">
                Verify my Email
            </a>
        </p>
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