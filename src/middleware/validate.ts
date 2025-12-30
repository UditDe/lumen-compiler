import { ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utils/error.handler.js";

export const validate =
    <T>(schema: ZodType<T>) =>
    (req: Request<{}, {}, T>, _res: Response, next: NextFunction): void => {
        try {
            const parsed = schema.parse(req.body);
            req.body = parsed;
            next();
        } catch (err) {
            throw new BadRequestError("Invalid request payload");
        }
    };
