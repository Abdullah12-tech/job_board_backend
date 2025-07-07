const cloudinary = require("cloudinary");
const env = require("dotenv");
env.config()
cloudinary.config({
    api_key: process.env.cloudinary_api_key,
    cloud_name: process.env.cloudinary_name,
    api_secret: process.env.cloudinary_api_secret
})
module.exports = cloudinary