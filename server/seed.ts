import mongoose from "mongoose";
import User from "./src/models/User"; 
import { faker } from "@faker-js/faker";

import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/dir-utenti"; 

const N_USERS = 25;

const seedDatabase = async () => {
  try {
    // Connessione al database
    await mongoose.connect(MONGO_URI);
    console.log("MONGODB_URI", MONGO_URI);
    console.log("Connessione al database riuscita!");

    // Rimuovi eventuali dati esistenti
    await User.deleteMany({});
    console.log("Dati esistenti rimossi.");

    // Crea N_USERS utenti casuali
    const users = [];
    for (let i = 0; i < N_USERS; i++) {
      users.push({
        nome: faker.person.firstName(),
        cognome: faker.person.lastName(),
        email: faker.internet.email(),
        dataNascita: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
        fotoProfilo: faker.image.avatar(),
      });
    }

    // Inserisci gli utenti nel database
    await User.insertMany(users);
    console.log("25 utenti creati con successo!");

    // Chiudi la connessione
    mongoose.connection.close();
    console.log("Connessione al database chiusa.");
  } catch (err) {
    console.error("Errore durante il seed:", err);
    mongoose.connection.close();
  }
};

// Esegui lo script di seed
seedDatabase();
