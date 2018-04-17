const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;

console.log("Postinstall script running...");

getPackageJson()
    .then((packageJsonData) => {
        updateFirebaseConfigAppId(packageJsonData)
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

function updateFirebaseConfigAppId(packageJsonData) {
    console.log("Updating google services configuration for firebase...");

    const googleServicesJsonPath = path.join(process.cwd(), "App_Resources", "Android", "google-services.json");
    const googleServiceInfoPlistPath = path.join(process.cwd(), "App_Resources", "iOS", "GoogleService-Info.plist");

    const packageJson = packageJsonData.packageJson;
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
