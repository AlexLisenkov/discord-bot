"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Config_1 = require("../Config/Config");
class HelpCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "help";
    }
    handle(parameter, message, connection) {
        const prefix = Config_1.default.prefix;
        const reply = {
            color: 0xA2E13D,
            author: {
                'name': 'ℹ️ Available commands',
                'url': 'https://discord.gg',
            },
            description: `
**${prefix}help** *List commands*
**${prefix}play** [query|url] *Add a song to queue*
**${prefix}pause** *Pause current song*
**${prefix}resume** *Resume current song*
**${prefix}queue** *List queue*
**${prefix}skip** *Skip current song*
**${prefix}np** *Show the song that is currenty playing*
**${prefix}remove** [index] *Remove a song from the playlist (hint: say '${prefix}queue' to see indexes)*
**${prefix}volume** [0-100] *Set the volume*
**${prefix}mute** *Mute me*
**${prefix}unmute** *Unmute me*
**${prefix}clearqueue** *Clears queue and stops playing*
**${prefix}disconnect** *Disconnect the bot*
**${prefix}blacklist show** *Lists blacklisted YouTube ids*
**${prefix}voicechannel show** *Lists blocked voice channels for the bot*
**${prefix}blacklist add [YouTube-url]** *Adds a YouTube video to the blacklist (admin-only)*
**${prefix}blacklist remove [YouTube-id]** *Removes a YouTube video from the blacklist (admin-only)*
**${prefix}dj role [role name]** *Sets the DJ role (admin-only)*
**${prefix}dj require [command]** *Set a command to DJ-only (help command is always public) (admin-only)*
**${prefix}dj remove [command]** *Remove DJ-only from a command (admin-only)*
`
        };
        connection.channel.send('', { embed: reply }).then((msg) => {
            msg.delete(60000);
        });
        ;
    }
}
exports.default = HelpCommand;
//# sourceMappingURL=HelpCommand.js.map