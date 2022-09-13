import User from "../../models/User";
import { validationResult } from "express-validator";
import JwtService from "./JwtService";

module.exports.signUp = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(412).json({
      success: false,
      errors: errors.array(),
    });
  }

  const newUser = req.body;

  const savedUser = await User.findOne({ mail: newUser.mail });
  if (savedUser) {
    return res.status(422).json({ error: "El usuario ya existe" });
  }
  newUser.password = await User.encryptPassword(newUser.password);

  const user = new User(newUser);

  user
    .save()
    .then((user) => {
      res.json({ msg: "Usuario creado exitosamente" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(412).json({
      success: false,
      errors: errors.array(),
    });
  }

  const userToLogin = req.body;

  const savedUser = await User.findOne({ mail: userToLogin.mail }).lean();
  if (!savedUser) {
    return res.status(422).json({ error: "Email invalido" });
  }
  if (await User.comparePassword(userToLogin.password, savedUser.password)) {
    return JwtService.sign(savedUser, res);
  } else {
    return res.status(422).json({ error: "Email o contraseña invalida" });
  }
};
