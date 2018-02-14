"use strict";
exports.__esModule = true;
var Config_1 = require("../Config/Config");
var Discord = require("discord.js");
var Client = /** @class */ (function () {
    function Client() {
        throw new Error("Class must explicitly be called as singleton");
    }
    Object.defineProperty(Client, "instance", {
        get: function () {
            if (Client._instance != null)
                return Client._instance;
            Client._instance = new Discord.Client();
            Client._instance.on('ready', function () {
                Client._instance.user.setActivity(Config_1["default"].prefix + "help for help");
            });
            Client._instance.login(Config_1["default"].token);
            return Client.instance;
        },
        enumerable: true,
        configurable: true
    });
    return Client;
}());
exports["default"] = Client;
