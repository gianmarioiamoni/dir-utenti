import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//import userRoutes from "./routes/userRoutes";

const app: Express = express();

// Middleware
app.use(express.json());

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/dir-utenti";

// Connessione al database MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      MONGODB_URI,
    );
    console.log("MONGODB_URI", MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

//app.use("/api/users", userRoutes);

export { app, connectDB };
