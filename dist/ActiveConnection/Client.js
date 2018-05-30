"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config/Config");
const Discord = require("discord.js");
const VoiceConnections_1 = require("./VoiceConnections");
const axios_1 = require("axios");
const Statistics_TotalGuilds_1 = require("../Database/Statistics_TotalGuilds");
const Statistics_Global_1 = require("../Database/Statistics_Global");
const DBL = require("dblapi.js");
class Client {
    constructor() {
        throw new Error("Class must explicitly be called as singleton");
    }
    static get instance() {
        if (Client._instance != null)
            return Client._instance;
        Client._instance = new Discord.Client();
        if (Config_1.default.environment == 'production' && Config_1.default.dblapi != undefined && Config_1.default.dblapi != "") {
            this.dbl = new DBL(Config_1.default.dblapi, Client._instance);
        }
        Client._instance.on('ready', () => {
            Client._instance.user.setActivity(`${Config_1.default.prefix}help for help`);
            if (Config_1.default.environment == 'production') {
                this.totalGuilds.data.set(Client._instance.guilds.size);
                setInterval(() => {
                    Client.sendDBApi();
                    Client.sendDiscordList();
                    Client.sendDiscordServices();
                    Client.sendBotListSpace();
                }, 1800000);
            }
        });
        Client._instance.login(Config_1.default.token).then(() => {
            Client._instance.guilds.forEach((value, key) => {
                VoiceConnections_1.default.getOrCreate(value);
            });
            Client._instance.on('guildCreate', (guild) => {
                if (Config_1.default.environment == 'production')
                    this.totalGuilds.increment();
                const connection = VoiceConnections_1.default.getOrCreate(guild);
                connection.then(value => {
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
                        } });
                    value.database.statistics.setKey('created_at').data.set(new Date().toISOString());
                });
            });
            Client._instance.on('guildDelete', (guild) => {
                if (Config_1.default.environment == 'production')
                    this.totalGuilds.decrement();
                VoiceConnections_1.default.remove(guild.id);
            });
            Client._instance.on('error', (error) => {
                Client._instance.login(Config_1.default.token);
                console.error(error);
            });
        });
        return Client._instance;
    }
    static disconnectEveryone() {
        const guilds = VoiceConnections_1.default.getGuilds();
        for (let guildId in guilds)
            guilds[guildId].disconnect();
    }
    static sendMessageToAllGuilds(message) {
        Client.instance.guilds.forEach((value) => {
            Client.getMessageableTextChannel(value).send(message);
        });
    }
    static sendEmbedToAllGuilds(embed) {
        Client.instance.guilds.forEach((value) => {
            Client.getMessageableTextChannel(value).send('', { embed: embed });
        });
    }
    static getAllTextChannels(guild) {
        return guild.channels.findAll('type', 'text');
    }
    static getMessageableTextChannel(guild) {
        const channels = Client.getAllTextChannels(guild);
        for (let i = 0; i < channels.length; i++) {
            const channel = channels[i];
            if (channel.permissionsFor(Client.instance.user)._member === null) {
                return channel;
            }
            else if (channel.permissionsFor(Client.instance.user).has('SEND_MESSAGES')) {
                return channel;
            }
        }
    }
    static sendDBApi() {
        if (Config_1.default.dbapi != undefined)
            return null;
        if (!Config_1.default.dbapi['bot_user_id'] || !Config_1.default.dbapi['token'])
            return null;
        if (Client._instance.shard) {
            axios_1.default.post(`https://bots.discord.pw/api/bots/${Config_1.default.dbapi['bot_user_id']}/stats`, {
                "shard_id": Client._instance.shard.id,
                "shard_count": Client._instance.shard.count,
                "server_count": Client._instance.guilds.size
            }, {
                headers: { Authorization: Config_1.default.dbapi['token'] }
            }).catch(err => {
                console.error(err);
            });
        }
        else {
            axios_1.default.post(`https://bots.discord.pw/api/bots/${Config_1.default.dbapi['bot_user_id']}/stats`, {
                "server_count": Client._instance.guilds.size
            }, {
                headers: { Authorization: Config_1.default.dbapi['token'] }
            }).catch(err => {
                console.error(err);
            });
        }
    }
    static sendDiscordList() {
        if (Config_1.default.discordlist == undefined)
            return null;
        axios_1.default.post('https://bots.discordlist.net/api', {
            "servers": Client._instance.guilds.size
        }, {
            headers: { token: Config_1.default.discordlist }
        }).catch(err => {
            console.error(err);
        });
    }
    static sendDiscordServices() {
        if (Config_1.default.discordservices == undefined)
            return null;
        axios_1.default.post(`https://discord.services/api/bots/${Client.instance.user.id}`, {
            "guild_count": Client._instance.guilds.size
        }, {
            headers: { Authorization: Config_1.default.discordservices }
        }).catch(err => {
            console.error(err);
        });
    }
    static sendBotListSpace() {
        if (Config_1.default.botlistspace == undefined)
            return null;
        if (!Config_1.default.botlistspace['token'])
            return null;
        axios_1.default.post(`https://botlist.space/api/bots/${Client.instance.user.id}`, {
            "servers": Client._instance.guilds.size
        }, {
            headers: { Authorization: Config_1.default.botlistspace }
        }).catch(err => {
            console.error(err);
        });
    }
}
Client.totalGuilds = new Statistics_TotalGuilds_1.default();
Client.statistics = new Statistics_Global_1.default();
exports.default = Client;
//# sourceMappingURL=Client.js.map