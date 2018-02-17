"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = require("firebase");
const Config_1 = require("../Config/Config");
class Firebase {
    static get instance() {
        if (Firebase._instance != null)
            return Firebase._instance;
        Firebase._instance = firebase.initializeApp(Config_1.default.firebase);
        return Firebase._instance;
    }
    static get database() {
        return Firebase.instance.database();
    }
    constructor() {
        throw new Error("Class must explicitly be called as singleton");
    }
}
exports.default = Firebase;
//# sourceMappingURL=Firebase.js.map