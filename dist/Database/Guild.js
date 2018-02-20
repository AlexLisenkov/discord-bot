"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Blacklist_1 = require("./Blacklist");
const DisallowedVoiceChannels_1 = require("./DisallowedVoiceChannels");
const DJRole_1 = require("./DJRole");
const DJCommands_1 = require("./DJCommands");
const GuildConfig_1 = require("./GuildConfig");
class Guild {
    constructor(guildId) {
        this.blacklist = new Blacklist_1.default(guildId);
        this.disallowedVoiceChannels = new DisallowedVoiceChannels_1.default(guildId);
        this.djRole = new DJRole_1.default(guildId);
        this.djCommands = new DJCommands_1.default(guildId);
        this.guildConfig = new GuildConfig_1.default(guildId);
    }
}
exports.default = Guild;
//# sourceMappingURL=Guild.js.map