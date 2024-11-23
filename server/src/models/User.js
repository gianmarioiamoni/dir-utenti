"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dataNascita: { type: Date, required: true },
    fotoProfilo: { type: String },
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
