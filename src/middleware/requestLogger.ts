// src/middleware/requestLogger.ts
import morgan from "morgan";
import { logger } from "../utils/logger.js"; // note .js for runtime ESM resolution

// create a stream object with a 'write' function for morgan
const stream = {
  write: (message: string) => {
    // morgan adds a newline already; trim it
    logger.info(message.trim());
  },
};

// use combined or dev format as needed
export const requestLogger = morgan("combined", { stream });
