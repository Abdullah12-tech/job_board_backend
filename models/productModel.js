const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "categories"
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    }
})

const productModel = mongoose.model("products", productSchema)
module.exports = productModel