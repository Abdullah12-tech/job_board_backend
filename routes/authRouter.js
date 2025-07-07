const express = require("express")
const { signUp, login, verifyEmail, findEmail, verifyPasswordReset } = require("../controllers/authController")
const authRouter = express.Router()

authRouter.post("/signup", signUp)
authRouter.post("/login", login)
authRouter.post("/verify/:token", verifyEmail)
authRouter.post("/findEmail", findEmail)
authRouter.post("/verifyPass/:token", verifyPasswordReset)
module.exports = authRouter