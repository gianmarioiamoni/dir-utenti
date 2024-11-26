import { useCreateUserForm } from "@/hooks/useCreateUserForm";
import { useImageUpload } from "@/hooks/useImageUpload";

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
                            Foto Profilo
                        </label>
                        <input
                            type="file"
                            id="fotoProfilo"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, setFormData)}
                            className="input-field"
                        />
                        {previewImage && (
                            <div className="w-36 h-36 overflow-hidden rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-100">
                                <img src={previewImage} alt="Anteprima foto profilo" className="w-full h-full object-cover" />
                            </div>
                        )}
                        {isUploading && <p className="text-gray-500 text-sm">Caricamento in corso...</p>}
                    </div>
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

