var view = require("ui/core/view");
var fs = require("file-system");
var xml = require("xml");
var file_access_module = require("file-system/file-system-access");
var types = require("utils/types");
var componentBuilder = require("ui/builder/component-builder");
var templateBuilderDef = require("ui/builder/template-builder");
var KNOWNCOLLECTIONS = "knownCollections";
function parse(value, exports) {
    var viewToReturn;
    var componentModule = parseInternal(value, exports);
    if (componentModule) {
        viewToReturn = componentModule.component;
    }
    return viewToReturn;
}
exports.parse = parse;
function parseInternal(value, exports) {
    var rootComponentModule;
    var parents = new Array();
    var complexProperties = new Array();
    var templateBuilder;
    var xmlParser = new xml.XmlParser(function (args) {
        if (templateBuilder) {
            if (args.eventType === xml.ParserEventType.StartElement) {
                templateBuilder.addStartElement(args.prefix, args.namespace, args.elementName, args.attributes);
            }
            else if (args.eventType === xml.ParserEventType.EndElement) {
                if (templateBuilder.elementName !== args.elementName) {
                    templateBuilder.addEndElement(args.prefix, args.elementName);
                }
                else {
                    templateBuilder.build();
                    templateBuilder = undefined;
                }
            }
        }
        var parent = parents[parents.length - 1];
        var complexProperty = complexProperties[complexProperties.length - 1];
        if (args.eventType === xml.ParserEventType.StartElement) {
            if (isComplexProperty(args.elementName)) {
                var name = getComplexProperty(args.elementName);
                complexProperties.push({
                    parent: parent,
                    name: name,
                    items: [],
                });
                if (templateBuilderDef.isKnownTemplate(name, parent.exports)) {
                    templateBuilder = new templateBuilderDef.TemplateBuilder({
                        parent: parent,
                        name: name,
                        elementName: args.elementName,
                        templateItems: []
                    });
                }
            }
            else {
                var componentModule;
                if (args.prefix) {
                    var ns = args.namespace;
                    if (ns) {
                        var xmlPath = fs.path.join(fs.knownFolders.currentApp().path, ns, args.elementName) + ".xml";
                        if (fs.File.exists(xmlPath)) {
                            var jsPath = xmlPath.replace(".xml", ".js");
                            var subExports;
                            if (fs.File.exists(jsPath)) {
                                subExports = require(jsPath.replace(".js", ""));
                            }
                            componentModule = loadInternal(xmlPath, subExports);
                            if (types.isDefined(componentModule) && types.isDefined(componentModule.component)) {
                                var attr;
                                for (attr in args.attributes) {
                                    componentBuilder.setPropertyValue(componentModule.component, subExports, exports, attr, args.attributes[attr]);
                                }
                            }
                        }
                        else {
                            componentModule = componentBuilder.getComponentModule(args.elementName, ns, args.attributes, exports);
                        }
                    }
                }
                else {
                    componentModule = componentBuilder.getComponentModule(args.elementName, ns, args.attributes, exports);
                }
                if (componentModule) {
                    if (parent) {
                        if (componentModule.component instanceof view.View) {
                            if (complexProperty) {
                                addToComplexProperty(parent, complexProperty, componentModule);
                            }
                            else if (parent.component._addChildFromBuilder) {
                                parent.component._addChildFromBuilder(args.elementName, componentModule.component);
                            }
                        }
                        else if (complexProperty) {
                            addToComplexProperty(parent, complexProperty, componentModule);
                        }
                    }
                    else if (parents.length === 0) {
                        rootComponentModule = componentModule;
                    }
                    parents.push(componentModule);
                }
            }
        }
        else if (args.eventType === xml.ParserEventType.EndElement) {
            if (isComplexProperty(args.elementName)) {
                if (complexProperty) {
                    if (parent && parent.component._addArrayFromBuilder) {
                        parent.component._addArrayFromBuilder(complexProperty.name, complexProperty.items);
                        complexProperty.items = [];
                    }
                }
                complexProperties.pop();
            }
            else {
                parents.pop();
            }
        }
    }, function (e) {
        throw new Error("XML parse error: " + e.message);
    }, true);
    xmlParser.parse(value.replace('xmlns="http://www.nativescript.org/tns.xsd"', "").replace("xmlns='http://www.nativescript.org/tns.xsd'", ""));
    return rootComponentModule;
}
function load(fileName, exports) {
    var viewToReturn;
    var componentModule = loadInternal(fileName, exports);
    if (componentModule) {
        viewToReturn = componentModule.component;
    }
    return viewToReturn;
}
exports.load = load;
function loadInternal(fileName, exports) {
    var componentModule;
    if (fileName && fs.File.exists(fileName)) {
        var fileAccess = new file_access_module.FileSystemAccess();
        fileAccess.readText(fileName, function (result) {
            componentModule = parseInternal(result, exports);
        }, function (e) {
            throw new Error("Error loading file " + fileName + " :" + e.message);
        });
    }
    if (componentModule && componentModule.component) {
        componentModule.component.exports = exports;
    }
    return componentModule;
}
function isComplexProperty(name) {
    return types.isString(name) && name.indexOf(".") !== -1;
}
function getComplexProperty(fullName) {
    var name;
    if (types.isString(fullName)) {
        var names = fullName.split(".");
        name = names[names.length - 1];
    }
    return name;
}
function isKnownCollection(name, exports) {
    return KNOWNCOLLECTIONS in exports && exports[KNOWNCOLLECTIONS] && name in exports[KNOWNCOLLECTIONS];
}
function addToComplexProperty(parent, complexProperty, elementModule) {
    var parentComponent = parent.component;
    if (isKnownCollection(complexProperty.name, parent.exports)) {
        complexProperty.items.push(elementModule.component);
    }
    else if (parentComponent._addChildFromBuilder) {
        parentComponent._addChildFromBuilder("", elementModule.component);
    }
    else {
        parentComponent[complexProperty.name] = elementModule.component;
    }
}
