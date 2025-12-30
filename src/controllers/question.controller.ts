import type { Request, Response } from "express";
import type {
    question_type,
    question_uploaded_response,
    SaveQuestionResult,
} from "../types/questions.types.js";
import { save_questions } from "../dao/questions.dao.js";
import wrapAsync from "../utils/try_catch_wrapper.js";

export const upload_questions = wrapAsync(
    async (
        req: Request<{}, {}, question_type>,
        res: Response<question_uploaded_response>
    ) => {
        const {
            question_title,
            question_description,
            test_cases,
            tags,
            difficulty,
        } = req.body;
        if (
            !question_title ||
            !question_description ||
            !test_cases ||
            !tags ||
            !difficulty
        ) {
            return res.status(400).json({
                error: "Incomplete Request Payload",
            });
        }

        const { id, created_at }: SaveQuestionResult = await save_questions({
            question_title,
            question_description,
            test_cases,
            tags,
            difficulty,
        });
        res.status(201).json({ _id: id, created_at });
    }
);
