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
    hrEmail: {
        type: String,
    },
    skills: {
        type: [String],
    },
    type: {
        type: String,
        enums: ['Full-time','Internship','Temporary','Contract','Permanent','Part-time']
    },
    workType: {
        type: String,
        enums: ['Hybrid','Onsite','Remote']
    },
    location: {
        type: String,
        default: "Remote"
    },
    salaryRange: {
        min: Number,
        max: Number,
        currency:{
            type: String,
            default: "USD"
        }
    },
    category: {
        type: String
    },
    benefits: {
        type: [String],
    },
    requirements: {
        type: [String],
    },
    datePosted: {
        type: String,
        default: Date.now()
    },
    deadline: {
        type: String,
    },
})

const jobModel = mongoose.model("jobs", jobSchema)
module.exports = jobModel