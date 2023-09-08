import fs from "fs";

// Function to check if a file exists
export function fileExists (filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
}