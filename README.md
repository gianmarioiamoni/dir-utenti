# Dir-Utenti
Un'applicazione full-stack per gestire un elenco di utenti con funzionalità di aggiunta, visualizzazione e dettagli, progettata per essere responsiva e intuitiva. 🎯

![Screenshot 2024-11-28 alle 02 49 43](https://github.com/user-attachments/assets/8b0fd0a4-b885-41d6-8319-bf40a0a76e53)

---

## 🚀 Funzionalità principali

- **Visualizzazione utenti:** una lista di utenti con nome, cognome ed email, supportata da paginazione server-side.
- **Aggiunta utenti:** una form intuitiva con caricamento dell'immagine del profilo su [Cloudinary](https://cloudinary.com/), validazione client-side e server-side.
- **Dettagli utente:** pagina dedicata con informazioni complete sull'utente e navigazione tramite breadcrumbs.
- **Esperienza utente avanzata:** gestione centralizzata degli errori e messaggi di successo con [React Toastify](https://github.com/fkhadra/react-toastify).

---

## 🛠️ Tecnologie utilizzate

- **Frontend:**
  - [Next.js](https://nextjs.org/) con TypeScript
  - [React Query](https://tanstack.com/query) per il fetching dei dati lato client
  - [Tailwind CSS](https://tailwindcss.com/) per uno stile moderno e reattivo
  - [React Toastify](https://github.com/fkhadra/react-toastify) per la messaggistica

- **Backend:**
  - [Express.js](https://expressjs.com/) con TypeScript
  - [MongoDB](https://www.mongodb.com/) e [Mongoose](https://mongoosejs.com/)
  - [Express-Validator](https://express-validator.github.io/docs/) per la validazione dei dati
  - [Swagger](https://swagger.io/) per documentare l'API

- **Cloud:**
  - [Cloudinary](https://cloudinary.com/) per il salvataggio delle immagini profilo

---

## 🎨 Interfaccia utente

- **Temi grafici:** colori che si adattano automaticamente al tema (chiaro/scuro).
  
  ![Screenshot 2024-11-28 alle 02 12 54](https://github.com/user-attachments/assets/be7ba2bf-18fa-49cc-a5ae-a7d2c04a540c)

- **Responsività:** design ottimizzato per desktop, tablet e dispositivi mobili.
  
![Screenshot 2024-11-28 alle 02 34 46](https://github.com/user-attachments/assets/0fba7318-4bcf-49d0-a1b5-89aabd07a667)

![Screenshot 2024-11-28 alle 02 35 10](https://github.com/user-attachments/assets/add07341-4b6c-4f47-a25c-9f32d8e07b71)

![Screenshot 2024-11-28 alle 02 35 34](https://github.com/user-attachments/assets/1e7ab5a3-6792-4993-be7f-8ddb8d3f6263)

![Screenshot 2024-11-28 alle 02 35 52](https://github.com/user-attachments/assets/c455fa39-590b-41ba-acb4-52e4a8706553)

![Screenshot 2024-11-28 alle 02 36 36](https://github.com/user-attachments/assets/5905e949-25e8-4217-bfa1-2889459ccb46)

---

## 📄 Descrizione dettagliata

### Lista utenti
![Screenshot 2024-11-28 alle 02 12 20](https://github.com/user-attachments/assets/16ba619a-385e-4a62-9827-f0b6931deac9)

- Visualizza gli utenti salvati nel database.
- Paginazione server-side per prestazioni ottimali.
- Navigazione tra pagine con bottoni intuitivi.
- **Fetching con React Query:**
  - Aggiornamento automatico dei dati.
  - Cache integrata per migliorare la velocità e ridurre le richieste.

### Aggiunta utenti

- Form dedicata per inserire un nuovo utente.
- **Validazione campi:**
  ![Screenshot 2024-11-28 alle 02 30 12](https://github.com/user-attachments/assets/05a7491e-e7b5-4c18-aadb-2f619189bf0f)

  - **Client-side:** esperienza utente fluida grazie a controlli immediati.
  - **Server-side:** sicurezza garantita da `express-validator`.
    
- Caricamento dell'immgine profilo e salvataggio su Cloudinary.
 

### Dettagli utente
- Pagina dinamica accessibile cliccando sulla card di un utente.
  
  ![Screenshot 2024-11-28 alle 02 38 19](https://github.com/user-attachments/assets/b8274b1e-d79c-4993-bb4c-a253a24b60f4)
  
  ![Screenshot 2024-11-28 alle 02 38 54](https://github.com/user-attachments/assets/5da5b6bb-6ed6-4d19-8afa-aab00344997d)

- **Rendering server-side (SSR):**
  - Migliora il SEO e riduce il tempo di caricamento iniziale.
- Navigazione tramite breadcrumbs per una UX chiara e fluida.

### Gestione errori
- **Server:** middleware dedicato per centralizzare la gestione degli errori.
- **Client:** hook per intercettare errori e mostrarli tramite toast.

---

## 🐞 Bug conosciuti

1. **Errore temporaneo al primo salvataggio di un nuovo utente:** l'errore non si verifica regolarmente e il salvataggio avviene correttamente al secondo tentativo.
2. **Refetching dei dati:** quando si torna dalla pagina lista utenti alla homepage, i dati vengono nuovamente fetchati, anche in assenza di modifiche.

---

## 🌟 Possibili sviluppi futuri

- Aggiungere una barra di ricerca per filtrare gli utenti.
- Implementare la modifica e cancellazione degli utenti.
- Migliorare il caching dei dati per evitare refetching non necessario.
- Implementare la gestione di ruoli o permessi per gli utenti.

---

## 🔧 Configurazione variabili ambiente

Crea un file `.env` nella root del progetto e configura le seguenti variabili:

```env
# Server
MONGO_URI=your_mongodb_connection_string
PORT=your_server_port

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## 🖥️ Istruzioni per il development

1. Clona il repository:
   ```
   git clone https://github.com/tuo-utente/dir-utenti.git
   ```

2. Installa le dipendenze:
   ```bash
   cd dir-utenti
   npm install
   ```

3. Avvia il server backend:
   ```bash
   cd server
   npm run dev
   ```

4. Avvia l'app frontend:
   ```bash
   cd client
   npm run dev
   ```
Accedi all'applicazione su [http://localhost:3000](http://localhost:3000).


## 📚 Documentazione API

La documentazione completa delle API è disponibile tramite Swagger:  
[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 🙌 Contributi

Contribuzioni e segnalazioni di bug sono benvenute!  
Apri un'**issue** o invia una **pull request** per proporre miglioramenti.
