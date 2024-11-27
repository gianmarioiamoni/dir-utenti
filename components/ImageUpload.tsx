import { FC, useState } from "react";

interface ImageUploadProps {
    onImageUpload: (fileUrl: string) => void;
}

const ImageUpload: FC<ImageUploadProps> = ({ onImageUpload }) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Mostra l'anteprima dell'immagine
        const previewUrl = URL.createObjectURL(file);
        setPreviewImage(previewUrl);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_upload_preset"); // Personalizza se necessario
        setIsUploading(true);

        try {
            const response = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            onImageUpload(data.fileUrl); // Comunica al componente genitore l'URL dell'immagine
        } catch (error) {
            console.error("Errore durante l'upload:", error);
        } finally {
            setIsUploading(false);
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
                    <img src={previewImage} alt="Anteprima foto profilo" className="w-full h-full object-cover" />
                </div>
            )}
            {isUploading && <p className="text-foreground text-sm">Caricamento in corso...</p>}
        </div>
    );
}

export default ImageUpload;
