import path from "path";
import { promisify } from "util";
import { exec } from "child_process";
import fs from "fs";
import { fileURLToPath } from "url";
import { writeFileSafe, ensureDir } from "../utils/fileUtils.js";
import { v4 as uuidv4 } from "uuid";
import { cleanupFiles, removeTempJobFolder } from "../utils/cleanup.js";

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const compileCpp = async (
    code: string,
    input: string[]
): Promise<string[]> => {
    const jobId = `${Date.now()}_${uuidv4()}`;
    const tempDir = path.join(__dirname, "../temp", jobId);

    // Ensure temp directory exists
    ensureDir(tempDir);

    const codePath = path.join(tempDir, "main.cpp");
    const inputPath = path.join(tempDir, "input.txt");
    const outputPath = path.join(tempDir, "output.txt");
    const compiledPath = path.join(tempDir, "a.out");

    // Safely write code and input
    writeFileSafe(codePath, code);

    const compileCommand = `g++ ${codePath} -o ${tempDir}/a.out`;

    try {
        try {
            // Compile with timeout
            await execAsync(compileCommand, { timeout: 5000 });
        } catch (err: any) {
            throw new Error(`Compilation Error: ${err.stderr || err.message}`);
        }
        const result : string[] = [];
        for(const inp of input) {
            writeFileSafe(inputPath, inp ?? "");
            const runCommand = `${tempDir}/a.out < ${inputPath} > ${outputPath}`;

            try {
                // Run program with timeout
                await execAsync(runCommand, { timeout: 3000 });
                const output = fs.readFileSync(outputPath, "utf-8");
                result.push(output)

            } catch (err: any) {
                throw new Error(`Runtime Error: ${err.stderr || err.message}`);
            } finally {
                // cleanup the temporary inputpath
                await cleanupFiles(inputPath)
            }
        }
        return result;

    } finally {
        // cleanup
        await cleanupFiles(codePath, inputPath, outputPath, compiledPath);
        await removeTempJobFolder(tempDir);
    }
};
