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
        const packageJsonPath = path.join(appRootFolder, "package.json");
        const packageJson = require(packageJsonPath);

        if (!packageJson) {
            throw new Error("package.json file not found");
        }

        return updateFirebaseConfigAppId(packageJson);
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

function updateFirebaseConfigAppId(packageJson) {
    console.log("Updating google services configuration for firebase...");

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