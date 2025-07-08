const express = require("express")
const userRouter = express.Router()
const {getAllUsers, getSingleUser,deleteUser, addUser} = require("../controllers/userController.js")

userRouter.get("/",MiddlewareOne,MiddlewareTwo, getAllUsers)
userRouter.post("/", addUser)
userRouter.get("/:id",MiddlewareOne,MiddlewareTwo, getSingleUser)
userRouter.delete("/:id",MiddlewareOne,MiddlewareTwo, deleteUser)

// function isAbdullah() {
//     console.log("I have modified something");
//     console.log("What is going on there");
// }

module.exports = userRouter