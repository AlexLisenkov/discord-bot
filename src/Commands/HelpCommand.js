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
var HelpCommand = /** @class */ (function (_super) {
    __extends(HelpCommand, _super);
    function HelpCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.command = "help";
        return _this;
    }
    HelpCommand.prototype.handle = function (parameter, message, connection) {
        var prefix = Config_1["default"].prefix;
        var reply = {
            color: 0xA2E13D,
            author: {
                'name': 'ℹ️ Available commands',
                'url': 'https://discord.gg'
            },
            description: "\n**" + prefix + "help** *List commands*\n**" + prefix + "play** [query|url] *Add a song to queue*\n**" + prefix + "pause** *Pause current song*\n**" + prefix + "resume** *Resume current song*\n**" + prefix + "queue** *List queue*\n**" + prefix + "skip** *Skip current song*\n**" + prefix + "np** *Show the song that is currenty playing*\n**" + prefix + "remove** [index] *Remove a song from the playlist (hint: say '" + prefix + "queue' to see indexes)*\n**" + prefix + "volume** [0-100] *Set the volume*\n**" + prefix + "mute** *Mute me*\n**" + prefix + "unmute** *Unmute me*\n**" + prefix + "clearqueue** *Clears queue and stops playing*\n**" + prefix + "disconnect** *Disconnect the bot*\n"
        };
        connection.channel.send('', { embed: reply });
    };
    return HelpCommand;
}(Command_1["default"]));
exports["default"] = HelpCommand;
