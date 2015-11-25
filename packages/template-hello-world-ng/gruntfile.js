var path = require("path");
var shelljs = require("shelljs");

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');

    var nsDistPath = process.env.NSDIST || './deps/NativeScript/bin/dist';
    var nsCLIPath = process.env.NSCLI || './deps/nativescript-cli';

    var cliBuildEnv = JSON.parse(JSON.stringify(process.env));
    cliBuildEnv['BUILD_NUMBER'] = 'angular2';

    var modulesDestPath = "app/tns_modules";
    var typingsDestPath = "typings/nativescript";

    var androidAvd = grunt.option('avd') || "nexus"
    var genyDevice = grunt.option('geny') || "nexus7"
    var iOSDevice = grunt.option('device') || "nexus"

    grunt.initConfig({
        ts: {
            build: {
                tsconfig: 'app/tsconfig.json',
                options: {
                    fast: "never",
                    compiler: "node_modules/typescript/bin/tsc",
                },
            },
        },
        copy: {
        },
        clean: {
            app: {
                cwd: 'app',
                expand: true,
                src: [
                    '**/*.js',
                    '**/*.map',
                ]
            },
            nodeModulesGz: {
                // HACK: Work around a {N} CLI bug  that prevents you from using
                // NPM packages containing *.gz files.
                // https://github.com/NativeScript/nativescript-cli/issues/393
                expand: true,
                cwd: './node_modules',
                src: [
                    '**/*.gz',
                ]
            },
        },
        shell: {
            depNSInit: {
                command: [
                    'npm install',
                    'grunt --no-runtslint',
                ].join('&&'),
                options: {
                    execOptions: {
                        cwd: 'deps/NativeScript',
                    }
                }
            },
            depNSCLIInit: {
                command: [
                    'npm install',
                    'grunt pack',
                ].join('&&'),
                options: {
                    execOptions: {
                        cwd: 'deps/nativescript-cli',
                        env: cliBuildEnv,
                    }
                }
            },
            localInstallModules: {
                command: "npm install \"<%= nsPackagePath %>\""
            },
            localInstallCLI: {
                command: "npm install -g \"<%= nsCLIPath %>\" --upgrade"
            },
            emulateGeny: {
                command: "tns emulate android --geny '" + genyDevice +"'"
            },
            emulateAndroid: {
                command: "tns emulate android --avd '" + androidAvd +"'"
            },
            emulateIOS: {
                command: "tns emulate ios --device '" + iOSDevice +"'"
            }
        }
    });

    grunt.registerTask("updateModules", [
        "getNSPackage",
        "shell:localInstallModules",
    ]);

    grunt.registerTask("updateCLI", [
        "getCLIPackage",
        "shell:localInstallCLI",
    ]);

    grunt.registerTask("removeTraceurPackage", function() {
        var traceurPath = 'node_modules/angular2/node_modules/traceur';
        if (grunt.file.isDir(traceurPath))
            grunt.file.delete(traceurPath);
    });

    grunt.registerTask("getNSPackage", function() {
        var packageFiles = grunt.file.expand({
            cwd: nsDistPath
        },[
            'tns-core-modules*.tgz'
        ]);
        var nsPackagePath = path.join(nsDistPath, packageFiles[0]);
        grunt.config('nsPackagePath', nsPackagePath);
    });

    grunt.registerTask("getCLIPackage", function() {
        var packageFiles = grunt.file.expand({
            cwd: nsCLIPath
        },[
            'nativescript-*.tgz'
        ]);
        var nsCLIPackage = path.join(nsCLIPath, packageFiles[0]);
        grunt.config('nsCLIPath', nsCLIPackage);
    });

    grunt.registerTask("clean-tsd-dts", function() {
        //remove broken angular dts files from tsd.d.ts
        //using the ones in the typings dir
        shelljs.sed('-i', /.*node_modules[\/\\]angular2.*\n/g, '', 'typings/tsd.d.ts');
    });

    grunt.registerTask("app", [
        "ts:build",
    ]);

    grunt.registerTask("prepare", [
        // tns CLI tool installed via HTTP.
        // Run prepare-cli manually, if you want to test with a local build.
        //"prepare-cli",
        "prepare-modules",
        "clean:nodeModulesGz",
    ]);

    grunt.registerTask("prepare-modules", [
        "shell:depNSInit",
        "updateModules",
    ]);

    grunt.registerTask("prepare-cli", [
        "shell:depNSCLIInit",
        "updateCLI",
    ]);

    grunt.registerTask("app-full", [
        "clean:app",
        "app",
    ]);

    grunt.registerTask("run-android", ["app", "shell:emulateAndroid"])
    grunt.registerTask("run-geny", ["app", "shell:emulateGeny"])
    grunt.registerTask("run-ios", ["app", "shell:emulateIOS"])
}
