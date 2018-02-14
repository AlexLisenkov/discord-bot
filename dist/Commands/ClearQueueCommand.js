"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class ClearQueueCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "clearqueue";
    }
    handle(parameter, message, connection) {
        connection.truncate();
        connection.channel.send('`Queue cleared`');
    }
}
exports.default = ClearQueueCommand;
//# sourceMappingURL=ClearQueueCommand.js.map