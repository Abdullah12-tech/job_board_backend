const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please name is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    featuredImage: {
        type: String,
    },
    tag: {
        type: String,
    }
})
 
const categoryModel = mongoose.model("categories", categorySchema)
module.exports = categoryModel