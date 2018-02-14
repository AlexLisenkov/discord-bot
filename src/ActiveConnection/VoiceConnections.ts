import VoiceConnection from './VoiceConnection';
import {Message} from "discord.js";

export default class VoiceConnections
{
    protected static guilds:VoiceConnection[] = [];

    static getOrCreate(message:Message): Promise<VoiceConnection> {
        return new Promise<VoiceConnection>( (then, err) => {
            const guildId = message.guild.id;
            if( !(guildId in VoiceConnections.guilds) ){
                if( message.member.voiceChannel === undefined )
                    err('You got to be in a voice channel to summon me');

                VoiceConnections.guilds[guildId] = new VoiceConnection(message.member.voiceChannel, message.channel);
            }
            then( VoiceConnections.guilds[guildId]);
        } );
    }

    static remove( guildId ){
        if( guildId in VoiceConnections.guilds )
            delete VoiceConnections.guilds[guildId];
    }
}