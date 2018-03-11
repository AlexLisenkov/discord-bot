"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Firebase_1 = require("./Firebase");
class AbstractModel {
    constructor(identifier = '') {
        this.global = false;
        this.key = '';
        this.identifier = identifier;
    }
    setKey(key) {
        this.key = key;
        return this;
    }
    getRef() {
        let ref = '';
        if (this.global)
            ref = `${this.ref}`;
        else
            ref = `${this.ref}/${this.identifier}`;
        if (this.staticKey)
            ref += `/${this.staticKey}`;
        if (this.key != '')
            ref += `/${this.key}`;
        this.key = '';
        return ref;
    }
    get data() {
        return Firebase_1.default.database.ref(this.getRef());
    }
}
exports.default = AbstractModel;
//# sourceMappingURL=AbstractModel.js.map