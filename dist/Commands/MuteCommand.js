"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class MuteCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "mute";
    }
    handle(parameter, message, connection) {
        connection.mute();
    }
}
exports.default = MuteCommand;
//# sourceMappingURL=MuteCommand.js.map