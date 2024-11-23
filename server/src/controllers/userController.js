"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserById = exports.getUsers = void 0;
const User_1 = require("../models/User");
// Get all users (with pagination)
const getUsers = async (req, res, next) => {
    try {
        // Pagination parameters
        // read page parameter from query string and convert to int
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // number of users per page
        // starting point of the current page
        const skip = (page - 1) * limit; // number of users to be skip to reach the current page
        // Find all users, skip to the starting point of the current page,
        // and limit to the number of users per page
        const users = await User_1.default.find().skip(skip).limit(limit);
        res.json(users);
        return;
    }
    catch (err) {
        next(err);
        return;
    }
};
exports.getUsers = getUsers;
// Get user by ID
const getUserById = async (req, res, next) => {
    try {
        const user = await User_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
        return;
    }
    catch (err) {
        next(err);
        return;
    }
};
exports.getUserById = getUserById;
// Create a new user
const createUser = async (req, res, next) => {
    try {
        const { nome, cognome, email, dataNascita, fotoProfilo } = req.body;
        const newUser = new User_1.default({
            nome,
            cognome,
            email,
            dataNascita,
            fotoProfilo,
        });
        await newUser.save();
        res.status(201).json(newUser);
        return;
    }
    catch (err) {
        next(err);
        return;
    }
};
exports.createUser = createUser;
