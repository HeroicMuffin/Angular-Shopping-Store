const User = require("../models/user-model");
const Product = require("../models/product-model")

function getAllUsers() {
    return User.find().exec();
}

function getAllProducts() {
    const result = Product.find().exec();
    return result
}


function checkLoginCredentials(user) {
    return User.findOne({ email: user.email, password: user.password })
}

function getUserByEmail(email) {
    return User.findOne({ email: email })
}

function checkAvailability(user) {
    return User.findOne({
        $or: [
            { email: user.email },
            { _id: user._id }
        ]
    })
}

function addUser(userToAdd) {
    return userToAdd.save()
}

function addProduct(productToAdd) {
    return productToAdd.save();
}

function editProduct(oldP, newP) {
    Product.findOne({ productName: oldP.productName, category: oldP.category }).remove()
    return newP.save()
}


module.exports = {
    getAllUsers, getAllProducts, addUser,
    checkLoginCredentials, checkAvailability,
    getUserByEmail, addProduct, editProduct
}
