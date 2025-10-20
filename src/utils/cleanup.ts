import fs from "fs/promises";
import * as FS from "fs";

export const cleanupFiles = async (...filePaths: string[]) => {
    for (const path in filePaths) {
        // console.log("path details : ", filePaths[path]);
        try {
            await fs.unlink(filePaths[path] as string);
            console.log(`Cleaning : ${filePaths[path]}`);
        } catch (err: any) {
            if (err.code && err.code !== "ENOENT") {
                console.error(
                    `Failed to delete ${filePaths[path]}:`,
                    err.message
                );
            } else
                console.error(
                    `Failed to delete ${filePaths[path]} for a unknown reason`,
                    err?.message
                );
        }
    }
};

export const removeTempJobFolder = async (folderPath: string) => {
    if (FS.existsSync(folderPath)) {
        setTimeout(() => {
            FS.rmSync(folderPath, { recursive: true, force: true });
            console.log(`removing folder: ${folderPath}`);
        }, 3000);
    } else {
        console.log("Folder didn't exists or any other unknown erre occured");
    }
};
