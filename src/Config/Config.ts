/// <reference path="../json-type.d.ts"/>
import * as configFile from "../../config.json";

export default abstract class Config
{
    public static token:string = (<any>configFile).token;
    public static secret:string = (<any>configFile).secret;
    public static prefix:string = (<any>configFile).prefix;
    public static http_port:number = (<any>configFile).http_port ? (<any>configFile).http_port : 8000;
    public static queue_limit:number = (<any>configFile).queue_limit;
    public static firebase:object = (<any>configFile).firebase;
    public static message_lifetime:number = (<any>configFile).message_lifetime;
    public static dblapi:string = (<any>configFile).dblapi;
    public static dbapi:object = (<any>configFile).dbapi;
    public static environment:string = (<any>configFile).environment;
}
