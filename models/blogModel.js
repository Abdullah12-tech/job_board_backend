const mongoose = require("mongoose")
const blogSchema = new mongoose.Schema({
    blogName: {
        type: String,
        required: [true, "blog name is required"]
    },
    blogDescription: {
        type: String,
        required: [true, "Description is required"]
    },
    dateCreated: {
        type: Date,
        required: [true, "Date is required"],
        default: new Date()
    },
    blogImage: {
        type: String,
        required: [true, "Image is required"]
    }
})

const blogModel = mongoose.model("blogs", blogSchema)
module.exports = blogModel