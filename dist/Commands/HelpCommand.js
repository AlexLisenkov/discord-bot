"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class HelpCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "help";
    }
    handle(parameter, message, connection) {
        const prefix = connection.prefix;
        const reply = {
            color: 0xA2E13D,
            author: {
                'name': 'ℹ️ Available commands',
                'url': 'https://pleyr.net',
            },
            description: `
**${prefix}help** *List commands*
**${prefix}play** [query|url] *Add a song to queue*
**${prefix}list** [query] *Queue up a YouTube playlist*
**${prefix}forceplay** [query|url] *Plays a song directly, skipping the current song*
**${prefix}pause** *Pause current song*
**${prefix}resume** *Resume current song*
**${prefix}queue [page]** *List queue, page command is optional*
**${prefix}skip** *Skip current song*
**${prefix}np** *Show the song that is currently playing*
**${prefix}shuffle** *Shuffles the queue*
**${prefix}remove** [index|range|user] *Remove a song from the playlist (hint: say '${prefix}queue' to see indexes)*
**${prefix}move** [old index] [new index] *Move a songs from one index to another*
**${prefix}volume** [0-100] *Set the volume*
**${prefix}mute** *Mute me*
**${prefix}unmute** *Unmute me*
**${prefix}clearqueue** *Clears queue and stops playing*
**${prefix}statistics** *Show statistics of you, the server and globally*
**${prefix}disconnect** *Disconnect the bot*
**${prefix}adminhelp** *Show admin commands*
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