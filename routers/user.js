require("dotenv").config();
require("../db/dbConnection");
const express = require("express");
const router = express.Router();
const user = require("../model/userShema");
const { accessToken, verifiToken } = require("../middleware/jwt");

router.post("/createAcount", async (req, res) => {
    try {
        const { email } = req.body;
        const checkUser = await user.findOne({ email });
        if (checkUser) {
            return res.status(403).json({ message: "Email exist" });
        }
        const addingUserDails = new user(req.body);
        await addingUserDails.save();
        res.status(201).json({ message: "Inserted data successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).send("Something is wrong failed");
    }
});

router.post("/userLogin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await BillingDetails.findOne({ email });
        if (!checkUser) {
            return res.status(404).json({ message: "Invalid email or password" });
        }
        if (checkUser.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = accessToken(checkUser._id.toString());
        res.status(200).json({ message: "Inserted data successfully.", token })

    } catch (error) {
        console.log(error);
        res.status(500).send("User failed");
    }
});

router.post("/billingDetails", verifiToken, async (req, res) => {
    try {
        const { SelectedDate, selectedTime, DeliveryDays } = req.body;
        if ((!!SelectedDate) && (!!selectedTime) && (!!DeliveryDays)) {
            // await user.orderInfo.findByIdAndUpdate({ _id: req.userData[0].orderInfo[0]._id }, {  SelectedDate, selectedTime, DeliveryDays  });
            await user.findByIdAndUpdate({ _id: req.userData[0]._id }, { $push: { orderInfo: { SelectedDate, selectedTime, DeliveryDays } } });
        }
        res.status(201).json({ message: "Inserted data successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).send("Something is wrong failed");
    }
});

router.get("/", verifiToken, async (req, res) => {
    try {
        let resBillingDetails = req.userData[0]
        resBillingDetails.email = "";
        resBillingDetails.password = "";
        res.status(201).send(resBillingDetails);
    } catch (error) {
        console.log(error);
        res.status(500).send("User failed")
    }
});

router.get("/billDetails", verifiToken, async (req, res) => {
    try {
        let resBillingDetails = req.userData[0]
        resBillingDetails.email = "";
        resBillingDetails.password = "";
        res.status(201).send(resBillingDetails);
    } catch (error) {
        console.log(error);
        res.status(500).send("User failed")
    }
});

module.exports = router;