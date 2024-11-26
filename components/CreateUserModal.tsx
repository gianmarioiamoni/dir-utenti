import { useState } from "react";

import { NewUser } from "@/interfaces/userInterfaces";

function validateInputs(formData: NewUser): { [key: string]: string } {
    const errors: { [key: string]: string } = {};
    const nameRegex = /^[a-zA-Z\s]+$/; // Solo lettere e spazi
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // RegEx per email valide
    const currentYear = new Date().getFullYear();
    const userBirthYear = new Date(formData.dataNascita).getFullYear();

    // Nome
    if (!formData.nome.trim()) {
        errors.nome = "Il nome è obbligatorio.";
    } else if (!nameRegex.test(formData.nome.trim())) {
        errors.nome = "Il nome può contenere solo lettere e spazi.";
    }

    // Cognome
    if (!formData.cognome.trim()) {
        errors.cognome = "Il cognome è obbligatorio.";
    } else if (!nameRegex.test(formData.cognome.trim())) {
        errors.cognome = "Il cognome può contenere solo lettere e spazi.";
    }

    // Email
    if (!formData.email.trim()) {
        errors.email = "L'email è obbligatoria.";
    } else if (!emailRegex.test(formData.email.trim())) {
        errors.email = "Inserisci un'email valida.";
    }

    // Data di nascita
    if (!formData.dataNascita.trim()) {
        errors.dataNascita = "La data di nascita è obbligatoria.";
    } else if (currentYear - userBirthYear < 14) {
        errors.dataNascita = "Devi avere almeno 14 anni.";
    }

    return errors;
}

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleAddUser: (newUser: NewUser) => void;
}


export default function CreateUserModal({
    isOpen,
    onClose,
    handleAddUser
}: CreateUserModalProps): JSX.Element | null {
    const [formData, setFormData] = useState<NewUser>({
        nome: "",
        cognome: "",
        email: "",
        dataNascita: "",
        fotoProfilo: "",
    })

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({}); // errori di validazione

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validazione
        const errors = validateInputs(formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return; // Interrompi se ci sono errori di validazione
        }

        try {
            console.log("handleChange - formData", formData);
            console.log("handleChanege - limit", );
            await handleAddUser(formData);
            setFormData({ nome: "", cognome: "", email: "", dataNascita: "", fotoProfilo: "" });
            onClose();
            setErrorMessage(null)
        } catch (error: any) {
            console.log("handleSubmit: error", error);
            setErrorMessage(error.message);
        }
    };

    const handleCancel = () => {
        setFormData({ nome: "", cognome: "", email: "", dataNascita: "", fotoProfilo: "" });
        setErrorMessage(null);
        onClose();
    };

    return (
        <div className="create-user-modal-div">
            <div className="create-user-modal-main">
                <h2 className="text-xl font-semibold mb-4">Crea Nuovo Utente</h2>
                
                {errorMessage && <p className="text-white bg-bg-error px-4 py-2 rounded mb-4">{errorMessage}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="nome">
                            Nome
                        </label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                        {formErrors.nome && <p className="text-red-500 text-sm">{formErrors.nome}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="cognome">
                            Cognome
                        </label>
                        <input
                            type="text"
                            id="cognome"
                            name="cognome"
                            value={formData.cognome}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                        {formErrors.cognome && <p className="text-red-500 text-sm">{formErrors.cognome}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                        {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="dataNascita">
                            Data di Nascita
                        </label>
                        <input
                            type="date"
                            id="dataNascita"
                            name="dataNascita"
                            value={formData.dataNascita}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                        {formErrors.dataNascita && <p className="text-red-500 text-sm">{formErrors.dataNascita}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="fotoProfilo">
                            Foto Profilo (URL)
                        </label>
                        <input
                            type="url"
                            id="fotoProfilo"
                            name="fotoProfilo"
                            value={formData.fotoProfilo}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="btn-secondary"
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                        >
                            Crea
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
