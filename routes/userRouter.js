const express = require("express")
const userRouter = express.Router()
const {
    getAllCandidates,
    getAllEmployers,
    getEmployerById,
    getCandidateById
} = require("../controllers/userController")
userRouter.get("/candidates", getAllCandidates)
userRouter.get("/candidates/:id", getCandidateById)
userRouter.get("/employers", getAllEmployers)
userRouter.get("/employers/:id", getEmployerById)

module.exports = userRouter