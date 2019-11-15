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
            const packageJsonPath = path.join(appRootFolder, "package.json");
            const packageJson = require(packageJsonPath);

            if (!packageJson) {
                throw new Error("package.json file not found");
            }

            return updateFirebaseConfigAppId(packageJson);
        })
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

    function updateFirebaseConfigAppId(packageJson) {
        const googleServicesJsonPath = path.join(appRootFolder, "app", "App_Resources", "Android", "google-services.json");
        const googleServiceInfoPlistPath = path.join(appRootFolder, "app", "App_Resources", "iOS", "GoogleService-Info.plist");

        if (!packageJson.nativescript || !packageJson.nativescript.id) {
            return Promise.reject(new Error("cannot find nativescript node in package.json file"));
        }

        return Promise.all([
            replaceAppId(googleServicesJsonPath, packageJson.nativescript.id),
            replaceAppId(googleServiceInfoPlistPath, packageJson.nativescript.id)
        ]);
    }

    function replaceAppId(filePath, appId) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, "utf8", (err, content) => {
                if (err) {
                    return reject(err);
                }

                const appIdPlaceholder = "__PACKAGE__";
                const updatedContent = content.replace(appIdPlaceholder, appId);
                fs.writeFile(filePath, updatedContent, (err) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve();
                });
            });
        });
    }
};
