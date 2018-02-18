"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractModel_1 = require("./AbstractModel");
class DJRole extends AbstractModel_1.default {
    constructor() {
        super(...arguments);
        this.ref = 'dj_role';
    }
    getDjRole() {
        return this.data.once('value').then((value => {
            return value.val();
        }));
    }
}
exports.default = DJRole;
//# sourceMappingURL=DJRole.js.map