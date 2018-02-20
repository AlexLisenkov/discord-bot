"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Config_1 = require("../Config/Config");
class SetPrefixCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "prefix";
        this.adminOnly = true;
    }
    handle(parameter, message, connection) {
        connection.database.guildConfig.setKey('prefix').data.set(parameter);
        message.reply(`Command prefix is now '${parameter}'`).then((msg) => {
            msg.delete(Config_1.default.message_lifetime);
        });
    }
}
exports.default = SetPrefixCommand;
//# sourceMappingURL=SetPrefixCommand.js.map