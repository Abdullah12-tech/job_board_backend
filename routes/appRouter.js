const express = require("express");
const { getAllAppicationsForCurrentUser, applyJob } = require("../controllers/appController");
const uploadResume = require("../config/multer");
const appRouter = express.Router()

appRouter.get("/", getAllAppicationsForCurrentUser)
appRouter.post("/", uploadResume.single("resume"), applyJob)
module.exports = appRouter