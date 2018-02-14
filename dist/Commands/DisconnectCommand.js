"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class DisconnectCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "disconnect";
    }
    handle(parameter, message, connection) {
        connection.disconnect();
    }
}
exports.default = DisconnectCommand;
//# sourceMappingURL=DisconnectCommand.js.map