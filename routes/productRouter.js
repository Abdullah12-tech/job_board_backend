const express = require("express")
const {getAllProducts, addProduct, getSingleProduct} = require("../controllers/productController")
const isLoggedIn = require("../middlewares/isLoggedIn")
const isVerified = require("../middlewares/isVerified")
const isSeller = require("../middlewares/isSeller")
const uploadImage = require("../config/multer")
// const MiddlewareOne = require("../middlewares/middleware1")
// const MiddlewareTwo = require("../middlewares/middleware2")
const productRouter = express.Router()

productRouter.get("/",isLoggedIn, getAllProducts)
productRouter.get("/:id", getSingleProduct)
productRouter.post("/",isLoggedIn,uploadImage.single("productImage"), addProduct)
module.exports = productRouter