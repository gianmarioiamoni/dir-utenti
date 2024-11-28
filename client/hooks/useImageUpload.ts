import { useState } from "react";

/**
 * Custom hook per gestire l'upload di un'immagine.
 * Permette di caricare un file immagine, visualizzarne l'anteprima e aggiornare i dati del form con l'URL dell'immagine caricata.
 *
 * @returns {object} Un oggetto contenente:
 * - `previewImage` (string | null): L'URL per la visualizzazione dell'anteprima dell'immagine.
 * - `isUploading` (boolean): Indica se il caricamento dell'immagine è in corso.
 * - `handleFileChange` (function): Funzione da chiamare per gestire il cambiamento del file da caricare.
 *
 * @example
 * const { previewImage, isUploading, handleFileChange } = useImageUpload();
 * // Usa handleFileChange come onChange per un input file, per esempio:
 * <input type="file" onChange={(e) => handleFileChange(e, setFormData)} />
 */
export function useImageUpload() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  /**
   * Gestisce il cambiamento del file selezionato dall'utente.
   * Carica il file selezionato, genera un'anteprima e invia il file al server.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - L'evento di cambiamento del file.
   * @param {React.Dispatch<React.SetStateAction<any>>} setFormData - Funzione per aggiornare lo stato del form.
   * @returns {Promise<void>} - La funzione non restituisce nulla. Gestisce l'upload asincrono.
   */
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
