"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config/Config");
const Discord = require("discord.js");
const discord_js_1 = require("discord.js");
class Client {
    static get instance() {
        if (Client._instance != null)
            return Client._instance;
        Client._instance = new Discord.Client();
        Client._instance.on('ready', () => {
            Client._instance.user.setActivity(`${Config_1.default.prefix}help for help`);
        });
        Client._instance.login(Config_1.default.token);
        return Client._instance;
    }
    constructor() {
        throw new Error("Class must explicitly be called as singleton");
    }
    static sendMessageToAllGuilds(message) {
        Client.instance.guilds.forEach((value) => {
            const channels = value.channels.array();
            for (let i = 0; i < channels.length; i++) {
                const channel = channels[i];
                if (channel instanceof discord_js_1.TextChannel) {
                    channel.send(message);
                    break;
                }
            }
        });
    }
    static sendEmbedToAllGuilds(embed) {
        Client.instance.guilds.forEach((value) => {
            const channels = value.channels.array();
            for (let i = 0; i < channels.length; i++) {
                const channel = channels[i];
                if (channel instanceof discord_js_1.TextChannel) {
                    channel.send('', { embed: embed });
                    break;
                }
            }
        });
    }
}
exports.default = Client;
//# sourceMappingURL=Client.js.map