"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractModel_1 = require("./AbstractModel");
const Statistics_Guild_Member_1 = require("./Statistics_Guild_Member");
class Statistics_Guild extends AbstractModel_1.default {
    constructor() {
        super(...arguments);
        this.ref = 'statistics/guilds';
    }
    memberStatistics(identifier = '') {
        return new Statistics_Guild_Member_1.default(`${this.getRef()}/members/${identifier}`);
    }
}
exports.default = Statistics_Guild;
//# sourceMappingURL=Statistics_Guild.js.map