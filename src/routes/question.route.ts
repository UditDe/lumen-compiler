import { Router } from "express";
import { upload_questions } from "../controllers/question.controller.js";


const question_router = Router();
question_router.post("/upload", upload_questions);

export default question_router;
