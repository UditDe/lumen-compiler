import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import compileRouter from "./routes/compile.route.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { apiRateLimiter } from "./middleware/rateLimiter.js";
import { connectDB } from "./config/mongo.config.js";
import { error_handler } from "./utils/error.handler.js";
import question_router from "./routes/question.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.ALLOWED_IP
}));

app.use(bodyParser.json());
app.use(requestLogger); // <-- logs every request

app.use("/api/v1/compile", apiRateLimiter, compileRouter);
app.use("/api/v1/questions", apiRateLimiter, question_router);
app.use(error_handler);

app.listen(PORT || 3000, () => {
    connectDB();
    console.log(`⚡ Server running on http://localhost:${PORT}`);
});
