"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class JoinCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "join";
    }
    handle(parameter, message, connection) {
        Command_1.default.setVoiceChannel(message, connection, false);
    }
}
exports.default = JoinCommand;
//# sourceMappingURL=JoinCommand.js.map