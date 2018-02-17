import Blacklist from "./Blacklist";
import {Snowflake} from "discord.js";

export default class Guild
{
    public blacklist: Blacklist;

    public constructor( guildId: string|Snowflake ){
        this.blacklist = new Blacklist(guildId);
    }
}
