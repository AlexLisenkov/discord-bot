"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractModel_1 = require("./AbstractModel");
class Statistics_GuildSeconds extends AbstractModel_1.default {
    constructor() {
        super(...arguments);
        this.ref = 'statistics/guilds';
        this.staticKey = 'total_seconds';
    }
    incrementWith(seconds) {
        this.data.transaction(current => {
            return (current || 0) + seconds;
        });
    }
}
exports.default = Statistics_GuildSeconds;
//# sourceMappingURL=Statistics_GuildSeconds.js.map