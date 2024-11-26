import { body } from "express-validator";
import dayjs from "dayjs";

export const validateUser = [
  body("nome")
    .notEmpty()
    .withMessage("Il nome è obbligatorio")
    .isLength({ min: 2 })
    .withMessage("Il nome deve avere almeno 2 caratteri")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Il nome può contenere solo lettere e spazi"),
  body("cognome")
    .notEmpty()
    .withMessage("Il cognome è obbligatorio")
    .isLength({ min: 2 })
    .withMessage("Il cognome deve avere almeno 2 caratteri")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Il cognome può contenere solo lettere e spazi"),
  body("email")
    .notEmpty()
    .withMessage("L'email è obbligatoria")
    .isEmail()
    .withMessage("Inserire un'email valida"),
  body("dataNascita")
    .notEmpty()
    .withMessage("La data di nascita è obbligatoria")
    .isISO8601()
    .withMessage("Inserire una data valida (formato ISO8601, es. YYYY-MM-DD)")
    .custom((value) => {
      const age = dayjs().diff(dayjs(value), "year");
      if (age < 14) {
        throw new Error("Devi avere almeno 14 anni");
      }
      return true;
    }),
  body("fotoProfilo")
    .optional()
    .isURL()
    .withMessage("Inserire un URL valido per la foto profilo"),
];
