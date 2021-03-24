const Joi = require("@hapi/joi");
const User = require("../models/user");

const schemaRegister = Joi.object({
  name: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(255).required(),
});

const singUp = async (req, res) => {
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
  const user = new User({ name, email, password });

  try {
    const savedUser = await user.save();

    res.status(200).json({
      message: "Se ha registrado exitosamente",
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  singUp,
};
