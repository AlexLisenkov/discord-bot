import VoiceConnection from './VoiceConnection';
import {Guild, Message} from "discord.js";
import value from "*.json";
import Client from "./Client";

export default class VoiceConnections
{
    protected static guilds:VoiceConnection[] = [];

    static getOrCreate(guild:Guild): Promise<VoiceConnection> {
        return new Promise<VoiceConnection>( (then, err) => {
            const guildId = guild.id;
            if( !(guildId in VoiceConnections.guilds) ){
                VoiceConnections.guilds[guildId] = new VoiceConnection(guild);
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