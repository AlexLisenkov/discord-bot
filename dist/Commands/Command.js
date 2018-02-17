"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../ActiveConnection/Client");
const VoiceConnections_1 = require("../ActiveConnection/VoiceConnections");
const Config_1 = require("../Config/Config");
class Command {
    constructor() {
        this.adminOnly = false;
        Client_1.default.instance.on("message", (message) => {
            if (message.author.bot)
                return;
            if (this.adminOnly && !message.member.hasPermission('ADMINISTRATOR')) {
                message.reply('You do not have the correct permission to run this command');
                return;
            }
            if (message.content.startsWith(Config_1.default.prefix + this.command)) {
                const connect = VoiceConnections_1.default.getOrCreate(message);
                connect.then((connection) => {
                    this.handle(message.content.replace(Config_1.default.prefix + this.command, '').trim(), message, connection);
                }).catch(err => {
                    message.reply(err);
                });
            }
        });
    }
}
exports.default = Command;
//# sourceMappingURL=Command.js.map