"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config/Config");
const Discord = require("discord.js");
const VoiceConnections_1 = require("./VoiceConnections");
const dblapi_js_1 = require("dblapi.js");
class Client {
    static get instance() {
        if (Client._instance != null)
            return Client._instance;
        Client._instance = new Discord.Client();
        Client._instance.on('ready', () => {
            Client._instance.user.setActivity(`${Config_1.default.prefix}help for help`);
        });
        Client._instance.login(Config_1.default.token).then(() => {
            Client._instance.guilds.forEach((value, key) => {
                VoiceConnections_1.default.getOrCreate(value);
            });
            Client._instance.on('guildCreate', (guild) => {
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
                });
            });
            Client._instance.on('guildDelete', (guild) => {
                VoiceConnections_1.default.remove(guild.id);
            });
            setInterval(() => {
                console.log(Client._instance.guilds.size, Client._instance.shard);
            }, 10);
            if (Config_1.default.dblapi && Config_1.default.dblapi != "") {
                setInterval(() => {
                    const dbl = new dblapi_js_1.default(Config_1.default.dblapi);
                    if (Client._instance.shard)
                        dbl.postStats(Client._instance.guilds.size, Client._instance.shard.id, Client._instance.shard.count);
                    else
                        dbl.postStats(Client._instance.guilds.size);
                }, 1800000);
            }
            Client._instance.on('error', (error) => {
                Client._instance.login(Config_1.default.token);
                console.error(error);
            });
        });
        return Client._instance;
    }
    constructor() {
        throw new Error("Class must explicitly be called as singleton");
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
}
exports.default = Client;
//# sourceMappingURL=Client.js.map