"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../json-type.d.ts"/>
const configFile = require("../../config.json");
class Config {
}
Config.token = configFile.token;
Config.prefix = configFile.prefix;
Config.queue_limit = configFile.queue_limit;
exports.default = Config;
//# sourceMappingURL=Config.js.map