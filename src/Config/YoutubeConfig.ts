/// <reference path="../json-type.d.ts"/>
import * as configFile from "../../youtube.config.json";

export default abstract class YoutubeConfig
{
    public static API_KEY:string = (<any>configFile).API_KEY;
    public static default_stream_options:object = (<any>configFile).default_stream_options;
    public static blacklist:object = (<any>configFile).blacklist;
}