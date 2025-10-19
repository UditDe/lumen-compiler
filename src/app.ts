import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// import compileRouter from "./routes/compile.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// app.use("/api/compile", compileRouter);

app.listen(PORT, () => {
  console.log(`⚡ Server running on http://localhost:${PORT}`);
});
