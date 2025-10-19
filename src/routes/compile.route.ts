import { Router } from "express";
import { compileCppController } from "../controllers/compile.controller.js";

const router = Router();

router.post("/cpp", compileCppController);

export default router;
