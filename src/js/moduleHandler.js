// Modules
const fs = require('fs');

// Custom Modules
const { compareVersions } = require('../js/modules/utilityModules');

// JSON Files
const appInfo = require('../json/appInfo.json');

// Variables
var loadedModules = [];

async function loadModules() {
    const modulesDir = await locateDir('app') + '\\modules';
    console.log(modulesDir);
    fs.stat(modulesDir, (err, stat) => {
        if (stat == undefined) {
            fs.mkdirSync(modulesDir);
        } else {
            var modules = fs.readdirSync(modulesDir);
            if (modules.length == 0) return false;

            modules.forEach(async module => {
                var moduleValidation = await validateModule(module);
                console.log(moduleValidation);

                /*
                var htmlToModuleFolderDir = '../../modules';
                var moduleManifestDir = modulesDir + '\\' + module + '\\manifest.json';
                var moduleManifest = JSON.parse(fs.readFileSync(moduleManifestDir, 'utf8'));

                let newModuleScript = document.createElement('script');
                newModuleScript.src = htmlToModuleFolderDir + moduleManifest.mainFile;*/
            })
        }
    })
}

// Tells you if your module goes brrrrr or not
async function validateModule(module) {
    const modulesDir = await locateDir('app') + '\\modules';
    const thisModuleDir = modulesDir + '\\' + module;
    var moduleManifestDir = thisModuleDir + '\\manifest.json';

    var moduleData = {}

    var moduleManifest;

    // Check for manifest file
    try {
        var stat = fs.statSync(moduleManifestDir);
        if (stat == undefined) {
            moduleData.manifestFile = 404;
            return moduleData;
        }
        moduleManifest = JSON.parse(fs.readFileSync(moduleManifestDir, 'utf8'));
    } catch {
        moduleData.manifestFile = 404;
        return moduleData;
    }

    // Check for main JavaScript file
    try {
        var mainFileLocation = thisModuleDir + moduleManifest.mainFile.replace('/', '\\');
        var stat = fs.statSync(mainFileLocation);
        if (stat == undefined) {
            moduleData.mainFile = 404;
            return moduleData;
        }
        moduleData.mainFile = mainFileLocation;
    } catch {
        moduleData.mainFile = 404;
        return moduleData;
    }

    // Compare app version compatibility
    try {
        if (moduleManifest.appVersion == "") {
            moduleData.appVersion = 404;
        }
        var compatibility = compareVersions(moduleManifest.appVersion, appInfo.version);
        if (compatibility !== 0) {
            moduleData.appVersion = 505;
        } else {
            var versionString;
            if (moduleManifest.appVersion.indexOf('^') > -1) {
                versionString = moduleManifest.appVersion.split('^')[1];
            } else if (moduleManifest.appVersion.indexOf('v') > -1) {
                versionString = moduleManifest.appVersion.split('v')[1];
            }
            moduleData.appVersion = versionString;
        }
    } catch {
        moduleData.appVersion = 404;
    }

    // Check for module version
    try {
        if (moduleManifest.moduleVersion == "") {
            moduleData.moduleVersion = 404;
        } else {
            moduleData.moduleVersion = moduleManifest.moduleVersion;
        }
    } catch {
        moduleData.moduleVersion = 404;
    }
    

    // Check for icon file (Optional)
    try {
        var iconLocation = thisModuleDir + moduleManifest.icon.replace('/', '\\');
        fs.stat(iconLocation, (err, stat) => {
            if (stat == undefined || moduleManifest.icon === "") return moduleData.icon = 404 ;
            moduleData.icon = iconLocation;
        })
    } catch {
        moduleData.icon = 404;
    }

    // Check for banner file (Optional)
    try {
        var bannerLocation = thisModuleDir + moduleManifest.banner.replace('/', '\\');
        fs.stat(bannerLocation, (err, stat) => {
            if (stat == undefined || moduleManifest.banner === "") return moduleData.banner = 404 ;
            moduleData.banner = bannerLocation;
        })
    } catch {
        moduleData.banner = 404;
    }

    // Check for name (Optional) 
    try {
        if (moduleManifest.name === "") {
            moduleData.name = module;
        } else {
            moduleData.name = moduleManifest.name;
        }
    } catch {
        moduleData.name = 404;
    }

    // Check for author (Optional) 
    try {
        if (moduleManifest.author === "") {
            moduleData.author = 404;
        } else {
            moduleData.author = moduleManifest.author;
        }
    } catch {
        moduleData.author = 404;
    }

    // Check for description (Optional)
    try {
        if (moduleManifest.banner === "") {
            moduleData.description = 404;
        } else {
            moduleData.description = moduleManifest.description;
        }
    } catch {
        moduleData.description = 404;
    }

    // Check for html scripts (Optional)
    var htmlScriptsArray = [];
    try {
        var htmlScripts = moduleManifest.htmlScripts;
        htmlScripts.forEach(htmlScript => {
            if (htmlScript) {
                var htmlScriptLocation = thisModuleDir + htmlScript.replace('/', '\\');

                fs.stat(htmlScriptLocation, (err, stat) => {
                    if (stat == undefined) return htmlScriptsArray.push({ "location": htmlScriptLocation, "error": 404 });
                    if (htmlScriptLocation.indexOf('.js') < 0) return htmlScriptsArray.push({ "location": htmlScriptLocation, "error": 415 });
                    htmlScriptsArray.push({ "location": htmlScriptLocation });
                })
            }
        })
    } catch {
        htmlScriptsArray = 404;
    }

    moduleData.htmlScripts = htmlScriptsArray;

    // Check for style sheets (Optional)
    var styleSheetsArray = [];
    try {
        var styleSheets = moduleManifest.styleSheets;
        styleSheets.forEach(styleSheet => {
            if (styleSheet) {
                var styleSheetLocation = thisModuleDir + styleSheet.replace('/', '\\');

                fs.stat(styleSheetLocation, (err, stat) => {
                    if (stat == undefined) return styleSheetsArray.push({ "location": styleSheetLocation, "error": 404 });
                    if (styleSheetLocation.indexOf('.css') < 0) return styleSheetsArray.push({ "location": styleSheetLocation, "error": 415 });
                    styleSheetsArray.push({ "location": styleSheetLocation });
                })
            }
        })
    } catch {
        styleSheetsArray = 404;
    }

    moduleData.styleSheets = styleSheetsArray;

    // Check for html documents (Optional)
    var htmlDocumentsArray = [];
    try {
        var htmlDocuments = moduleManifest.htmlDocuments;
        htmlDocuments.forEach(htmlDocument => {
            if (htmlDocument) {
                var htmlDocumentLocation = thisModuleDir + htmlDocument.replace('/', '\\');

                fs.stat(htmlDocumentLocation, (err, stat) => {
                    if (stat == undefined) return htmlDocumentsArray.push({ "location": htmlDocumentLocation, "error": 404 });
                    if (htmlDocumentLocation.indexOf('.html') < 0) return htmlDocumentsArray.push({ "location": htmlDocumentLocation, "error": 415 });
                    htmlDocumentsArray.push({ "location": htmlDocumentLocation });
                })
            }
        })
    } catch {
        htmlDocumentsArray = 404;
    }

    moduleData.htmlDocuments = htmlDocumentsArray;

    return moduleData;
}

function forceLoadModule (module) {

}