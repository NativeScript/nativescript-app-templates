const fs = require("fs");
const path = require("path");

console.log("Postinstall script running...");

// Remove tools folder including this script
console.log("Removing tools directory...");
deleteFolderSync(__dirname);

function deleteFolderSync(folderPath) {
    if (fs.statSync(folderPath).isDirectory()) {
        fs.readdirSync(folderPath).forEach((file) => {
            const content = path.join(folderPath, file);
            const contentDirs = fs.statSync(content).isDirectory();

            if (contentDirs) {
                deleteFolderSync(content);
            }
            else {
                fs.unlinkSync(content);
            }
        });

        fs.rmdirSync(folderPath);
    }
}
