const categoryModel = require("../models/categoryModel")
const userModel = require("../models/userModel")

const getAllUsers = async (req, res)=>{
    const users = await userModel.find()
    if (!users) {
        return res.status(400).json({
            message: "Can't find users",
            status: "error"
        })
    }
    res.status(200).json({
        message: "This are all the users",
        status: "success",
        users
    })
}

const getSingleUser = (req, res)=>{
    res.json("single user")
    console.log("user added");
    
}
const addUser = async (req,res) =>{
    try {
        const user = await userModel.create(req.body)
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "user not added"
            })
        }
        res.status(201).json({
            status: "success",
            message: "user has been added",
            user
        })
    } catch (err) {
        console.log(err);
    }
}

const deleteUser = (req, res)=>{
    res.json("deleted user")
}

module.exports = {
    getAllUsers,
    getSingleUser,
    deleteUser,
    addUser
}