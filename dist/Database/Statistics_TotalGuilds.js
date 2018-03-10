"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractModel_1 = require("./AbstractModel");
const Statistics_HighestGuilds_1 = require("./Statistics_HighestGuilds");
class Statistics_TotalGuilds extends AbstractModel_1.default {
    constructor() {
        super(...arguments);
        this.ref = 'statistics/global';
        this.global = true;
        this.staticKey = 'total_guilds';
    }
    increment() {
        this.data.transaction(current => {
            return (current || 0) + 1;
        });
        new Statistics_HighestGuilds_1.default().increment();
    }
    decrement() {
        this.data.transaction(current => {
            return (current || 0) - 1;
        });
    }
}
exports.default = Statistics_TotalGuilds;
//# sourceMappingURL=Statistics_TotalGuilds.js.map