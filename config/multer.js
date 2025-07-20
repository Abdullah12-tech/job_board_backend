const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinaryConfig = require("./cloudinary");
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryConfig,
  params: {
    folder: "resumes", // use a meaningful folder name
    allowed_formats: ['pdf', 'doc', 'docx'], // only valid resume formats
    resource_type: "raw", // very important for PDFs and DOCX
  },
})
const uploadResume = multer({storage});
module.exports = uploadResume;