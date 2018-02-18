"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Firebase_1 = require("./Firebase");
class AbstractModel {
    constructor(identifier) {
        this.key = '';
        this.identifier = identifier;
    }
    setKey(key) {
        this.key = key;
        return this;
    }
    get data() {
        let ref = `${this.ref}/${this.identifier}`;
        if (this.key != '')
            ref += `/${this.key}`;
        this.key = '';
        return Firebase_1.default.database.ref(ref);
    }
}
exports.default = AbstractModel;
//# sourceMappingURL=AbstractModel.js.map