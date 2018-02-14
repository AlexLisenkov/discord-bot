"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../json-type.d.ts"/>
const configFile = require("../../youtube.config.json");
class YoutubeConfig {
}
YoutubeConfig.API_KEY = configFile.API_KEY;
YoutubeConfig.default_stream_options = configFile.default_stream_options;
YoutubeConfig.blacklist = configFile.blacklist;
exports.default = YoutubeConfig;
//# sourceMappingURL=YoutubeConfig.js.map