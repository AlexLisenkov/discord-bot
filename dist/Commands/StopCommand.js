"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class StopCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "skip";
    }
    handle(parameter, message, connection) {
        connection.skip();
    }
}
exports.default = StopCommand;
//# sourceMappingURL=StopCommand.js.map