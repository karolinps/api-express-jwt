const jwt = require("jsonwebtoken");

//Middleware para routes protected
const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "La petición no tiene la cabecera de autenticación" });
  }
  let token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token no válido" });
  }
};

module.exports = verifyToken;
