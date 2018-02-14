"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class ResumeCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "resume";
    }
    handle(parameter, message, connection) {
        connection.resume();
    }
}
exports.default = ResumeCommand;
//# sourceMappingURL=ResumeCommand.js.map