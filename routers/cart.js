require("dotenv").config();
require("../db/dbConnection");
// require("bson");
const express = require("express");
const router = express.Router();
const cartSchema = require("../model/cartSchema");
const { verifiToken } = require("../middleware/jwt");
const User = require("../model/userShema");
const cart = require("../model/cartSchema");

// router.post("/:id", async (req, res) => {
//     try {
//         const addingOrders = new cartSchema(req.body);
//         await User.findOneAndUpdate({ _id: req.params.id }, { $push: { cart: addingOrders._id } })
//         await addingOrders.save();
//         res.status(201).send("Inserted data successfully.")
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Order failed")
//     }
// });

router.post("/", verifiToken, async (req, res) => {
    try {
        req.body.map(async (item) => {
            if (item.quantity > 0) {
                let productChecker = false
                for (let i of req.userData[0].cart) {
                    if (JSON.stringify(item._id) == JSON.stringify(i.productId)) {
                        productChecker = { _id: i._id, productId: item._id }
                    }
                }
                if (!!productChecker) {
                    await cart.findByIdAndUpdate({ _id: productChecker._id }, { quantity: item.quantity })
                }
                else {
                    // let userInfo = await User.findById({ _id: req.userData[0]._id }).populate("cart");
                    let { quantity, price, image, name } = item;
                    const getResponse = new cart({ quantity, price, image, name });
                    await User.findByIdAndUpdate({ _id: req.userData[0]._id }, { $push: { cart: getResponse._id } });
                    await getResponse.save();
                    await cart.findByIdAndUpdate({ _id: getResponse._id }, { $push: { productId: item._id } })
                }
            }
        });
        res.status(200).send("cart data inserted.");
    } catch (error) {
        console.log(error);
        res.status(500).send("Cart is not inserted successfully.");
    }
});

router.get("/:productId", async (req, res) => {
    try {
        const addingOrders = await cartSchema.find({}).populate("productId");
        res.status(201).send(addingOrders);
    } catch (error) {
        console.log(error);
        res.status(500).send("User failed")
    }
});

module.exports = router;