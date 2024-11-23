"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    level: "info", // min log level (i.e. 'error', 'warn', 'info')
    format: winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.format.errors({ stack: true }), // Show stacktrace if an error occurs
    winston_1.format.json() // format logs in JSON
    ),
    transports: [
        new winston_1.transports.Console({
            // Log on console
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
        }),
        // Transports define where to send log messages
        new winston_1.transports.File({ filename: "logs/errors.log", level: "error" }), // error level logs in a separate file
        new winston_1.transports.File({ filename: "logs/combined.log" }), // general log, info level
    ],
});
// Log for production
if (process.env.NODE_ENV === "production") {
    logger.add(new winston_1.transports.File({ filename: "logs/critical.log", level: "critical" }));
}
exports.default = logger;
