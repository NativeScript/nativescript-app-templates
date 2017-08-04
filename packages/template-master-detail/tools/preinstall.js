const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;

console.log("preinstall script running...");

const firebaseConfig = "firebase.nativescript.json";
const eslintConfig = ".eslintrc";
const eslintIgnoreConfig = ".eslintignore";
const jsbeautifyConfig = ".jsbeautifyrc";

getAppRootFolder()
    .then((appRootFolder) => Promise.all([
        copyConfig(firebaseConfig, appRootFolder),
        copyConfig(eslintConfig, appRootFolder),
        copyConfig(eslintIgnoreConfig, appRootFolder),
        copyConfig(jsbeautifyConfig, appRootFolder)
    ]));

function copyConfig(configFilename, appRootFolder) {
    return new Promise((resolve, reject) => {
        const sourcePath = path.join(__dirname, configFilename);
        const destPath = path.join(appRootFolder, configFilename);

        console.log(`creating ${path.resolve(destPath)}...`);
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
