import { FC, useState } from "react";

/**
 * Proprietà del componente `ImageUpload`.
 *
 * @typedef {Object} ImageUploadProps
 * @property {(fileUrl: string) => void} onImageUpload - Callback per comunicare l'URL dell'immagine caricata al componente genitore.
 */
interface ImageUploadProps {
    onImageUpload: (fileUrl: string) => void;
}

/**
 * Componente per il caricamento di un'immagine con anteprima e gestione dello stato di caricamento.
 *
 * @component
 * @param {ImageUploadProps} props - Proprietà passate al componente.
 * @returns {JSX.Element} - Il componente per il caricamento dell'immagine.
 *
 * @example
 * <ImageUpload
 *   onImageUpload={(url) => console.log("URL immagine caricata:", url)}
 * />
 */
const ImageUpload: FC<ImageUploadProps> = ({ onImageUpload }) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null); // URL per l'anteprima dell'immagine
    const [isUploading, setIsUploading] = useState<boolean>(false); // Stato di caricamento

    /**
     * Gestisce il cambiamento del file nell'input.
     *
     * @async
     * @param {React.ChangeEvent<HTMLInputElement>} e - Evento del cambio di input file.
     */
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Genera l'URL per l'anteprima dell'immagine selezionata
        const previewUrl = URL.createObjectURL(file);
        setPreviewImage(previewUrl);

        // Prepara il file per il caricamento
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_upload_preset"); // Personalizza il preset di upload se necessario
        setIsUploading(true);

        try {
            // Effettua la richiesta POST per caricare l'immagine
            const response = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            onImageUpload(data.fileUrl); // Comunica al genitore l'URL dell'immagine caricata
        } catch (error) {
            console.error("Errore durante l'upload:", error);
        } finally {
            setIsUploading(false); // Resetta lo stato di caricamento
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium mb-1" htmlFor="fotoProfilo">
                Foto Profilo
            </label>
            <input
                type="file"
                id="fotoProfilo"
                accept="image/*"
                onChange={handleFileChange}
                className="input-file-field"
            />
            {previewImage && (
                <div className="w-36 h-36 overflow-hidden rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-100">
                    <img
                        src={previewImage}
                        alt="Anteprima foto profilo"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            {isUploading && (
                <p className="text-foreground text-sm">Caricamento in corso...</p>
            )}
        </div>
    );
};

export default ImageUpload;
