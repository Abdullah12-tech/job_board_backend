const express = require("express");
const { getAllApplicationsForCurrentUser, applyJob } = require("../controllers/appController");
const uploadResume = require("../config/multer");
const isLoggedIn = require("../middlewares/isLoggedIn");

const appRouter = express.Router();

appRouter.get("/", getAllApplicationsForCurrentUser);
appRouter.post("/:jobID",isLoggedIn, uploadResume.single("resume"), applyJob);

module.exports = appRouter;
