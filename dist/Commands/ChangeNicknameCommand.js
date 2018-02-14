"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../ActiveConnection/Client");
const Command_1 = require("./Command");
class ChangeNicknameCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "nickname";
    }
    handle(parameter, message, connection) {
        Client_1.default.instance.user.setUsername(parameter);
    }
}
exports.default = ChangeNicknameCommand;
//# sourceMappingURL=ChangeNicknameCommand.js.map