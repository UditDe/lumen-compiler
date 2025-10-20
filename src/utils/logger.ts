import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

const { combine, timestamp, printf, colorize } = winston.format;

const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});
/*  ======>>>>return type of above writtern function
    2025-10-20T12:30:45.123Z [info]: Server started on port 6969
    2025-10-20T12:31:02.987Z [error]: Compilation failed: Segmentation fault
*/

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL as string,
    format: combine(timestamp(), customFormat),
    transports: [
        new winston.transports.Console({
            format: combine(colorize(), timestamp(), customFormat),
        }),
        // simple file transport for persistent logs
        new winston.transports.File({
            filename: "logs/server.log",
            level: "info",
        }),
    ],
});
