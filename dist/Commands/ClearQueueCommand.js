"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Config_1 = require("../Config/Config");
class ClearQueueCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "clearqueue";
    }
    handle(parameter, message, connection) {
        connection.truncate();
        connection.channel.send('`Queue cleared`').then((msg) => {
            msg.delete(Config_1.default.message_lifetime);
        });
        ;
    }
}
exports.default = ClearQueueCommand;
//# sourceMappingURL=ClearQueueCommand.js.map