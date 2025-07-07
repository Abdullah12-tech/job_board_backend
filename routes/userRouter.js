const express = require("express")
const userRouter = express.Router()
const {getAllUsers, getSingleUser,deleteUser, addUser} = require("../controllers/userController.js")
const MiddlewareOne = require("../middlewares/middleware1.js")
const MiddlewareTwo = require("../middlewares/middleware2.js")
// const MiddlewareOne = require("../middlewares/middleware1.js")
// const MiddlewareTwo = require("../middlewares/middleware2.js")

userRouter.get("/",MiddlewareOne,MiddlewareTwo, getAllUsers)
// userRouter.post("/:id", (req, res)=>{
//     console.log(req.params);
    
//     res.json({
//         message: "User with the id " + req.params.id + " has been added"
//     })
// })
userRouter.post("/", addUser)
userRouter.get("/:id",MiddlewareOne,MiddlewareTwo, getSingleUser)
userRouter.delete("/:id",MiddlewareOne,MiddlewareTwo, deleteUser)

// function isAbdullah() {
//     console.log("I have modified something");
//     console.log("What is going on there");
// }

module.exports = userRouter