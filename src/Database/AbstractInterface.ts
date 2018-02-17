import {Snowflake} from "discord.js";

export default interface AbstractInterface {
    identifier: string|Snowflake;
    ref: string;
}