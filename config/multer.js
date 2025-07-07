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
const uploadImage = multer(storage);
module.exports = uploadImage