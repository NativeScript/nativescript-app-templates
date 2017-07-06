"use strict";
const fs = require("fs");
const path = require("path");

console.log("preinstall script running...");

console.log("creating firebase.nativescript.json to enable firebase...");
const firebaseConfig = "firebase.nativescript.json";
copyConfig(firebaseConfig);

console.log("creating tslint.json to enable linting...");
const tslintConfig = "tslint.json";
copyConfig(tslintConfig);

// Remove tools folder including this script
console.log('Removing tools directory');
deleteFolder(__dirname);

function copyConfig(configFilename) {
    const oldPath = path.join(__dirname, configFilename);
    const newPath = path.join(getAppRootFolder(), configFilename);
    fs.renameSync(oldPath, newPath);
}

function deleteFolder(folderPath) {
    if (fs.statSync(folderPath).isDirectory()) {
        fs.readdirSync(folderPath).forEach(function (file) {
            let content = path.join(folderPath, file);
            let contentDirs = fs.statSync(content).isDirectory();

            if (contentDirs) {
                deleteFolder(content);
            } else {

                fs.unlinkSync(content);
            }
        });
        fs.rmdirSync(folderPath);
    }
}

function getAppRootFolder() {
    return "../../../";
}

