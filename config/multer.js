const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const cloudinaryConfig = require("./cloudinary");
const storage = new CloudinaryStorage({
    cloudinary: cloudinaryConfig,
    params: {
        folders: "/jumia-products",
        allowedFormat: ['png','jpg','gif'],
        transformation: [{width: 500,height: 500}]
    }
})
const uploadResume = multer(storage);
module.exports = uploadResume