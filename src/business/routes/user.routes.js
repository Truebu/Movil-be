import { Router } from "express";
import { body } from "express-validator";
import userService from "../service/UserService";
import JwtService from "../service/JwtService";

const router = Router();

router.post(
  "/signup",
  body("name")
    .exists()
    .withMessage("El nombre es requerido.")
    .isLength({ min: 3, max: 255 })
    .withMessage("El nombre debe ser mayor a 3 caracteres.")
    .matches("^[a-zA-Z0-9À-ÿñÑ\\s]*$")
    .withMessage("El nombre debe ser alfanúmerico sin caracteres especiales."),
  body("mail")
    .exists()
    .withMessage("El email es requerido.")
    .isLength({ min: 3, max: 255 })
    .withMessage("El email debe ser mayor a 3 caracteres.")
    .isEmail()
    .withMessage("El email contiene caracteres no permitidos."),
  body("password")
    .exists()
    .withMessage("La constraseña es requerida.")
    .isLength({ min: 8, max: 255 })
    .withMessage("La contrasena debe ser mayor a 8 caracteres.")
    .matches("^[a-zA-Z0-9ñÑÀ-ÿ+\\s]*$")
    .withMessage("El nombre debe ser alfanúmerico sin caracteres especiales."),
  userService.signUp
);

router.post(
  "/login",
  body("mail")
    .exists()
    .withMessage("El email es requerido.")
    .isLength({ min: 3, max: 255 })
    .withMessage("El email debe ser mayor a 3 caracteres.")
    .isEmail()
    .withMessage("El email contiene caracteres no permitidos."),
  body("password")
    .exists()
    .withMessage("La constraseña es requerida.")
    .isLength({ min: 8, max: 255 })
    .withMessage("La contrasena debe ser mayor a 8 caracteres.")
    .matches("^[a-zA-Z0-9ñÑÀ-ÿ+\\s]*$")
    .withMessage("El nombre debe ser alfanúmerico sin caracteres especiales."),
  userService.login
);

export default router;
