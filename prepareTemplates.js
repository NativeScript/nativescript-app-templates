// @ts-check
const fs = require('fs');
const path = require('path');
const cpy = require('cpy')

const SHARED_PATH = path.resolve(__dirname, './shared')
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

    // Copy shared resources into template
    cpy(`**/*`, templatePath, {
        cwd: SHARED_PATH,
        overwrite: false,
        dot: true,
        parents: true
    })
}