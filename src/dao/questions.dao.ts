import mongoose from "mongoose";
import questions from "../models/questions.model.js";
import type {
    CreateQuestionDAO,
    SaveQuestionResult,
} from "../types/questions.types.js";
import {
    AppError,
    BadRequestError,
    NotFoundError,
} from "../utils/error.handler.js";

export const save_questions = async (
    data: CreateQuestionDAO
): Promise<SaveQuestionResult> => {
    try {
        const question_doc = await questions.create(data);

        return {
            id: question_doc._id,
            created_at: question_doc.created_at,
        };
    } catch (err: unknown) {
        // Validation / schema errors
        if (err instanceof mongoose.Error.ValidationError) {
            throw new BadRequestError(err.message);
        }

        // Duplicate key (_id, unique fields, etc.)
        if ((err as any).code === 11000) {
            throw new BadRequestError("Question already exists");
        }

        // Known application error → rethrow
        if (err instanceof AppError) {
            throw err;
        }

        // Unknown error
        throw new AppError("Failed to create question", 500, false);
    }
};

export const get_question_by_id = async (id: string) => {
    const question = await questions.findById(id).lean();

    if (!question) {
        throw new NotFoundError("Question not found");
    }

    return question;
};
