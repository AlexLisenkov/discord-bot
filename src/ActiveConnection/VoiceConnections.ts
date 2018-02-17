import VoiceConnection from './VoiceConnection';
import {Message} from "discord.js";
import value from "*.json";

export default class VoiceConnections
{
    protected static guilds:VoiceConnection[] = [];

    static getOrCreate(message:Message): Promise<VoiceConnection> {
        return new Promise<VoiceConnection>( (then, err) => {
            const guildId = message.guild.id;
            if( !(guildId in VoiceConnections.guilds) ){
                if( message.member.voiceChannel === undefined )
                    err('You got to be in a voice channel to summon me');

                VoiceConnections.guilds[guildId] = new VoiceConnection(message.member.voiceChannel, message.channel, guildId);
            }
            then( VoiceConnections.guilds[guildId]);
        } );
    }

    public static remove( guildId ){
        if( guildId in VoiceConnections.guilds )
            delete VoiceConnections.guilds[guildId];
    }

    public static getGuilds(){
        return this.guilds;
    }
}