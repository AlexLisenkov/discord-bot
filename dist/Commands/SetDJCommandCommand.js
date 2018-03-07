"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Config_1 = require("../Config/Config");
class SetDJCommandCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "dj require";
        this.adminOnly = true;
    }
    handle(parameter, message, connection) {
        if (!SetDJCommandCommand.availableCommands.find((it) => { return it.toLowerCase() === parameter.toLowerCase(); })) {
            message.reply(`This command does not exist, type ${connection.prefix}help for available commands`).then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return null;
        }
        connection.database.djCommands.setKey(parameter).data.set(true);
        message.reply(`'${parameter}' is now DJ-only`).then((msg) => {
            msg.delete(Config_1.default.message_lifetime);
        });
    }
}
SetDJCommandCommand.availableCommands = [
    'blacklist add',
    'blacklist allow',
    'blacklist remove',
    'blacklist show',
    'clearqueue',
    'disconnect',
    'dj remove',
    'dj require',
    'dj role',
    'forceplay',
    'move',
    'mute',
    'nickname',
    'np',
    'pause',
    'play',
    'prefix',
    'queue',
    'remove',
    'resume',
    'shuffle',
    'skip',
    'unmute',
    'voicechannel allow',
    'voicechannel disallow',
    'voicechannel show',
    'volume'
];
exports.default = SetDJCommandCommand;
//# sourceMappingURL=SetDJCommandCommand.js.map