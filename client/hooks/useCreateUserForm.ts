import { useState } from "react";
import { NewUser } from "@/interfaces/userInterfaces";

/**
 * Funzione di validazione dei dati del form per la creazione di un nuovo utente.
 * Verifica se tutti i campi sono compilati correttamente e se rispettano le regole specifiche.
 *
 * @param {NewUser} formData - I dati del nuovo utente da validare.
 * @returns {{ [key: string]: string }} Oggetto che contiene gli errori di validazione, se presenti.
 *
 * @example
 * const errors = validateInputs({ nome: "Mario", cognome: "Rossi", email: "invalid-email", dataNascita: "2010-01-01" });
 * // errors = { email: "Inserisci un'email valida.", dataNascita: "Devi avere almeno 14 anni." }
 */
function validateInputs(formData: NewUser): { [key: string]: string } {
  const errors: { [key: string]: string } = {};
  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const currentYear = new Date().getFullYear();
  const userBirthYear = new Date(formData.dataNascita).getFullYear();

  if (!formData.nome.trim()) {
    errors.nome = "Il nome è obbligatorio.";
  } else if (!nameRegex.test(formData.nome.trim())) {
    errors.nome = "Il nome può contenere solo lettere e spazi.";
  }

  if (!formData.cognome.trim()) {
    errors.cognome = "Il cognome è obbligatorio.";
  } else if (!nameRegex.test(formData.cognome.trim())) {
    errors.cognome = "Il cognome può contenere solo lettere e spazi.";
  }

  if (!formData.email.trim()) {
    errors.email = "L'email è obbligatoria.";
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = "Inserisci un'email valida.";
  }

  if (!formData.dataNascita.trim()) {
    errors.dataNascita = "La data di nascita è obbligatoria.";
  } else if (currentYear - userBirthYear < 14) {
    errors.dataNascita = "Devi avere almeno 14 anni.";
  }

  return errors;
}

/**
 * Custom hook per gestire lo stato e la logica di un form per la creazione di un nuovo utente.
 * Gestisce la validazione dei dati, la gestione degli errori e l'invio dei dati al server.
 *
 * @param {Function} handleAddUser - Funzione che gestisce l'aggiunta di un nuovo utente.
 * @param {Function} onClose - Funzione per chiudere il form dopo l'invio o la cancellazione.
 * @returns {{
 *   formData: NewUser;
 *   formErrors: { [key: string]: string };
 *   errorMessage: string | null;
 *   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 *   handleSubmit: (e: React.FormEvent) => void;
 *   handleCancel: () => void;
 *   setFormData: React.Dispatch<React.SetStateAction<NewUser>>;
 *   setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
 * }} Oggetto contenente lo stato del form, le funzioni di gestione e gli eventuali errori.
 *
 * @example
 * const { formData, handleChange, handleSubmit, formErrors } = useCreateUserForm(handleAddUser, onClose);
 */
export function useCreateUserForm(
  handleAddUser: (newUser: NewUser) => void,
  onClose: () => void
) {
  const [formData, setFormData] = useState<NewUser>({
    nome: "",
    cognome: "",
    email: "",
    dataNascita: "",
    fotoProfilo: "",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Gestisce il cambiamento dei valori nei campi del form.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - L'evento di cambiamento.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Gestisce l'invio del form. Se i dati sono validi, invia i dati tramite `handleAddUser`.
   *
   * @param {React.FormEvent} e - L'evento di invio del form.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateInputs(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await handleAddUser(formData);
      setFormData({
        nome: "",
        cognome: "",
        email: "",
        dataNascita: "",
        fotoProfilo: "",
      });
      onClose();
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  /**
   * Gestisce l'annullamento del form. Resetta i dati e chiude il form.
   */
  const handleCancel = () => {
    setFormData({
      nome: "",
      cognome: "",
      email: "",
      dataNascita: "",
      fotoProfilo: "",
    });
    setErrorMessage(null);
    onClose();
  };

  return {
    formData,
    formErrors,
    errorMessage,
    handleChange,
    handleSubmit,
    handleCancel,
    setFormData,
    setErrorMessage,
  };
}
