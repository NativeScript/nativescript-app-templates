const fs = require("fs");
const path = require("path");

/**
 * @see https://github.com/NativeScript/nativescript-app-templates/blob/master/packages/template-hello-world-ts/hooks/after-createProject/after-createProject.js
 */
module.exports = function (hookArgs) {
    const appRootFolder = hookArgs.projectDir;
    const toolsDir = path.join(appRootFolder, "tools");
    const vscodeDir = path.join(appRootFolder, ".vscode");
    const srcGitignore = path.join(toolsDir, "dot.gitignore");
    const destGitignore = path.join(appRootFolder, ".gitignore");
    // I'll continue to copy this file across, but omit the recommendation for "telerik.nativescript" as that's Core-focused.
    const srcVscodeExtensions = path.join(toolsDir, "vscode.extensions.json");
    const destVscodeExtensions = path.join(vscodeDir, "extensions.json");

    try {
        fs.mkdirSync(vscodeDir);
        fs.copyFileSync(srcVscodeExtensions, destVscodeExtensions);
        fs.copyFileSync(srcGitignore, destGitignore);
    } catch (error) {
        console.log(error);
    } finally {
        try {
            deleteFolderSync(toolsDir);

            const readme = path.join(appRootFolder, "README.md");
            fs.unlinkSync(readme);
    
            deleteFolderSync(__dirname);
        } catch (error) {
            console.log(error);
        }
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