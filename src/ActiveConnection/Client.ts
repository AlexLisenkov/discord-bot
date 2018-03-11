import Config from "../Config/Config";
import * as Discord from "discord.js";
import {Guild, GuildChannel, TextChannel} from "discord.js";
import VoiceConnections from "./VoiceConnections";
import axios from "axios";
import Statistics_TotalGuilds from "../Database/Statistics_TotalGuilds";
import Statistics_Global from "../Database/Statistics_Global";
const DBL = require("dblapi.js");

export default class Client
{
    private static _instance: Discord.Client;
    public static totalGuilds: Statistics_TotalGuilds = new Statistics_TotalGuilds();
    public static statistics: Statistics_Global = new Statistics_Global();
    public static dbl;

    public static get instance(): Discord.Client {
        if( Client._instance != null )
            return Client._instance;
        Client._instance = new Discord.Client();

        if(Config.environment == 'production' && Config.dblapi != undefined && Config.dblapi != ""){
            this.dbl = new DBL(Config.dblapi, Client._instance);
        }

        Client._instance.on('ready', () => {
            Client._instance.user.setActivity(`${Config.prefix}help for help`);
            if( Config.environment == 'production' ) {
                this.totalGuilds.data.set(Client._instance.guilds.size);

                if (Config.dbapi != undefined) {
                    if (!Config.dbapi['bot_user_id'] || !Config.dbapi['token']) {
                        console.error('Discord bots credentials incorrect');
                    } else {
                        setInterval(() => {
                            if (Client._instance.shard) {
                                axios.post(`https://bots.discord.pw/api/bots/${Config.dbapi['bot_user_id']}/stats`,
                                    {
                                        "shard_id": Client._instance.shard.id,
                                        "shard_count": Client._instance.shard.count,
                                        "server_count": Client._instance.guilds.size
                                    }, {
                                        headers: {Authorization: Config.dbapi['token']}
                                    }).catch(err => {
                                    console.error(err);
                                });
                            } else {
                                axios.post(`https://bots.discord.pw/api/bots/${Config.dbapi['bot_user_id']}/stats`,
                                    {
                                        "server_count": Client._instance.guilds.size
                                    }, {
                                        headers: {Authorization: Config.dbapi['token']}
                                    }).catch(err => {
                                    console.error(err);
                                });
                            }
                        }, 1800000);

                    }
                }
            }
        });

        Client._instance.login(Config.token).then( () => {
            Client._instance.guilds.forEach( (value, key) => {
                VoiceConnections.getOrCreate(value);
            });
            Client._instance.on('guildCreate', (guild:Guild) => {
                if( Config.environment == 'production' )
                    this.totalGuilds.increment();

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
                        "description": `You are the ${Client._instance.guilds.size}th server!\nPlease, say **${value.prefix}help** to see a list of commands\n\nTo change the prefix say **${value.prefix}prefix [character]**`
                    }});
                    value.database.statistics.setKey('created_at').data.set(new Date().toISOString());
                });
            });
            Client._instance.on('guildDelete', (guild:Guild) => {
                if( Config.environment == 'production' )
                    this.totalGuilds.decrement();
                VoiceConnections.remove(guild.id);
            });

            Client._instance.on('error', (error) => {
                Client._instance.login(Config.token);
                console.error(error);
            });

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
