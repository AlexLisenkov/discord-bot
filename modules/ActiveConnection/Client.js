const config = require("../../config.json");
const Discord = require("discord.js");

class Client
{
    static get intanciated(){
        return this._intanciated;
    }

    static set intanciated(val){
        this._intanciated = val;
    }

    static get instance() {
        if( !this.intanciated ) {
            this.intanciated = true;
            this._instance = new Discord.Client();
            this._instance.on('ready', () => {
                this._instance.user.setGame(`${config.prefix}help for help`);
            });
            this._instance.login(config.token);

        }
        return this._instance;
    }

    constructor() {
        throw "Class Client must explicitly be called statically as singleton, call instance instance";
    }

}

module.exports = Client;