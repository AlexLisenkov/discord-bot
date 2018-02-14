/// <reference path="../json-type.d.ts"/>
import * as configFile from "../../config.json";

export default abstract class Config
{
    public static token:string = (<any>configFile).token;
    public static prefix:string = (<any>configFile).prefix;
    public static queue_limit:number = (<any>configFile).queue_limit;
}
