const categoryModel = require("../models/userDetailsModel")
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
const getAllEmployers = async (req,res,next)=>{
    try {
        
    } catch (err) {
        console.log(err);
        next(err);
    }
}
const getAllCandidates = async (req,res,next)=>{
    try {
        const candidates = await userModel.find({role: "candidate"})
        if(!candidates){
            return res.status(400).json({
                message: "No candidate found",
                status: "error"
            })
        }
        return res.status(400).json(candidates);
    } catch (err) {
        console.log(err);
        next(err);
    }
}
const deleteUser = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const deletedUser = await userModel.findByIdAndDelete(id);
        if(deletedUser){
            return res.status(400).json({
                message: "user not deleted",
                status: "error"
            })
        }
        return res.status(200).json({
            message: "User has been deleted",
            status: "error"
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = {
    getAllUsers,
    getSingleUser,
    deleteUser,
    addUser
}