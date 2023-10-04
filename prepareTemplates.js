// @ts-check
const fs = require('fs');
const path = require('path');
const cpy = require('cpy')

const SHARED_MOBILE_PATH = path.resolve(__dirname, './shared-mobile')
const SHARED_VISION_PATH = path.resolve(__dirname, './shared-vision')
const PACKAGES_PATH = path.resolve(__dirname, './packages')

const entries = fs.readdirSync(PACKAGES_PATH, {
    withFileTypes: true
})

for(const entry of entries) {
    if(!entry.isDirectory()) {
        continue;
    }

    prepareTemplate(path.resolve(PACKAGES_PATH, entry.name))
}

function prepareTemplate(templatePath) {
    console.log('processing ', templatePath)

    if (templatePath.indexOf('vision') > -1) {
        // Copy shared resources into template
        cpy(`**/*`, templatePath, {
            cwd: SHARED_VISION_PATH,
            overwrite: false,
            dot: true,
            parents: true
        })
    } else {
        // Copy shared resources into template
        cpy(`**/*`, templatePath, {
            cwd: SHARED_MOBILE_PATH,
            overwrite: false,
            dot: true,
            parents: true
        })
    }
}