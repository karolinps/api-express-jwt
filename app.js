const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

let corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//import routes
const authRoutes = require("./routes/auth");
const prubaRoutes = require("./routes/prueba");

app.use("/api/auth", authRoutes);
app.use("/api/prueba", prubaRoutes);

module.exports = app;
