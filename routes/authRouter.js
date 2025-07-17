const express = require("express")
const { signUp, login, verifyEmail, findEmail, verifyPasswordReset, fetchCurrentUser } = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const authRouter = express.Router()

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.get("/user",isLoggedIn, fetchCurrentUser);
authRouter.post("/verify/:token", verifyEmail);
authRouter.post("/findEmail", findEmail);
authRouter.post("/verifyPass/:token", verifyPasswordReset);
module.exports = authRouter