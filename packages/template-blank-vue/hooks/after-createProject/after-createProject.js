const fs = require("fs");
const path = require("path");

module.exports = function (hookArgs) {
    const srcGitignore = "dot.gitignore";
    const destGitignore = ".gitignore";
    let appRootFolder = hookArgs.projectDir;

    return copyFile(srcGitignore, destGitignore)
        .then(() => {
            const toolsDir = path.join(appRootFolder, 'tools');
            deleteFolderSync(toolsDir);

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
