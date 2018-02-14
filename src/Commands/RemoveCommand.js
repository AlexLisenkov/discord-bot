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
var RemoveCommand = /** @class */ (function (_super) {
    __extends(RemoveCommand, _super);
    function RemoveCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.command = "remove";
        return _this;
    }
    RemoveCommand.prototype.handle = function (parameter, message, connection) {
        var index = parseInt(parameter) - 1;
        var song = connection.queue[index];
        connection.removeIndex(index);
        var reply = {
            color: 0xf45342,
            title: song.snippet.title,
            url: song.url,
            description: song.snippet.channelTitle,
            thumbnail: {
                "url": song.snippet.thumbnails["default"].url
            },
            author: {
                'name': '❌ Song removed from queue',
                'url': 'https://discord.gg'
            },
            footer: {
                'text': "Removed by " + message.author.username
            }
        };
        connection.channel.send('', { embed: reply });
    };
    return RemoveCommand;
}(Command_1["default"]));
exports["default"] = RemoveCommand;
