"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class UnmuteCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "unmute";
    }
    handle(parameter, message, connection) {
        connection.unMute();
    }
}
exports.default = UnmuteCommand;
//# sourceMappingURL=UnmuteCommand.js.map