const productModel = require("../models/productModel")

const getAllProducts = async (req, res) => {
    const products = await productModel.find().populate("seller category")
    if (!products) {
        res.status(400).json({
            message: "products not found",
            status: "error"
        })
    }
    res.json({
        message: "products has been gotten",
        status: "success",
        products
    })
}
const addProduct = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({message: "file not found"})
    }
    const image = req.file.path
    try {
        const product = await productModel.create({...req.body, seller: req.user._id,image})
        if (!product) {
            res.status(400).json({
                message: "product not created",
                status: "error"
            })
        }
        res.json({
            message: "product has added",
            status: "success",
        })
    } catch (err) {
        console.log(err);

    }
}
const getSingleProduct = async (req, res) => {
    const { id } = req.params;
    const product = await productModel.findById(id)
    if (!product) {
        return res.status(400).json({
            message: "product not found",
            status: "error"
        })
    }
    res.status(200).json({
        message: "product found",
        status: "success",
        product
    })
}

module.exports = {
    getAllProducts,
    addProduct,
    getSingleProduct
}