const Command = require('./Command');
const Config = require('../../config.json');

class StopCommand extends Command
{
    command() {
        return "help";
    }

    handle(parameter, message, connection) {
        const prefix = Config.prefix;
        const reply =
`
Commands:
**${prefix}help** *List commands*
**${prefix}play** [query|url] *Add a song to queue*
**${prefix}pause** *Pause current song*
**${prefix}resume** *Resume current song*
**${prefix}queue** *List queue*
**${prefix}skip** *Skip current song*
**${prefix}remove** [index] *Remove a song from the playlist (hint: say '${prefix}queue' to see indexes)*
**${prefix}volume** [0-100] *Set the volume*
**${prefix}mute** *Mute me*
**${prefix}unmute** *Unmute me*
**${prefix}rapeme** *Add an ear rape song to queue*
**${prefix}clearqueue** *Clears queue and stops playing*
**${prefix}disconnect** *Disconnect the bot*
`;
        message.reply(reply);
    }
}

module.exports = StopCommand;