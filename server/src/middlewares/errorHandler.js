"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
// Middleware for errors handling
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);
    const statusCode = err.status || 500; // 500 is default, if no specified
    const message = err.message || "server error";
    // Error logging with Winston
    logger_1.default.error({
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
exports.default = errorHandler;
