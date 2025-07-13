const express = require("express");
const { getAllApplicationsForCurrentUser, applyJob } = require("../controllers/appController");
const uploadResume = require("../config/multer");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isCandidate = require("../middlewares/isCandidate");

const appRouter = express.Router();

appRouter.get("/", isLoggedIn, getAllApplicationsForCurrentUser);
appRouter.post("/:jobID",isLoggedIn,isCandidate, uploadResume.single("resume"), applyJob);

module.exports = appRouter;
