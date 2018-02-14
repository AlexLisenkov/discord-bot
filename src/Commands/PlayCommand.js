"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Command_1 = require("./Command");
var YouTube_1 = require("../YouTube/YouTube");
var Song_1 = require("../YouTube/Song");
var PlayCommand = /** @class */ (function (_super) {
    __extends(PlayCommand, _super);
    function PlayCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.command = "play";
        return _this;
    }
    PlayCommand.prototype.handle = function (parameter, message, connection) {
        YouTube_1["default"].search(parameter).then(function (result) {
            if (result instanceof Song_1["default"]) {
                result.author = message.author;
                connection.pushToQueue(result);
            }
            else {
                connection.channel.send("Loaded " + result.length + " songs from playlist");
                for (var i = 0; i < result.length; i++) {
                    result[i].author = message.author;
                    connection.pushToQueue(result[i], false);
                }
            }
        })["catch"](function (error) {
            message.reply(error);
        });
    };
    return PlayCommand;
}(Command_1["default"]));
exports["default"] = PlayCommand;
