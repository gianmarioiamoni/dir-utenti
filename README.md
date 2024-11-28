# Dir-Utenti

Un'applicazione full-stack per gestire un elenco di utenti con funzionalità di aggiunta, visualizzazione e dettagli, progettata per essere responsiva e intuitiva. 🎯

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
- **Responsività:** design ottimizzato per desktop, tablet e dispositivi mobili.

---

## 📄 Descrizione dettagliata

### Lista utenti
- Visualizza gli utenti salvati nel database.
- Paginazione server-side per prestazioni ottimali.
- Navigazione tra pagine con bottoni intuitivi.
- **Fetching con React Query:**
  - Aggiornamento automatico dei dati.
  - Cache integrata per migliorare la velocità e ridurre le richieste.

### Aggiunta utenti
- Form dedicata per inserire un nuovo utente.
- **Validazione campi:**
  - **Client-side:** esperienza utente fluida grazie a controlli immediati.
  - **Server-side:** sicurezza garantita da `express-validator`.
- Salvataggio dell'immagine profilo su Cloudinary.

### Dettagli utente
- Pagina dinamica accessibile cliccando sulla card di un utente.
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

## 🖥️ Istruzioni per il development

1. Clona il repository:
   ```bash
   git clone https://github.com/tuo-utente/dir-utenti.git

2. Installa le dipendenze:
   ```bash
   cd dir-utenti
   npm install 

3. Avvia il server backend:
   ```bash
   cd server
   npm run dev


4. Avvia l'app frontend:
   ```bash
   cd client
   npm run dev

Accedi all'applicazione su [http://localhost:3000](http://localhost:3000).


## 📚 Documentazione API

La documentazione completa delle API è disponibile tramite Swagger:  
[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 🙌 Contributi

Contribuzioni e segnalazioni di bug sono benvenute!  
Apri un'**issue** o invia una **pull request** per proporre miglioramenti.
