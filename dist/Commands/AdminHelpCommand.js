"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class AdminHelpCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "adminhelp";
    }
    handle(parameter, message, connection) {
        const prefix = connection.prefix;
        const reply = {
            color: 0xA2E13D,
            author: {
                'name': 'ℹ️ Available admin commands',
                'url': 'https://pleyr.net',
            },
            description: `
**${prefix}prefix [character]** *The the prefix character (or string, admin-only)*
**${prefix}blacklist show** *Lists blacklisted YouTube ids*
**${prefix}voicechannel show** *Lists blocked voice channels for the bot*
**${prefix}blacklist add [YouTube-url]** *Adds a YouTube video to the blacklist (admin-only)*
**${prefix}blacklist remove [YouTube-id]** *Removes a YouTube video from the blacklist (admin-only)*
**${prefix}dj role [role name]** *Sets the DJ role (admin-only)*
**${prefix}dj require [command]** *Set a command to DJ-only (help command is always public) (admin-only)*
**${prefix}dj remove [command]** *Remove DJ-only from a command (admin-only)*
**${prefix}conf silent [0|1]** *Enable/disable silent mode*
`
        };
        connection.channel.send('', { embed: reply }).then((msg) => {
            msg.delete(60000);
        });
        ;
    }
}
exports.default = AdminHelpCommand;
//# sourceMappingURL=AdminHelpCommand.js.map