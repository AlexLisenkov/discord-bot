import Command from "./Command";
import {Message} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import Config from "../Config/Config";

export default class SetVolumeCommand extends Command
{
    command: string = "volume";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        let volume = parseInt(parameter) / 100
        connection.setVolume(volume);

        let reply = '```markdown';

        volume = volume * 10;

        if( volume > 10 )
            volume = 10;
        else if ( volume < 0 )
            volume = 0;

        let progress = '';
        for( let i = 0; i < volume*2; i++ )
            progress += '█';

        for( let i = 0; i < 20-(volume*2); i++ )
            progress += ' ';

        let emoji = '';

        if( volume > 5 )
            emoji = '🔊';
        else if( volume > 2 )
            emoji = '🔉';
        else if( volume === 0 )
            emoji = '🔇';
        else
            emoji = '🔈';

        reply += `\n${emoji} ${progress} ${volume*10}%`;

        reply += '```'

        connection.channel.send(reply).then( (msg: Message) => {
            msg.delete(Config.message_lifetime);
        });;
    }
}