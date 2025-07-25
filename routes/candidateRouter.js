const express = require("express");
const candidateRouter = express.Router();
const { getCandidateProfile, updateCandidateProfile } = require("../controllers/candidateController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isCandidate = require("../middlewares/isCandidate");

candidateRouter.get("/", isLoggedIn,isCandidate, getCandidateProfile);
candidateRouter.patch("/", isLoggedIn, updateCandidateProfile);
module.exports = candidateRouter;
