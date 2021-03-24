const mongoose = require("mongoose");
require('dotenv').config();

// Conexión a Base de datos
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log("error db:", e));
