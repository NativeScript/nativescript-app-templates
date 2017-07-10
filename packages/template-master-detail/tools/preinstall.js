const fs = require("fs");
const path = require("path");

console.log("preinstall script running...");

const firebaseConfig = "firebase.nativescript.json";
console.log(`creating ${firebaseConfig} to enable firebase...`);
copyConfig(firebaseConfig);

const eslintConfig = ".eslintrc";
console.log(`creating ${eslintConfig} to enable linting...`);
copyConfig(eslintConfig);

const eslintIgnoreConfig = ".eslintignore";
console.log(`creating ${eslintIgnoreConfig} to enable linting...`);
copyConfig(eslintIgnoreConfig);

const jsbeautifyConfig = ".jsbeautifyrc";
console.log(`creating ${jsbeautifyConfig}...`);
copyConfig(jsbeautifyConfig);

function copyConfig(configFilename) {
    const oldPath = path.join(__dirname, configFilename);
    const newPath = path.join(getAppRootFolder(), configFilename);
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function getAppRootFolder() {
    return path.join("..", "..", "..");
}
