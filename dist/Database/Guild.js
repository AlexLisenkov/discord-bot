"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Blacklist_1 = require("./Blacklist");
class Guild {
    constructor(guildId) {
        this.blacklist = new Blacklist_1.default(guildId);
    }
}
exports.default = Guild;
//# sourceMappingURL=Guild.js.map