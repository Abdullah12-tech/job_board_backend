const transporter = require("./transporter")
const sendApplication = (email, firstname, employer,jobname) => {
    const options = {
        from: "CareerFuse Careerfuse@gmail.com",
        to: email,
        replyTo: "careerfuse@gmail.com",
        subject: `Application sent to ${employer} for ${jobname}`,
        html: `
        <div>
            Hi ${firstname},
        </div>
        <p style="margin: 20px 0;">
            Thanks for applying to ${employer}, We have recieved your application, we will give you feedback soon
        </p>
    `
    }
    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Email has been sent");
            console.log(info);
        }
    })
}
module.exports = sendApplication;