"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VoiceConnection_1 = require("./VoiceConnection");
class VoiceConnections {
    static getOrCreate(message) {
        return new Promise((then, err) => {
            const guildId = message.guild.id;
            if (!(guildId in VoiceConnections.guilds)) {
                VoiceConnections.guilds[guildId] = new VoiceConnection_1.default(message);
            }
            then(VoiceConnections.guilds[guildId]);
        });
    }
    static remove(guildId) {
        if (guildId in VoiceConnections.guilds)
            delete VoiceConnections.guilds[guildId];
    }
    static getGuilds() {
        return this.guilds;
    }
}
VoiceConnections.guilds = [];
exports.default = VoiceConnections;
//# sourceMappingURL=VoiceConnections.js.map