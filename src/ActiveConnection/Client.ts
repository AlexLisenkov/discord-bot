import Config from "../Config/Config";
import * as Discord from "discord.js";
import {Guild, GuildChannel, TextChannel} from "discord.js";
import VoiceConnections from "./VoiceConnections";
import DBL from "dblapi.js";

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
        Client._instance.login(Config.token).then( () => {
            Client._instance.guilds.forEach( (value, key) => {
                VoiceConnections.getOrCreate(value);
            });
            Client._instance.on('guildCreate', (guild:Guild) => {
                const connection = VoiceConnections.getOrCreate(guild);
                connection.then( value => {
                    value.channel.send('', { embed: {
                        "color": 4380128,
                        "author": {
                        "name": "Thanks for inviting me!",
                         "url": "https://discordapp.com"
                        },
                        "thumbnail": {
                            "url": Client._instance.user.avatarURL
                        },
                        "description": `You are the ${Client._instance.guilds.size}th server!\nPlease, say **${Config.prefix}help** to see a list of commands`
                    }});
                });
            });
            Client._instance.on('guildDelete', (guild:Guild) => {
                VoiceConnections.remove(guild.id);
            });
            if(Config.dblapi && Config.dblapi != ""){
                setInterval(() => {
                    const dbl = new DBL(Config.dblapi);
                    if( Client._instance.shard )
                        dbl.postStats(Client._instance.guilds.size, Client._instance.shard.id, Client._instance.shard.count);
                    else
                        dbl.postStats(Client._instance.guilds.size);
                }, 1800000);
            }

        });
        return Client._instance;
    }

    private constructor() {
        throw new Error("Class must explicitly be called as singleton");
    }

    public static sendMessageToAllGuilds(message: string|string[]):void {
        Client.instance.guilds.forEach( (value: Guild) => {
            Client.getMessageableTextChannel(value).send(message);
        });
    }

    public static sendEmbedToAllGuilds(embed: object):void {
        Client.instance.guilds.forEach( (value: Guild) => {
            Client.getMessageableTextChannel(value).send('', {embed: embed});
        });
    }

    public static getAllTextChannels(guild:Guild):TextChannel[] {
        return <TextChannel[]>guild.channels.findAll('type', 'text');
    }

    public static getMessageableTextChannel(guild:Guild):TextChannel {
        const channels = Client.getAllTextChannels(guild);
        for( let i = 0; i < channels.length; i++ ){
            const channel = <GuildChannel> channels[i];

            if( (<any>channel.permissionsFor(Client.instance.user))._member === null ) {
                return <TextChannel>channel;
            }
            else if( (<any>channel.permissionsFor(Client.instance.user)).has('SEND_MESSAGES') ){
                return <TextChannel>channel;
            }
        }
    }

}
