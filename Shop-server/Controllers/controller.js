const User = require("../models/user-model");
const Product = require("../models/product-model")
const Logic = require("../business-logic/business-logic");
const express = require("express");
const jwt = require("jsonwebtoken");
const { response } = require("express");


const router = express.Router();
const secretKey = "topSecret"

router.get("/", async (request, response) => {
    const token = request.query.token
    if (token !== "null") {
        const decoded = jwt.verify(token, secretKey);
        const email = decoded.email
        const user = await Logic.getUserByEmail(email)
        response.status(200).send(user)
    }
})

router.post("/admin", async (request, response) => {
    const { token } = request.body
    const decoded = jwt.verify(token, secretKey);
    const email = decoded.email
    const user = await Logic.getUserByEmail(email)
    jwt.verify(token, secretKey, (err, verifiedJwt) => {
        if (err) {
            response.send(err.message)
        } else if (user.role === 'Admin') {
            response.status(201).send({ message: "success" })
        }
    })
})

router.get("/getAllUsers", async (request, response) => {
    try {
        const items = await Logic.getAllUsers();
        response.json(items)
    }
    catch (err) {
        response.status(500).send(err.message)
    }
})

router.post("/verify", async (request, response) => {
    const { token } = request.body
    jwt.verify(token, secretKey, (err, verifiedJwt) => {
        if (err) {
            response.send(err.message)
        } else {
            response.status(201).send({ message: "success" })
        }
    })
})

router.post("/register", async (request, response) => {
    try {
        const user = new User(request.body);
        const addedUser = await Logic.addUser(user);
        let payload = { email: user.email }
        const userData = await Logic.getUserByEmail(user.email)
        let token = jwt.sign(payload, secretKey, { expiresIn: "10h" })
        response.status(201).send({ token, userData })
    }
    catch (err) {
        response.status(500).send("Registration error")
    }

})

router.post("/login", async (request, response) => {
    let user = request.body
    const checkExisting = await Logic.checkLoginCredentials(user)
    if (checkExisting) {
        let payload = { email: user.email }
        const userData = await Logic.getUserByEmail(user.email)
        let token = jwt.sign(payload, secretKey, { expiresIn: "10h" })
        response.status(201).send({ token, userData })
    }
    else {
        response.status(500).send("Invalid email or password")
    }
})


router.get("/products", async (request, response) => {
    try {
        const items = await Logic.getAllProducts();
        response.json(items)
    }
    catch (err) {
        response.status(500).send(err.message)
    }
})

router.post("/addProduct", async (request, response) => {
    try {
        const product = new Product(request.body)
        console.log(product);
        await Logic.addProduct(product);
        response.status(200).json({ message: "Product added" })
    }
    catch (err) {
        console.log(err)
        response.status(500).json({ message: err.message })
    }
});

router.post("/editProduct", async (request, response) => {
    try {
        const oldProduct = request.body.product
        const newProduct = new Product(request.body.update)
        console.log(oldProduct, newProduct)
        await Logic.editProduct(oldProduct, newProduct);
        response.status(200).json({ message: "Product Edited" })
    }
    catch (err) {

        response.status(500).json({ message: err.message })
    }
});

router.post("/addShipment", async (request, response) => {
    try {
        const shipment = request.body

        const result = await User.findOneAndUpdate(
            { email: shipment.email },
            { $push: { "shipments": shipment.date } }

        )
        response.status(200).json({ message: "Shipment Added" })
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
});

router.post("/checkAvailabilty", async (request, response) => {
    let credentials = request.body
    const check = await Logic.checkAvailability(credentials)
    if (!check) {
        response.status(201).json({ message: "Success" })
    }
    else {
        response.status(500).json({ message: "Email or ID already in use" })
    }
})

module.exports = router
