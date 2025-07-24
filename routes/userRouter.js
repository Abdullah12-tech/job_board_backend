const express = require("express")
const userRouter = express.Router()
const {
    getAllCandidates,
    getAllEmployers
} = require("../controllers/userController")
userRouter.get("/candidates", getAllCandidates)
userRouter.get("/employers", getAllCandidates)

module.exports = userRouter