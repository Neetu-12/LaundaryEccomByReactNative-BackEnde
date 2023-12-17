require("dotenv").config();
require("../db/dbConnection");
require("bson");
const express = require("express");
const router = express.Router();
const productSchema = require("../model/productSchema");
const  {verifiToken}  = require("../middleware/jwt");

router.post("/products", async (req, res) => {
    try {
        const addingProduct = new productSchema(req.body);
        await addingProduct.save();
        res.status(201).send("Inserted data successfully.")
    } catch (error) {
        console.log(error);
        res.status(500).send("Order failed")
    }
});

router.get("/product", async (req, res) => {
    try {
        const addingProduct = await productSchema.find({});
        // console.log(addingProduct);
        res.status(200).send(addingProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send("Product data read failed")
    }
});

// router.get("/", async (req, res) => {
//     try {
//         const addingOrders = await cartSchema.find({}).populate("productId");
//         res.status(201).send(addingOrders);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("User failed")
//     }
// });

module.exports = router;