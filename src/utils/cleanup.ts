import fs from "fs/promises";

export const cleanupFiles = async (...filePaths: string[]) => {
    for (const path in filePaths) {
        // console.log("path details : ", filePaths[path]);
        try {
            await fs.unlink(filePaths[path] as string);
            console.log(`Cleaning : ${filePaths[path]}`);
        } catch (err: any) {
            if (err.code && err.code !== "ENOENT") {
                console.error(`Failed to delete ${filePaths[path]}:`, err.message);
            } else
                console.error(
                    `Failed to delete ${filePaths[path]} for a unknown reason`,
                    err?.message
                );
        }
    }
};
