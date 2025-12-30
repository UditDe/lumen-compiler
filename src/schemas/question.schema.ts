import { z } from "zod";
import { ALLOWED_TAGS, DIFFICULTY_LEVEL } from "../types/questions.types.js";

export const TestCaseSchema = z.object({
    input: z.string().min(1),
    output: z.string().min(1),
});

export const CreateQuestionSchema = z
    .object({
        question_title: z.string().min(1),
        question_description: z.string().min(1),
        test_cases: z.array(TestCaseSchema).min(1),
        tags: z.array(z.enum(ALLOWED_TAGS)).min(1),
        difficulty: z.enum(DIFFICULTY_LEVEL),
    })
    .strict(); // ⬅️ REJECT unknown fields
