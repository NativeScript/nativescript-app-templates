const fs = require("fs");
const path = require("path");
const packageJsonPath = path.join(process.cwd(), getAppRootFolder(), "package.json");
const packageJson = require(packageJsonPath);

console.log("postinstall script running...");

console.log("Updating package.json scripts for linting...");
// results of glob parameter expansion can vary depending on shell, and its configuration
// quote the parameter to use node glob syntax (using double quotes if you need it to run in Windows)
addScriptCommand("lint", "eslint \"app/**/*.js\"");

console.log("Update google services configuration for firebase...");
updateFirebaseConfigAppId();

// Remove tools folder including this script
console.log("Removing tools directory...");
deleteFolder(__dirname);

function addScriptCommand(commandName, command) {
    if (!packageJson) {
        console.error(`${packageJsonPath} not found.`);

        return;
    }

    if (!packageJson.scripts) {
        packageJson.scripts = {};
    }

    packageJson.scripts[commandName] = command;

    const updatedContent = JSON.stringify(packageJson);
    fs.writeFile(packageJsonPath, updatedContent, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

function updateFirebaseConfigAppId() {
    if (!packageJson) {
        console.error(`${packageJsonPath} not found.`);

        return;
    }

    const googleServicesJsonPath = path.join(process.cwd(), "App_Resources", "Android", "google-services.json");
    const googleServiceInfoPlistPath = path.join(process.cwd(), "App_Resources", "iOS", "GoogleService-Info.plist");

    if (packageJson.nativescript.id) {
        replaceAppId(googleServicesJsonPath, packageJson.nativescript.id);
        replaceAppId(googleServiceInfoPlistPath, packageJson.nativescript.id);
    }
}

function replaceAppId(filePath, appId) {
    const appIdPlaceholder = "__PACKAGE__";
    let content;

    try {
        // synchronous read because of the synchronous deleteFolder(...)
        content = fs.readFileSync(filePath, "utf8");
    }
    catch (err) {
        console.error(err);
    }

    if (!content) {
        return;
    }

    const updatedContent = content.replace(appIdPlaceholder, appId);
    fs.writeFile(filePath, updatedContent, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

function deleteFolder(folderPath) {
    if (fs.statSync(folderPath).isDirectory()) {
        fs.readdirSync(folderPath).forEach((file) => {
            const content = path.join(folderPath, file);
            const contentDirs = fs.statSync(content).isDirectory();

            if (contentDirs) {
                deleteFolder(content);
            }
            else {
                fs.unlinkSync(content);
            }
        });

        fs.rmdirSync(folderPath);
    }
}

function getAppRootFolder() {
    return path.join("..", "..");
}
