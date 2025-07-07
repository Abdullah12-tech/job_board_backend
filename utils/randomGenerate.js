const crypto = require("crypto")
const randomGenerate = (num = 6)=>{
    const token = crypto.randomBytes(num).toString("hex");
    return token
}
module.exports = randomGenerate