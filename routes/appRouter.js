const express = require("express")
const { addBlog } = require("../controllers/jobController")
const blogRouter = express.Router()

blogRouter.post("/", addBlog)
module.exports = blogRouter