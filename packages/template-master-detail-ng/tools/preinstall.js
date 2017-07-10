const fs = require("fs");
const path = require("path");

console.log("preinstall script running...");

const firebaseConfig = "firebase.nativescript.json";
console.log(`creating ${firebaseConfig} to enable firebase...`);
copyConfig(firebaseConfig);

const tslintConfig = "tslint.json";
console.log(`creating ${tslintConfig} to enable linting...`);
copyConfig(tslintConfig);

function copyConfig(configFilename) {
    const oldPath = path.join(__dirname, configFilename);
    const newPath = path.join(getAppRootFolder(), configFilename);
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

function getAppRootFolder() {
    return path.join("..", "..", "..");
}
