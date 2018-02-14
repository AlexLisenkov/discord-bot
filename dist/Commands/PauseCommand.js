"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class PauseCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "pause";
    }
    handle(parameter, message, connection) {
        connection.pause();
    }
}
exports.default = PauseCommand;
//# sourceMappingURL=PauseCommand.js.map