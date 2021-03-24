const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const schemaRegister = Joi.object({
  name: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(255).required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(255).required(),
});

const singUp = async (req, res) => {
  try {
    //validamos campos users
    const { error } = schemaRegister.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    //capturamos los values desde el body
    const { name, email, password } = req.body;

    const emailExist = await User.findOne({ email: email });
    //Validamos si ya existe el correo en la db
    if (emailExist) {
      return res.status(400).json({
        message: "Este email ya está registrado",
      });
    }

    //Creamos un new object user
    const user = new User({
      name,
      email,
      password: await User.encryptPassword(password),
    });

    const savedUser = await user.save();

    res.status(200).json({
      message: "Se ha registrado exitosamente",
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const singIn = async (req, res) => {
  try {
    //Validate campos
    const { error } = schemaLogin.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    //Validate si existe usario
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "El usuario no existe" });
    }
    const validatePassword = await User.comparePassword(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      return res.status(400).json({ message: "La contraseña es invalida" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 86400,
    });

    res.json({ data: user, token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  singUp,
  singIn,
};
