const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;

console.log("after-createProject script running...");

const srcGitignore = "dot.gitignore";
const destGitignore = ".gitignore";
let appRootFolder;

findAppRootFolder()
    .then(() => {
        return copyFile(srcGitignore, destGitignore);
    })
    .then(() => {
        console.log("Removing tools directory...");
        const toolsDir = path.join(appRootFolder, 'tools');
        deleteFolderSync(toolsDir);

        console.log("Removing after-createProject...");
        deleteFolderSync(__dirname);
    })
    .catch((err) => {
        console.log(err);
    });

function copyFile(srcFilename, destFilename = srcFilename) {
    return new Promise((resolve, reject) => {
        const sourcePath = path.join(appRootFolder, 'tools', srcFilename);
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

function findAppRootFolder() {
    return new Promise((resolve, reject) => {
        // npm prefix returns the closest parent directory to contain a package.json file
        exec(`cd ${__dirname} && npm prefix`, (err, stdout) => {
            if (err) {
                return reject(err);
            }

            appRootFolder = stdout.toString().trim();
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