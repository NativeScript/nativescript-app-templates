"use strict";

const fs = require("fs");
const path = require("path");

function _getAppRootFolder() {
    return "../../";
}

console.log("Updating package.json scripts");
modifyPackageJson();

// Remove tools folder including this script
console.log("Removing tools directory");
deleteFolder(__dirname);

function modifyPackageJson() {
    let pjPath = path.join(process.cwd(), _getAppRootFolder(), "package.json");
    fs.readFile(pjPath, 'utf8', function (err, content) {
        if (err) {
            console.error(err);
            return;
        }

        content = JSON.parse(content);
        content.scripts = {
            lint: "tslint ./app/**/*.ts"
        };

        content = JSON.stringify(content);
        fs.writeFile(pjPath, content, "utf8", function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log(__dirname);
            }
        });

    });
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

