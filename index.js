const express = require("express");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server run in port ${PORT}`);
});
