"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../ActiveConnection/Client");
const VoiceConnections_1 = require("../ActiveConnection/VoiceConnections");
const Config_1 = require("../Config/Config");
class Command {
    constructor() {
        Client_1.default.instance.on("message", (message) => {
            if (message.author.bot)
                return;
            if (message.content.startsWith(Config_1.default.prefix + this.command)) {
                /*                if( permissions[this.command()] !== undefined && permissions[this.command()].length > 0 ){
                                    let permit = false;
                                    message.member.roles.forEach( (V, K) => {
                                        if( permissions[this.command()].indexOf(V.name) !== -1 )
                                            permit = true;
                                    });
                
                                    if( !permit )
                                        return message.reply('I\'m sorry, you don\'t have the right role to execute this command');
                                }*/
                const connect = VoiceConnections_1.default.getOrCreate(message);
                connect.then((connection) => {
                    this.handle(message.content.replace(Config_1.default.prefix + this.command, '').trim(), message, connection);
                }).catch(err => {
                    message.reply(err);
                });
            }
        });
    }
}
exports.default = Command;
//# sourceMappingURL=Command.js.map