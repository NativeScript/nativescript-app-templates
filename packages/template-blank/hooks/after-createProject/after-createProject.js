const fs = require("fs");
const path = require("path");

module.exports = function (hookArgs) {
    const appRootFolder = hookArgs.projectDir;
    const toolsDir = path.join(appRootFolder, "tools");
    const vscodeDir = path.join(appRootFolder, ".vscode");
    const srcGitignore = path.join(toolsDir, "dot.gitignore");
    const destGitignore = path.join(appRootFolder, ".gitignore");
    const srcVscodeExtensions = path.join(toolsDir, "vscode.extensions.json");
    const destVscodeExtensions = path.join(vscodeDir, "extensions.json");

    try {
        fs.mkdirSync(vscodeDir);
        fs.copyFileSync(srcVscodeExtensions, destVscodeExtensions);
    
        fs.copyFileSync(srcGitignore, destGitignore);

        deleteFolderSync(toolsDir);

        const readme = path.join(appRootFolder, "README.md");
        fs.unlinkSync(readme);

        deleteFolderSync(__dirname);
    } catch (error) {
        console.log(error);
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
