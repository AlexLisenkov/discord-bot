import Command from "./Command";
import {Message} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import Config from "../Config/Config";

export default class HelpCommand extends Command
{
    command: string = "help";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        const prefix = Config.prefix;

        const reply =
            {
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
**${prefix}blacklist add [YouTube-url]** *Adds a YouTube video to the blacklist (admin-only)*
**${prefix}blacklist remove [YouTube-id]** *Removes a YouTube video from the blacklist (admin-only)*
`
            };
        connection.channel.send('', {embed: reply}).then( (msg: Message) => {
            msg.delete(60000);
        });;
    }
}