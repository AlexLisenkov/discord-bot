"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Config_1 = require("../Config/Config");
const SetDJCommandCommand_1 = require("./SetDJCommandCommand");
class RemoveDJCommandCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "dj remove";
        this.adminOnly = true;
    }
    handle(parameter, message, connection) {
        if (!SetDJCommandCommand_1.default.availableCommands.find((it) => { return it.toLowerCase() === parameter.toLowerCase(); })) {
            message.reply(`This command does not exist, type ${connection.prefix}help for available commands`).then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return null;
        }
        connection.database.djCommands.setKey(parameter).data.set(false);
        message.reply(`'${parameter}' is now publicly available`).then((msg) => {
            msg.delete(Config_1.default.message_lifetime);
        });
    }
}
exports.default = RemoveDJCommandCommand;
//# sourceMappingURL=RemoveDJCommandCommand.js.map