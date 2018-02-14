import Config from "../Config/Config";
import * as Discord from "discord.js";

export default class Client
{
    private static _instance: Discord.Client;

    public static get instance() {
        if( Client._instance != null )
            return Client._instance;
        Client._instance = new Discord.Client();
        Client._instance.on('ready', () => {
            Client._instance.user.setActivity(`${Config.prefix}help for help`);
        });
        Client._instance.login(Config.token);
        return Client.instance;
    }

    private constructor() {
        throw new Error("Class must explicitly be called as singleton");
    }

}
