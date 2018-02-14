"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config/Config");
const Discord = require("discord.js");
class Client {
    static get instance() {
        if (Client._instance != null)
            return Client._instance;
        Client._instance = new Discord.Client();
        Client._instance.on('ready', () => {
            Client._instance.user.setActivity(`${Config_1.default.prefix}help for help`);
        });
        Client._instance.login(Config_1.default.token);
        return Client.instance;
    }
    constructor() {
        throw new Error("Class must explicitly be called as singleton");
    }
}
exports.default = Client;
//# sourceMappingURL=Client.js.map