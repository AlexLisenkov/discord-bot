import Blacklist from "./Blacklist";
import {Snowflake} from "discord.js";
import DisallowedVoiceChannels from "./DisallowedVoiceChannels";

export default class Guild
{
    public blacklist: Blacklist;
    public disallowedVoiceChannels: Blacklist;

    public constructor( guildId: string|Snowflake ){
        this.blacklist = new Blacklist(guildId);
        this.disallowedVoiceChannels = new DisallowedVoiceChannels(guildId);
    }
}
