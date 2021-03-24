const express = require("express");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//import routes
const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);

module.exports = app;
