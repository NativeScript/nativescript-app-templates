const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;

console.log("Preinstall script running...");

const srcGitignore = "dot.gitignore";
const destGitignore = ".gitignore";

getAppRootFolder()
    .then((appRootFolder) => copyFile(appRootFolder, srcGitignore, destGitignore));

function copyFile(appRootFolder, srcFilename, destFilename = srcFilename) {
    return new Promise((resolve, reject) => {
        const sourcePath = path.join(__dirname, srcFilename);
        const destPath = path.join(appRootFolder, destFilename);

        console.log(`Creating ${path.resolve(destPath)}...`);
        fs.rename(sourcePath, destPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve();
        });
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
