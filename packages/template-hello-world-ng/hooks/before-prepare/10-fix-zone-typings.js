var path = require('path');
var shelljs = require('shelljs');

module.exports = function() {
    var zoneDts = path.join('node_modules', 'angular2', 'typings', 'zone', 'zone.d.ts');
    shelljs.sed('-i', /.*reference.*path.*es6-shim.*\n/g, '', zoneDts);
}
