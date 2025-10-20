import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import compileRouter from "./routes/compile.route.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { apiRateLimiter } from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger); // <-- logs every request

app.use("/api/v1/compile", apiRateLimiter, compileRouter);

app.listen(PORT, () => {
    console.log(`⚡ Server running on http://localhost:${PORT}`);
});
