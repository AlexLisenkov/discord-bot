"use strict";
exports.__esModule = true;
/// <reference path="../json-type.d.ts"/>
var configFile = require("../../youtube.config.json");
var YoutubeConfig = /** @class */ (function () {
    function YoutubeConfig() {
    }
    YoutubeConfig.API_KEY = configFile.API_KEY;
    YoutubeConfig.default_stream_options = configFile.default_stream_options;
    YoutubeConfig.blacklist = configFile.blacklist;
    return YoutubeConfig;
}());
exports["default"] = YoutubeConfig;
