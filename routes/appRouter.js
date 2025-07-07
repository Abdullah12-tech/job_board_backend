const express = require("express")
const { addBlog } = require("../controllers/blogController")
const blogRouter = express.Router()

blogRouter.post("/", addBlog)
module.exports = blogRouter