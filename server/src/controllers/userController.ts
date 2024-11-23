import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import next from "next";

// Get all users (with pagination)
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Pagination parameters
    // read page parameter from query string and convert to int
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10; // number of users per page
    // starting point of the current page
    const skip = (page - 1) * limit; // number of users to be skip to reach the current page

    // Find all users, skip to the starting point of the current page,
    // and limit to the number of users per page
    const users = await User.find().skip(skip).limit(limit);
    res.json(users);
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
