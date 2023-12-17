const jwt = require("jsonwebtoken");
const User = require("../model/userShema");
require("dotenv").config();
require("../db/dbConnection");

const accessToken = (data) => {
    const token = jwt.sign(data, "secretKey");
    // console.log(token); accessToken = id dungi to token milega , virifiToken =  token dungi to id milega
    return token
}

// accessToken = id dungi to token milega , virifiToken =  token dungi to id milega
const verifiToken = async (req, res, next) => {
    try {
        if (req.headers.seingtoken) {
            const token = req.headers.seingtoken;
            const tr = jwt.verify(token, process.env.SECRATE_KEY || 'secretKey');
            // console.log(tr,"TR....");
            const user = await User.find({ _id: tr }).populate("cart");
            // const user = await knex("user").where({ user_id: tr });
            req.userData = user;
            next();
        } else {
            res.send("token has expire");
        }
    } catch (error) {
        console.log(error);
        res.send("token has expaire",error);
    }
};
module.exports = { accessToken, verifiToken: verifiToken };