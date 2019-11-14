const fs = require("fs");
const path = require("path");

module.exports = function (hookArgs) {
    const appRootFolder = hookArgs.projectDir;
    const srcGitignore = "dot.gitignore";
    const destGitignore = ".gitignore";
    const srcVscodeExtensions = "vscode.extensions.json";
    const destVscodeExtensions = ".vscode/extensions.json";
    const vscodeDir = path.join(appRootFolder, ".vscode");
    
    return mkDir(vscodeDir)
        .then(copyFile(srcVscodeExtensions, destVscodeExtensions))
        .then(copyFile(srcGitignore, destGitignore))
        .then(() => {
            const toolsDir = path.join(appRootFolder, "tools");
            deleteFolderSync(toolsDir);

            const readme = path.join(appRootFolder, "README.md");
            fs.unlinkSync(readme);

            deleteFolderSync(__dirname);
        })
        .catch((err) => {
            console.log(err);
        });

    function mkDir(path) {
        return new Promise((resolve, reject) => {
            fs.mkdir(path, null, (err) => {
                if (err) {
                    return reject(err);
                }

                resolve();
            });
        });
    }

    function copyFile(srcFilename, destFilename = srcFilename) {
        return new Promise((resolve, reject) => {
            const sourcePath = path.join(appRootFolder, "tools", srcFilename);
            const destPath = path.join(appRootFolder, destFilename);

            fs.rename(sourcePath, destPath, (err) => {
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
                } else {
                    fs.unlinkSync(content);
                }
            });

            fs.rmdirSync(folderPath);
        }
    }
};
