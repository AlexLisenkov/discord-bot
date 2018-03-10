"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractModel_1 = require("./AbstractModel");
class Statistics_HighestGuilds extends AbstractModel_1.default {
    constructor() {
        super(...arguments);
        this.ref = 'statistics/global';
        this.global = true;
        this.staticKey = 'guild_peed';
    }
    increment() {
        this.data.transaction(current => {
            return (current || 0) + 1;
        });
    }
}
exports.default = Statistics_HighestGuilds;
//# sourceMappingURL=Statistics_HighestGuilds.js.map