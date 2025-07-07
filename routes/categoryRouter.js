const express = require("express")
const { addCategory, getAllCategory } = require("../controllers/categoryController")
const categoryRouter = express.Router()

categoryRouter.post("/", addCategory)
categoryRouter.get("/", getAllCategory)

module.exports = categoryRouter