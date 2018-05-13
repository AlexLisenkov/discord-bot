import Command from "./Command";
import {Message} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import Config from "../Config/Config";

export default class HelpCommand extends Command
{
    command: string = "help";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        const prefix = connection.prefix;

        const reply =
            {
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
        connection.channel.send('', {embed: reply}).then( (msg: Message) => {
            msg.delete(60000);
        });;
    }
}