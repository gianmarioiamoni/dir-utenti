import { useState } from "react";

export function useImageUpload() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFormData: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset");
    setIsUploading(true);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setFormData((prev: any) => ({ ...prev, fotoProfilo: data.fileUrl }));
    } catch (error) {
      console.error("Errore durante l'upload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return { previewImage, isUploading, handleFileChange };
}
