const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productName: String,
    category: String,
    price: String,
    picture: String
}, { versionKey: false });

const Product = mongoose.model("product", productSchema, "products");

module.exports = Product;
