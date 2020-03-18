module.exports = function (source, map) {
    let newSource = `
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) {
            exports[p] = m[p]; 
        };
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(require("kotlinApp"));
    `
    this.callback(null, newSource, map);
};