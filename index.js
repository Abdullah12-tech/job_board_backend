const express = require("express")
const app = express()
const cors = require("cors")
const connectToDb = require("./config/connectToDb")
const authRouter = require("./routes/authRouter")
const morgan = require("morgan")
const errorHandler = require("./middlewares/errorHandler")
const jobRouter = require("./routes/jobRouter")
const appRouter = require("./routes/appRouter")
const candidateRouter = require("./routes/candidateRouter")
const employerRouter = require("./routes/employerRouter")
const adminRouter = require("./routes/AdminRouter")
const userRouter = require("./routes/userRouter")
require("./services/nodemailer/transporter")
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
const port = 4000
app.listen(port,()=>{
    console.log("Listening on port " + port);
})
connectToDb()

// app.use("/api/users", userRouter)
app.use("/api/jobs", jobRouter)
app.use("/api/applications", appRouter)
app.use("/api/auth", authRouter)
app.use("/api/candidates", candidateRouter)
app.use("/api/company", employerRouter)
app.use("/api/admin", adminRouter) 
app.use("/api/users", userRouter) 


app.all("/{*any}", (req,res)=>{
    res.status(400).json(`${req.method} ${req.originalUrl} is not an endpoint on this server`)
})
app.use(errorHandler)
