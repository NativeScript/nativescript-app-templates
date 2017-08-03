const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;

console.log("postinstall script running...");

getPackageJson()
    .then((packageJsonData) => {
        // results of glob parameter expansion can vary depending on shell, and its configuration
        // quote the parameter to use node glob syntax (using double quotes if you need it to run in Windows)
        addScriptCommand(packageJsonData, {
            commandName: "lint",
            command: "tslint \"app/**/*.ts\"",
            message: "Updating package.json scripts for linting..."
        });
    })
    .catch((err) => {
        console.error(err);
    })
    .then(() => {
        // Remove tools folder including this script
        console.log("Removing tools directory...");
        deleteFolderSync(__dirname);
    });

function getPackageJson() {
    return getAppRootFolder()
        .then((appRootFolder) => {
            const packageJsonPath = path.join(appRootFolder, "package.json");
            const packageJson = require(packageJsonPath);

            if (!packageJson) {
                throw new Error("package.json file not found");
            }

            return {
                packageJson,
                packageJsonPath
            };
        });
}

function getAppRootFolder() {
    return new Promise((resolve, reject) => {
        // npm prefix returns the closest parent directory to contain a package.json file
        exec("cd .. && npm prefix", (err, stdout) => {
            if (err) {
                return reject(err);
            }

            resolve(stdout.toString().trim());
        });
    });
}

function addScriptCommand(packageJsonData, options) {
    return new Promise((resolve, reject) => {
        if (options.message) {
            console.log(options.message);
        }

        const { packageJson, packageJsonPath } = packageJsonData;
        if (!packageJson.scripts) {
            packageJson.scripts = {};
        }

        packageJson.scripts[options.commandName] = options.command;

        const updatedContent = JSON.stringify(packageJson);
        fs.writeFile(packageJsonPath, updatedContent, (err) => {
            if (err) {
                return reject(err);
            }

            resolve();
        });
    });
}

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
