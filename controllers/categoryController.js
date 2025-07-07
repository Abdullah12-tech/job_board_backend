const categoryModel = require("../models/categoryModel")

const addCategory = async (req, res) =>{
    const category = await categoryModel.create(req.body)
    if (!category) {
        return res.status(400).json({
            status: "error",
            message: "category not added"
        })
    }
    res.status(201).json({
        status: "success",
        message: "category has been added",
        category
    })
}
const getAllCategory = async (req, res) =>{
    const category = await categoryModel.find()
    if (!category) {
        return res.status(400).json({
            status: "error",
            message: "category not added"
        })
    }
    res.status(201).json({
        status: "success",
        message: "category has been added",
        category
    })
}
module.exports = {
    addCategory,
    getAllCategory
}