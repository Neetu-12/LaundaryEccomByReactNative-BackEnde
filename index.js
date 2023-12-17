require("dotenv").config();
require("./db/dbConnection");
const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000;
app.use(cors()); // dATA READABLE FRONT-END & BACK-END
app.use(express.json()); // without using this getting undefiend.

app.use(("/product", require("./routers/product")));
app.use(("/user"), require("./routers/user"));
app.use(("/cart"), require("./routers/cart"));

app.listen(PORT, () => {
    console.log("Runing sever");
});