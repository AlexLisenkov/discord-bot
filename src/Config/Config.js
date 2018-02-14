"use strict";
exports.__esModule = true;
/// <reference path="../json-type.d.ts"/>
var configFile = require("../../config.json");
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.token = configFile.token;
    Config.prefix = configFile.prefix;
    Config.queue_limit = configFile.queue_limit;
    return Config;
}());
exports["default"] = Config;
