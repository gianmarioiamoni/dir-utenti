import { Request, Response, NextFunction } from "express";

import logger from "../utils/logger";

// Middleware for errors handling
const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error("Error:", err); 

    const statusCode = err.status || 500; // 500 is default, if no specified
    const message = err.message || "server error";
  
    // Error logging with Winston
    logger.error({
      message: err.message,
      status: statusCode,
      stack: err.stack, // Stacktrace for debug
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
    });

    res.status(statusCode).json({
        message,
        error: process.env.NODE_ENV === "development" ? err.stack : undefined, 
    });
};

export default errorHandler;
