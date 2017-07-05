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

// Remove assets folder
console.log('Removing assets folder');
const assetsDir = path.join(__dirname, 'assets');
deleteFolder(assetsDir);

function copyConfig(configFilename) {
    const oldPath = path.join(__dirname, configFilename);
    const newPath = path.join(getAppRootFolder(), configFilename);
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function deleteFolder(folderPath) {
    if (fs.statSync(folderPath).isDirectory()) {
        fs.readdirSync(folderPath).forEach(function (file) {
            let content = path.join(folderPath, file);

            if (fs.statSync(content).isDirectory()) {
                delFodler(content);
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
