"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../json-type.d.ts"/>
const configFile = require("../../config.json");
class Config {
}
Config.token = configFile.token;
Config.secret = configFile.secret;
Config.prefix = configFile.prefix;
Config.http_port = configFile.http_port ? configFile.http_port : 8000;
Config.queue_limit = configFile.queue_limit;
Config.firebase = configFile.firebase;
Config.message_lifetime = configFile.message_lifetime;
Config.dblapi = configFile.dblapi;
Config.dbapi = configFile.dbapi;
Config.discordlist = configFile.discordlist;
Config.discordservices = configFile.discordservices;
Config.botlistspace = configFile.botlistspace;
Config.environment = configFile.environment;
exports.default = Config;
//# sourceMappingURL=Config.js.map