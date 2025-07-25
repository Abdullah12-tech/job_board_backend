const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinaryConfig = require("./cloudinary");
const multer = require("multer")
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryConfig,
  params: {
    folder: "resumes",
    allowed_formats: ['pdf', 'doc', 'docx'],
    resource_type: "raw",
  },
});

const uploadResume = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
    }
  }
});

module.exports = uploadResume;