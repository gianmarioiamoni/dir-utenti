import { useCreateUserForm } from "@/hooks/useCreateUserForm";
import { useImageUpload } from "@/hooks/useImageUpload";

import ImageUpload from "@/components/ImageUpload";

import { NewUser } from "@/interfaces/userInterfaces";

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleAddUser: (newUser: NewUser) => void;
}

export default function CreateUserModal({
    isOpen,
    onClose,
    handleAddUser,
}: CreateUserModalProps): JSX.Element | null {
    // Form logic from custome hook
    const {
        formData,
        formErrors,
        errorMessage,
        handleChange,
        handleSubmit,
        handleCancel,
        setFormData,
    } = useCreateUserForm(handleAddUser, onClose);

    // Image upload logic from custom hook
    const { previewImage, isUploading, handleFileChange } = useImageUpload();

    if (!isOpen) return null;

    return (
        <div className="create-user-modal-div">
            <div className="create-user-modal-main">
                <h2 className="text-xl font-semibold mb-4">Crea Nuovo Utente</h2>

                {/* Area errori */}
                {errorMessage && <p className="text-white bg-bg-error px-4 py-2 rounded mb-4">{errorMessage}</p>}

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nome */}
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
                    {/* Cognome */}
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
                    {/* Email */}
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
                    {/* Data di Nascita */}
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
                    {/* Immagine profilo */}
                    <ImageUpload
                        onImageUpload={(fileUrl) =>
                            setFormData((prev) => ({ ...prev, fotoProfilo: fileUrl }))
                        }
                    />

                    {/* Bottoni */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button type="button" onClick={handleCancel} className="btn-cancel">
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
}

