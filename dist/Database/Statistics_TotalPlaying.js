"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractModel_1 = require("./AbstractModel");
class Statistics_TotalPlaying extends AbstractModel_1.default {
    constructor() {
        super(...arguments);
        this.ref = 'statistics/global';
        this.global = true;
        this.staticKey = 'total_playing';
    }
    increment() {
        this.data.transaction(current => {
            return (current || 0) + 1;
        });
    }
    decrement() {
        this.data.transaction(current => {
            return (current || 0) - 1;
        });
    }
}
exports.default = Statistics_TotalPlaying;
//# sourceMappingURL=Statistics_TotalPlaying.js.map