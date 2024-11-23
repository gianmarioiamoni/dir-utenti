"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.app = void 0;
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const dotenv_1 = require("dotenv");
dotenv_1.default.config();
const userRoutes_1 = require("./routes/userRoutes");
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
exports.app = app;
// Middleware for JSON parsing
app.use(express_1.default.json());
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/dir-utenti";
// Routes
app.use("/api/users", userRoutes_1.default);
// Middleware for errors handling
app.use(errorHandler_1.default);
// Connessione al database MongoDB
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log("MONGODB_URI", MONGODB_URI);
        console.log("MongoDB connected");
    }
    catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
