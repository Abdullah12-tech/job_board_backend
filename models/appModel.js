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
        type: String,
        required: true
    },
    resume: {
        type: String,
    },
    jobID: {
        type: mongoose.Schema.ObjectId,
        ref: "jobs"
    }
})

const appModel = mongoose.model("applications", appSchema)
module.exports = appModel