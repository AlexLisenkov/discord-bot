"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractModel_1 = require("./AbstractModel");
class Statistics_GuildSongs extends AbstractModel_1.default {
    constructor() {
        super(...arguments);
        this.ref = 'statistics/guilds';
        this.staticKey = 'total_songs';
    }
    increment() {
        this.data.transaction(current => {
            return (current || 0) + 1;
        });
    }
}
exports.default = Statistics_GuildSongs;
//# sourceMappingURL=Statistics_GuildSongs.js.map