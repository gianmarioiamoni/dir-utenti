import { FC } from "react";

import { useCreateUserForm } from "@/hooks/useCreateUserForm";
import ImageUpload from "@/components/ImageUpload";
import { NewUser } from "@/interfaces/userInterfaces";

/**
 * Proprietà del componente `CreateUserModal`.
 *
 * @typedef {Object} CreateUserModalProps
 * @property {boolean} isOpen - Stato di apertura della modale.
 * @property {() => void} onClose - Funzione per chiudere la modale.
 * @property {(newUser: NewUser) => void} handleAddUser - Callback per aggiungere un nuovo utente.
 */
interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleAddUser: (newUser: NewUser) => void;
}

/**
 * Componente per creare un nuovo utente attraverso una modale.
 *
 * @component
 * @param {CreateUserModalProps} props - Proprietà passate al componente.
 * @returns {JSX.Element | null} - La modale per creare un nuovo utente oppure `null` se chiusa.
 *
 * @example
 * <CreateUserModal
 *   isOpen={true}
 *   onClose={() => console.log("Modal chiusa")}
 *   handleAddUser={(user) => console.log("Utente creato:", user)}
 * />
 */
const CreateUserModal: FC<CreateUserModalProps> = ({
    isOpen,
    onClose,
    handleAddUser,
}) => {
    // Logica del form gestita tramite hook personalizzato
    const {
        formData,
        formErrors,
        errorMessage,
        handleChange,
        handleSubmit,
        handleCancel,
        setFormData,
    } = useCreateUserForm(handleAddUser, onClose);

    if (!isOpen) return null; // Non renderizza nulla se la modale è chiusa

    return (
        <div className="create-user-modal-div">
            <div className="create-user-modal-main">
                <h2 className="text-xl font-semibold mb-4">Crea Nuovo Utente</h2>

                {/* Area errori */}
                {errorMessage && (
                    <p className="text-white bg-bg-error px-4 py-2 rounded mb-4">
                        {errorMessage}
                    </p>
                )}

                {/* Form per creare l'utente */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nome */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="nome"
                        >
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
                        {formErrors.nome && (
                            <p className="text-red-500 text-sm">{formErrors.nome}</p>
                        )}
                    </div>

                    {/* Cognome */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="cognome"
                        >
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
                        {formErrors.cognome && (
                            <p className="text-red-500 text-sm">{formErrors.cognome}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="email"
                        >
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
                        {formErrors.email && (
                            <p className="text-red-500 text-sm">{formErrors.email}</p>
                        )}
                    </div>

                    {/* Data di Nascita */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="dataNascita"
                        >
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
                        {formErrors.dataNascita && (
                            <p className="text-red-500 text-sm">{formErrors.dataNascita}</p>
                        )}
                    </div>

                    {/* Immagine Profilo */}
                    <ImageUpload
                        onImageUpload={(fileUrl) =>
                            setFormData((prev) => ({ ...prev, fotoProfilo: fileUrl }))
                        }
                    />

                    {/* Bottoni */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="btn-cancel"
                        >
                            Annulla
                        </button>
                        <button type="submit" className="btn-primary">
                            Salva
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserModal;
