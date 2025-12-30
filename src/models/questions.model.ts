import mongoose from "mongoose";
import { nanoid_custom } from "../utils/generate_random_id.js";
import {
    ALLOWED_TAGS,
    DIFFICULTY_LEVEL,
    type question_type,
    type test_cases_type,
} from "../types/questions.types.js";

const test_case_schema = new mongoose.Schema<test_cases_type>(
    {
        input: { type: String, required: true },
        output: { type: String, required: true },
    },
    {
        _id: false,
    }
);

const question_schema = new mongoose.Schema<question_type>(
    {
        _id: {
            type: String,
            default: () => nanoid_custom(),
            immutable: true,
        },
        question_title: {
            type: String,
            required: true,
            index: true,
            unique: true,
        },
        question_description: {
            type: String,
            required: true,
        },
        test_cases: {
            type: [test_case_schema],
            required: true,
        },
        tags: {
            type: [
                {
                    type: String,
                    enum: ALLOWED_TAGS,
                },
            ],
            required: true,
        },
        difficulty: {
            type: String,
            enum: DIFFICULTY_LEVEL,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
        strict: true,
    }
);

const questions = mongoose.model("questions", question_schema);

export default questions;
