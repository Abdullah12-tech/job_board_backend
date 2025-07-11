const mongoose = require("mongoose")
const appSchema = new mongoose.Schema({
    applicants: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enums: ['applied','viewed','saved','expired','rejected']
    },
    appliedAt: {
        type: Date,
        default: Date.now()
    },
    resume: {
        type: String,
    },
    coverLetter: {
        type: String
    },
    jobID: {
        type: mongoose.Schema.ObjectId,
        ref: "jobs"
    }
})

const appModel = mongoose.model("applications", appSchema)
module.exports = appModel