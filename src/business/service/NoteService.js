import Note from "../../models/Note";
import { validationResult } from "express-validator";

//Consult the all Notes and return it
module.exports.findAllNotes = async (req, res) => {
  const perPage = 20;
  const page = req.params.page || 1;
  try {
    return res.json({
      Notes: await Note.find({
        user_creator_mail: req.authData.mail,
      })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean(),
      totalPages: Math.ceil((await Note.count()) / perPage),
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/**
 * Find the Note by document and return it
 */
module.exports.findOneNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.noteId,
    }).lean();
    if (note == null) {
      return res.status(403).json({ msg: "No se encontró la nota" });
    } else {
      return res.json({ note: note });
    }
  } catch (error) {
    return res.status(403).json({ msg: "No se pudo encontrar la nota" });
  }
};

/**
 * Get the body in a object
 * Cast the req.body object to model object
 * Save object
 */
module.exports.saveNewNote = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(412).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const note = Note(req.body);
    note.user_creator_mail = req.authData.mail;
    return res.json({ Note: await note.save() });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/**
 *  Delete Note
 */
module.exports.deleteNote = async (req, res) => {
  try {
    await Note.findOneAndDelete({ _id: req.params.noteId });
    return res.json({ msg: "Se eliminó la nota exitosamente" });
  } catch (error) {
    return res.status(403).json({ msg: "No se encontró lo nota" });
  }
};
