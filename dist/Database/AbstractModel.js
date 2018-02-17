"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Firebase_1 = require("./Firebase");
class AbstractModel {
    constructor(identifier) {
        this.identifier = identifier;
    }
    get data() {
        return Firebase_1.default.database.ref(`${this.ref}/${this.identifier}`);
    }
}
exports.default = AbstractModel;
//# sourceMappingURL=AbstractModel.js.map