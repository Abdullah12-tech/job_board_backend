const express = require("express");
const { postJob, getAllJobs } = require("../controllers/jobController");
const jobRouter = express.Router()

jobRouter.post("/", postJob)
jobRouter.get("/", getAllJobs);

module.exports = jobRouter