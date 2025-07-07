const mongoose = require("mongoose")
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
    datePosted: {
        type: String,
    },
    skills: {
        type: String,
    },
    benefits: {
        type: String,
    },
    requirements: {
        type: String,
    },
    datePosted: {
        type: String,
    },
    skills: {
        type: String,
    },
})

const jobModel = mongoose.model("jobs", jobSchema)
module.exports = jobModel