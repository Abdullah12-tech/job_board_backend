const mongoose = require("mongoose")
const env = require("dotenv")
env.config()

const mongoUri = process.env.mongo_URI

const connectToDb = async () =>{
    try {
        const dbConnect = await mongoose.connect(mongoUri)

        if (dbConnect) {
            console.log("Connected to db");
        }
    } catch (error) {
        console.log(error); 
    }
}

module.exports = connectToDb