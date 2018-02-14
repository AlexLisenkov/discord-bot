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
var Config_1 = require("../Config/Config");
var QueueCommand = /** @class */ (function (_super) {
    __extends(QueueCommand, _super);
    function QueueCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.command = "queue";
        return _this;
    }
    QueueCommand.prototype.handle = function (parameter, message, connection) {
        if (!connection.triggered || connection.queue.length < 1) {
            message.reply('There\'s no queue 🙁, type in \'*' + Config_1["default"].prefix + 'play [song title]*\' to start');
            return null;
        }
        var reply = {
            color: 0xA2E13D,
            author: {
                'name': '🔻 Playlist',
                'url': 'https://discord.gg'
            },
            description: ''
        };
        for (var i = 0; i < connection.queue.length; i++) {
            reply.description += "**[" + (i + 1) + "]**: " + connection.queue[i].snippet.title + "\n";
            if (i >= 24) {
                reply.description += "\n Showing " + (i + 1) + " of " + connection.queue.length + " total";
                break;
            }
        }
        connection.channel.send('', { embed: reply });
    };
    return QueueCommand;
}(Command_1["default"]));
exports["default"] = QueueCommand;
