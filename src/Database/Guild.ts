import Blacklist from "./Blacklist";
import {Snowflake} from "discord.js";
import DisallowedVoiceChannels from "./DisallowedVoiceChannels";
import DJRole from "./DJRole";
import DJCommands from "./DJCommands";

export default class Guild
{
    public blacklist: Blacklist;
    public disallowedVoiceChannels: Blacklist;
    public djRole: DJRole;
    public djCommands: DJCommands;

    public constructor( guildId: string|Snowflake ){
        this.blacklist = new Blacklist(guildId);
        this.disallowedVoiceChannels = new DisallowedVoiceChannels(guildId);
        this.djRole = new DJRole(guildId);
        this.djCommands = new DJCommands(guildId);
    }
}
