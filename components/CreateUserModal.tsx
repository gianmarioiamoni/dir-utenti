import { useState } from "react";
import { NewUser } from "@/interfaces/userInterfaces";

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (userData: NewUser) => void;
}


export default function CreateUserModal({
    isOpen,
    onClose,
    onSubmit,
}: CreateUserModalProps): JSX.Element | null {
    // initialize formData state as an empty NewUser object
    const [formData, setFormData] = useState<NewUser>({
        nome: "",
        cognome: "",
        email: "",
        dataNascita: "",
        fotoProfilo: "",
    })

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ nome: "", cognome: "", email: "", dataNascita: "", fotoProfilo: "" });
        onClose();
    };

    return (
        <div className="create-user-modal-div">
            <div className="create-user-modal-main">
                <h2 className="text-xl font-semibold mb-4">Crea Nuovo Utente</h2>
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
                            onClick={onClose}
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
