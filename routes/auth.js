const express = require("express");
const authController = require("../controllers/auth");

const api = express.Router();

api.post("/singup", authController.singUp);
api.post("/singin", authController.singIn);

module.exports = api