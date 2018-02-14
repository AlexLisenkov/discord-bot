"use strict";
exports.__esModule = true;
var VoiceConnection_1 = require("./VoiceConnection");
var VoiceConnections = /** @class */ (function () {
    function VoiceConnections() {
    }
    VoiceConnections.getOrCreate = function (message) {
        return new Promise(function (then, err) {
            var guildId = message.guild.id;
            if (!(guildId in VoiceConnections.guilds)) {
                if (message.member.voiceChannel === undefined)
                    err('You got to be in a voice channel to summon me');
                VoiceConnections.guilds[guildId] = new VoiceConnection_1["default"](message.member.voiceChannel, message.channel);
            }
            then(VoiceConnections.guilds[guildId]);
        });
    };
    VoiceConnections.remove = function (guildId) {
        if (guildId in VoiceConnections.guilds)
            delete VoiceConnections.guilds[guildId];
    };
    VoiceConnections.guilds = [];
    return VoiceConnections;
}());
exports["default"] = VoiceConnections;
