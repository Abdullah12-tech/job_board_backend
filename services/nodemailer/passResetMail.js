const transporter = require("./transporter")

const sendPasswordResetEmail = (email,firstName,token) =>{
    const options = {
        from: "Jumia jumia@gmail.com",
        to: email,
        subject: "Reset your password for jumia Account",
        replyTo: "sheiriffabdullah200@gmail.com",
        html: `
            <div>
                <h3>Hello ${firstName}</h3>
                <p>Follow this link to reset your password</p>
                <a href="${process.env.client_domain}/resetpass/${token}">Reset Password</a>
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