"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Blacklist_1 = require("./Blacklist");
const DisallowedVoiceChannels_1 = require("./DisallowedVoiceChannels");
class Guild {
    constructor(guildId) {
        this.blacklist = new Blacklist_1.default(guildId);
        this.disallowedVoiceChannels = new DisallowedVoiceChannels_1.default(guildId);
    }
}
exports.default = Guild;
//# sourceMappingURL=Guild.js.map