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
var NowPlayingCommand = /** @class */ (function (_super) {
    __extends(NowPlayingCommand, _super);
    function NowPlayingCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.command = "np";
        return _this;
    }
    NowPlayingCommand.prototype.handle = function (parameter, message, connection) {
        if (!connection.currentSong) {
            message.reply('`I\'m not playing anything`');
            return null;
        }
        var song = connection.currentSong;
        var embed = {
            title: song.snippet.title,
            url: song.url,
            description: song.snippet.channelTitle,
            thumbnail: {
                "url": song.snippet.thumbnails["default"].url
            },
            author: {
                'name': '🎶 Now playing',
                'url': 'https://discord.gg'
            },
            footer: {
                'text': "Added by " + song.author.username
            }
        };
        connection.channel.send('', { embed: embed });
    };
    return NowPlayingCommand;
}(Command_1["default"]));
exports["default"] = NowPlayingCommand;
