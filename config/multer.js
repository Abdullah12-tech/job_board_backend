const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const cloudinaryConfig = require("./cloudinary");
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryConfig,
  params: {
    folder: "resumes", //
    resource_type: "raw", // 
    format: async (req, file) => {
      return file.mimetype.split("/")[1]; // e.g., 'pdf'
    },
    public_id: (req, file) => {
      return `resume-${Date.now()}`; 
    },
  },
});

const uploadResume = multer({ storage });
module.exports = uploadResume;
