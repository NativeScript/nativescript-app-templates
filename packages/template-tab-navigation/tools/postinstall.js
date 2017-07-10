const fs = require("fs");
const path = require("path");
const packageJsonPath = path.join(process.cwd(), getAppRootFolder(), "package.json");
const packageJson = require(packageJsonPath);

console.log("postinstall script running...");

console.log("Updating package.json scripts for linting...");
// results of glob parameter expansion can vary depending on shell, and its configuration
// quote the parameter to use node glob syntax (using double quotes if you need it to run in Windows)
addScriptCommand("lint", "eslint \"app/**/*.js\"");

// Remove tools folder including this script
console.log("Removing tools directory...");
deleteFolder(__dirname);

function addScriptCommand(commandName, command) {
    if (!packageJson) {
        console.error(`${packageJsonPath} not found.`);

        return;
    }

    if (!packageJson.scripts) {
        packageJson.scripts = {};
    }

    packageJson.scripts[commandName] = command;

    const updatedContent = JSON.stringify(packageJson);
    fs.writeFile(packageJsonPath, updatedContent, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

function deleteFolder(folderPath) {
    if (fs.statSync(folderPath).isDirectory()) {
        fs.readdirSync(folderPath).forEach((file) => {
            const content = path.join(folderPath, file);
            const contentDirs = fs.statSync(content).isDirectory();

            if (contentDirs) {
                deleteFolder(content);
            }
            else {
                fs.unlinkSync(content);
            }
        });

        fs.rmdirSync(folderPath);
    }
}

function getAppRootFolder() {
    return path.join("..", "..");
}
