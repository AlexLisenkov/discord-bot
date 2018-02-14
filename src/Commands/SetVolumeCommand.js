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
var SetVolumeCommand = /** @class */ (function (_super) {
    __extends(SetVolumeCommand, _super);
    function SetVolumeCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.command = "volume";
        return _this;
    }
    SetVolumeCommand.prototype.handle = function (parameter, message, connection) {
        var volume = parseInt(parameter) / 100;
        connection.setVolume(volume);
        var reply = '```markdown';
        volume = volume * 10;
        if (volume > 10)
            volume = 10;
        else if (volume < 0)
            volume = 0;
        var progress = '';
        for (var i = 0; i < volume * 2; i++)
            progress += '█';
        for (var i = 0; i < 20 - (volume * 2); i++)
            progress += ' ';
        var emoji = '';
        if (volume > 5)
            emoji = '🔊';
        else if (volume > 2)
            emoji = '🔉';
        else if (volume === 0)
            emoji = '🔇';
        else
            emoji = '🔈';
        reply += "\n" + emoji + " " + progress + " " + volume * 10 + "%";
        reply += '```';
        connection.channel.send(reply);
    };
    return SetVolumeCommand;
}(Command_1["default"]));
exports["default"] = SetVolumeCommand;
