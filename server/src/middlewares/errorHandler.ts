import { Request, Response, NextFunction } from "express";

// Middleware for errors handling
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err); 

  const statusCode = err.status || 500; // 500 is defualt, if no specified
  const message = err.message || "server error";

  res.status(statusCode).json({
    message,
    error: process.env.NODE_ENV === "development" ? err.stack : undefined, // Mostra lo stack in sviluppo
  });
};

export default errorHandler;
