import * as RL from "express-rate-limit";
import type { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const winMs = parseInt(process.env.RATE_WINDOW_MS as string, 10)
const maxRequests = parseInt(process.env.RATE_MAX as string, 10)

export const apiRateLimiter = RL.rateLimit({
    windowMs: winMs,
    max: maxRequests,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    handler: (req: Request, res: Response) => {
        res.status(429).json({
            error: "Too many requests, please try again later.",
        });
    },
});
