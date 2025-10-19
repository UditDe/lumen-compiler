import type { Request, Response } from "express";
import { compileCpp } from "../services/compile.service.js";
import type {
    CompileRequestBody,
    CompileResponse,
} from "../types/compileTypes.js";

/*
    ## Explanation of --> Request<{}, {}, CompileRequestBody>
    The first {} → URL parameters. We don’t have any in /compile, so we use empty object.
    Example: /user/:id → you would type as Request<{ id: string }, ...>

    The second {} → response body type. We often leave it as {} because we’re typing res separately using Response<CompileResponse>.

    The third parameter → request body, which we actually care about: CompileRequestBody.
*/
export const compileCppController = async (
    req: Request<{}, {}, CompileRequestBody>,
    res: Response<CompileResponse>
) => {
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
