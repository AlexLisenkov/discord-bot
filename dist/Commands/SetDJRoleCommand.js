"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Config_1 = require("../Config/Config");
class SetDJRoleCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "dj role";
        this.adminOnly = true;
    }
    handle(parameter, message, connection) {
        const role = message.guild.roles.find('name', parameter);
        if (!role) {
            message.reply(`Role ${parameter} not found`).then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return null;
        }
        connection.database.djRole.data.set(role.id);
        message.reply(`The DJ role is now ${role.name}`).then((msg) => {
            msg.delete(Config_1.default.message_lifetime);
        });
    }
}
exports.default = SetDJRoleCommand;
//# sourceMappingURL=SetDJRoleCommand.js.map