const express = require("express");
const { postJob, getAllJobs, getJobById, deleteJob, updateJob } = require("../controllers/jobController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const jobRouter = express.Router()

jobRouter.post("/",isLoggedIn, postJob)
jobRouter.get("/", getAllJobs);
jobRouter.get("/:id", getJobById);
jobRouter.delete("/:id", deleteJob);
jobRouter.patch("/:id", updateJob);

module.exports = jobRouter