import { useState } from "react";
import { NewUser } from "@/interfaces/userInterfaces";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
