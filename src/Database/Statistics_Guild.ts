import AbstractModel from "./AbstractModel";
import {Snowflake} from "discord.js";
import Statistics_Guild_Member from "./Statistics_Guild_Member";

export default class Statistics_Guild extends AbstractModel
{
    public ref: string = 'statistics/guilds';

    public memberStatistics(identifier: string|Snowflake = ''){
        return new Statistics_Guild_Member(`${this.getRef()}/members/${identifier}`);
    }
}
