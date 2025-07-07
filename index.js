const express = require("express")
const app = express()
const cors = require("cors")
const userRouter = require("./routes/userRouter")
const productRouter = require("./routes/productRouter")
const categoryRouter = require("./routes/categoryRouter")
const blogRouter = require("./routes/appRouter")
const connectToDb = require("./config/connectToDb")
const authRouter = require("./routes/authRouter")
const morgan = require("morgan")
const errorHandler = require("./middlewares/errorHandler")
require("./services/nodemailer/transporter")
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
const port = 4000
app.listen(port,()=>{
    console.log("Listening on port " + port);
})
connectToDb()

app.use("/api/users", userRouter)
app.use("/api/products", productRouter)
app.use("/api/category", categoryRouter)
app.use("/api/blogs", blogRouter)
app.use("/api/auth", authRouter)


app.all("/{*any}", (req,res)=>{
    res.status(400).json(`${req.method} ${req.originalUrl} is not an endpoint on this server`)
})
app.use(errorHandler)
// const zoologist = ()=> {
//     console.log('abdul is my guy')
// }

//MIDDLEWARE

//1. intercept requests before they reach route handlers
//2. have access to the request and response objects
//3. can execute code
//4. 
