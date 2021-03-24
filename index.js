const app = require("./app");
require("./database");
require('dotenv').config();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server run in port ${port}`);
});
