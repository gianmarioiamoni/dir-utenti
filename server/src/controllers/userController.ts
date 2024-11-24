import { Request, Response, NextFunction } from "express";
import User from "../models/User";

// Get all users (with pagination)
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    page = 1,
    limit = 10,
    fields = "firstName lastName email",
  } = req.query;

  try {
    const users = await User.find({}, fields.toString().split(",").join(" "))
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await User.countDocuments();

    res.json({users, total});
    return;
  } catch (err) {
    next(err);
    return;
  }
};

// Get user by ID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
    return;
  } catch (err) {
    next(err);
    return;
  }
};

// Create a new user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nome, cognome, email, dataNascita, fotoProfilo } = req.body;
    const newUser = new User({
      nome,
      cognome,
      email,
      dataNascita,
      fotoProfilo,
    });

    await newUser.save();

    res.status(201).json(newUser);
    return;
  } catch (err) {
    next(err);
    return;
  }
};
