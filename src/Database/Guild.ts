import Blacklist from "./Blacklist";
import {Snowflake} from "discord.js";
import DisallowedVoiceChannels from "./DisallowedVoiceChannels";
import DJRole from "./DJRole";
import DJCommands from "./DJCommands";
import GuildConfig from "./GuildConfig";

export default class Guild
{
    public blacklist: Blacklist;
    public disallowedVoiceChannels: Blacklist;
    public djRole: DJRole;
    public djCommands: DJCommands;
    public guildConfig: GuildConfig;

    public constructor( guildId: string|Snowflake ){
        this.blacklist = new Blacklist(guildId);
        this.disallowedVoiceChannels = new DisallowedVoiceChannels(guildId);
        this.djRole = new DJRole(guildId);
        this.djCommands = new DJCommands(guildId);
        this.guildConfig = new GuildConfig(guildId);
    }
}
