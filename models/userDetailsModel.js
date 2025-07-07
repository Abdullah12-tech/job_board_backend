const mongoose = require("mongoose")

const userDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    about: {
        type: String,
    },
    skills: {
        type: String,
    },
    education: {
        type: String,
    }
})
 
const userDetailsModel = mongoose.model("categories", userDetailsSchema)
module.exports = userDetailsModel