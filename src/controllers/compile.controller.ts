import type { Request, Response } from "express";

export const compileCppController = async (req: Request, res: Response) => {
    const { code, input } = req.body;
    if (!code) {
        return res.status(400).json({ error: "Code is Required Bhaii" });
    } else {
        return res.status(204).json({ message: `${code}` });
    }
};
