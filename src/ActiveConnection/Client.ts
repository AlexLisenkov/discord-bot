import Config from "../Config/Config";
import * as Discord from "discord.js";
import {Guild, GuildChannel, TextChannel} from "discord.js";

export default class Client
{
    private static _instance: Discord.Client;

    public static get instance(): Discord.Client {
        if( Client._instance != null )
            return Client._instance;
        Client._instance = new Discord.Client();
        Client._instance.on('ready', () => {
            Client._instance.user.setActivity(`${Config.prefix}help for help`);
        });
        Client._instance.login(Config.token);
        return Client._instance;
    }

    private constructor() {
        throw new Error("Class must explicitly be called as singleton");
    }

    public static sendMessageToAllGuilds(message: string|string[]):void {
        Client.instance.guilds.forEach( (value: Guild) => {
            const channels = value.channels.array();
            for( let i = 0; i < channels.length; i++ ){
                const channel = <GuildChannel> channels[i];

                if( !(channel instanceof TextChannel) )
                    continue;

                if( (<any>channel.permissionsFor(Client.instance.user))._member === null ) {
                    (<TextChannel>channel).send(message);
                    break;
                }
                else if( (<any>channel.permissionsFor(Client.instance.user)).has('SEND_MESSAGES') ){
                    (<TextChannel>channel).send(message);
                    break;
                }

            }
        });
    }

    public static sendEmbedToAllGuilds(embed: object):void {
        Client.instance.guilds.forEach( (value: Guild) => {
            const channels = value.channels.array();
            for( let i = 0; i < channels.length; i++ ){
                const channel = <GuildChannel> channels[i];
                if( channel instanceof TextChannel){
                    if( !(channel instanceof TextChannel) )
                        continue;

                    if( (<any>channel.permissionsFor(Client.instance.user))._member === null ) {
                        (<TextChannel>channel).send('', {embed: embed});
                        break;
                    }
                    else if( (<any>channel.permissionsFor(Client.instance.user)).has('SEND_MESSAGES') ){
                        (<TextChannel>channel).send('', {embed: embed});
                        break;
                    }
                }
            }
        });
    }

}
