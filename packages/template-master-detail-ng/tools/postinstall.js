const fs = require("fs");
const path = require("path");
const packageJsonPath = path.join(process.cwd(), _getAppRootFolder(), "package.json");
const packageJson = require(packageJsonPath);

console.log("Updating package.json scripts for linting");
modifyPackageJson();

// Remove tools folder including this script
console.log("Removing tools directory");
deleteFolder(__dirname);

function modifyPackageJson() {
    if (!packageJson) {
        console.error(`${packageJsonPath} not found`);

        return;
    }

    if (!packageJson.scripts) {
        packageJson.scripts = {};
    }

    packageJson.scripts.lint = "tslint ./app/**/*.ts";

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

function _getAppRootFolder() {
    return "../../";
}
