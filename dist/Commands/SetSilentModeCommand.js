"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Config_1 = require("../Config/Config");
class SetSilentModeCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "conf silent";
        this.adminOnly = true;
    }
    handle(parameter, message, connection) {
        if (parameter == '1' || parameter == 'enabled' || parameter == 'true' || parameter == 'y' || parameter == '👍') {
            connection.database.guildConfig.setKey('silent').data.set(true);
            message.reply(`I am now in silent mode`).then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
        }
        else {
            connection.database.guildConfig.setKey('silent').data.set(false);
            message.reply(`Silent mode disabled`).then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
        }
    }
}
exports.default = SetSilentModeCommand;
//# sourceMappingURL=SetSilentModeCommand.js.map