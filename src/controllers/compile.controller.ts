import type { Request, Response } from "express";
import { compileCpp } from "../services/compile.service.js";

export const compileCppController = async (req: Request, res: Response) => {
    const { code, input } = req.body;
    if (!code) {
        return res.status(400).json({ error: "Code is Required Bhaii" });
    }

    try {
        const output = await compileCpp(code, input);
        return res.status(200).json({ output });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};
