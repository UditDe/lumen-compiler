import { Router } from "express";
import {
    compileCppController,
    healthCheck,
} from "../controllers/compile.controller.js";

const router = Router();

router.get("/", healthCheck);
router.post("/cpp", compileCppController);

export default router;
