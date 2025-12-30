import { Router } from "express";
import { upload_questions } from "../controllers/question.controller.js";
import { validate } from "../middleware/validate.js";
import { CreateQuestionSchema } from "../schemas/question.schema.js";


const question_router = Router();
question_router.post("/upload", validate(CreateQuestionSchema), upload_questions);

export default question_router;
