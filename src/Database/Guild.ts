import Blacklist from "./Blacklist";
import {Snowflake} from "discord.js";
import DisallowedVoiceChannels from "./DisallowedVoiceChannels";
import DJRole from "./DJRole";
import DJCommands from "./DJCommands";
import GuildConfig from "./GuildConfig";
import Statistics_GuildSeconds from "./Statistics_GuildSeconds";
import Statistics_GuildSongs from "./Statistics_GuildSongs";
import Statistics_Guild from "./Statistics_Guild";

export default class Guild
{
    public blacklist: Blacklist;
    public disallowedVoiceChannels: Blacklist;
    public djRole: DJRole;
    public djCommands: DJCommands;
    public guildConfig: GuildConfig;
    public totalSongs: Statistics_GuildSongs;
    public totalSeconds: Statistics_GuildSeconds;
    public statistics: Statistics_Guild;

    public constructor( guildId: string|Snowflake ){
        this.blacklist = new Blacklist(guildId);
        this.disallowedVoiceChannels = new DisallowedVoiceChannels(guildId);
        this.djRole = new DJRole(guildId);
        this.djCommands = new DJCommands(guildId);
        this.guildConfig = new GuildConfig(guildId);
        this.totalSeconds = new Statistics_GuildSeconds(guildId);
        this.totalSongs = new Statistics_GuildSongs(guildId);
        this.statistics = new Statistics_Guild(guildId);
    }
}
