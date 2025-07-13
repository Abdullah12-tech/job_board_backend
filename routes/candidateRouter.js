const express = require("express");
const candidateRouter = express.Router();
const { getCandidateProfile, updateCandidateProfile } = require("../controllers/candidateController");
const isLoggedIn = require("../middlewares/isLoggedIn");

candidateRouter.get("/", isLoggedIn, getCandidateProfile);
candidateRouter.patch("/", isLoggedIn, updateCandidateProfile);

module.exports = candidateRouter;
