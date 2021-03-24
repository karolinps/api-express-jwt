const express = require("express");
const pruebaController = require("../controllers/prueba");
const verifyToken = require("../middleware/verify-token");

const api = express.Router();

api.get("/protected", verifyToken, pruebaController.routeProtected);

module.exports = api;
