import { Router } from "express";
import { body } from "express-validator";
import noteService from "../service/NoteService";
import JwtService from "../service/JwtService";

const router = Router();

router.post(
  "/add",
  [JwtService.verifyToken],
  body("note")
    .exists()
    .withMessage("La nota es requerida.")
    .matches("^[a-zA-Z0-9À-ÿñÑ\\s]*$")
    .withMessage("La nota debe ser alfanúmerico sin caracteres especiales."),
  noteService.saveNewNote
);

router.delete("/delete/:noteId", JwtService.verifyToken, noteService.deleteNote);

router.get("/getPge/:page", JwtService.verifyToken, noteService.findAllNotes);

router.get("/getPge", JwtService.verifyToken, noteService.findAllNotes);

router.get("/get/:noteId", JwtService.verifyToken, noteService.findOneNote);

export default router;
