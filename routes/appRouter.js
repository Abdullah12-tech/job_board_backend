const express = require("express")
const { addBlog } = require("../controllers/jobController")
const { getAllAppicationsForCurrentUser } = require("../controllers/appController")
const appRouter = express.Router()

appRouter.post("/", getAllAppicationsForCurrentUser)
module.exports = appRouter