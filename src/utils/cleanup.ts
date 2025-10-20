import fs from "fs/promises";

export const cleanupFiles = async (...filePaths: string[]) => {
    for (const path in filePaths) {
        try {
            await fs.unlink(path);
            console.log(`Deleted : ${path}`);
        } catch (err: any) {
            if (err.code && err.code !== "ENOENT") {
                console.error(`Failed to delete ${path}:`, err.message);
            } else
                console.error(
                    `Failed to delete ${path} for a unknown reason`,
                    err?.message
                );
        }
    }
};
