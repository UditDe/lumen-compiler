import fs from "fs";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const compileCpp = async (code: string, input: string = ""): Promise<string> => {
  const tempDir = path.join(__dirname, "../temp");
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  const codePath = path.join(tempDir, "main.cpp");
  const inputPath = path.join(tempDir, "input.txt");
  const outputPath = path.join(tempDir, "output.txt");

  fs.writeFileSync(codePath, code);
  if (input) fs.writeFileSync(inputPath, input);

  const compileCommand = `g++ ${codePath} -o ${tempDir}/a.out`;
  const runCommand = `${tempDir}/a.out < ${inputPath} > ${outputPath}`;

  try {
    // Compile
    await execAsync(compileCommand, { timeout: 5000 });
  } catch (err: any) {
    throw new Error(`Compilation Error: ${err.stderr || err.message}`);
  }

  try {
    // Run
    await execAsync(runCommand, { timeout: 3000 });
    const output = fs.readFileSync(outputPath, "utf-8");
    return output;
  } catch (err: any) {
    throw new Error(`Runtime Error: ${err.stderr || err.message}`);
  }
};
