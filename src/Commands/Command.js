"use strict";
exports.__esModule = true;
var Client_1 = require("../ActiveConnection/Client");
var VoiceConnections_1 = require("../ActiveConnection/VoiceConnections");
var Config_1 = require("../Config/Config");
var Command = /** @class */ (function () {
    function Command() {
        var _this = this;
        Client_1["default"].instance.on("message", function (message) {
            if (message.author.bot)
                return;
            if (message.content.startsWith(Config_1["default"].prefix + _this.command)) {
                /*                if( permissions[this.command()] !== undefined && permissions[this.command()].length > 0 ){
                                    let permit = false;
                                    message.member.roles.forEach( (V, K) => {
                                        if( permissions[this.command()].indexOf(V.name) !== -1 )
                                            permit = true;
                                    });
                
                                    if( !permit )
                                        return message.reply('I\'m sorry, you don\'t have the right role to execute this command');
                                }*/
                var connect = VoiceConnections_1["default"].getOrCreate(message);
                connect.then(function (connection) {
                    _this.handle(message.content.replace(Config_1["default"].prefix + _this.command, '').trim(), message, connection);
                })["catch"](function (err) {
                    message.reply(err);
                });
            }
        });
    }
    return Command;
}());
exports["default"] = Command;
