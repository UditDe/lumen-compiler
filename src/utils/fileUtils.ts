import fs from "fs";
import path from "path";

export const ensureDir = (dir: string) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

export const writeFileSafe = (filePath: string, data: string) => {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, data);
};
