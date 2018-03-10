import Firebase from './Firebase';
import AbstractInterface from './AbstractInterface';
import {Snowflake} from "discord.js";

export default class AbstractModel implements AbstractInterface
{
    public ref: string;
    public identifier: string|Snowflake;
    public staticKey: string;
    public global: boolean = false;
    private key: string = '';

    public constructor(identifier: string|Snowflake = '') {
        this.identifier = identifier;
         const test = 	{
             "embed": {
                 "url": "https://pleyr.net",
                 "color": 4380128,
                 "author": {
                     "name": "What's new?",
                     "url": "https://discordapp.com"
                 },
                 "description": "Version 0.4.3",
                 "fields": [
                     {
                         "name": "Playlist reactions",
                         "value": "You now have the option to play and shuffle a playlist. Good for when you listen to the same playlist a lot."
                     },
                     {
                         "name": "Statistics",
                         "value": "We are now storing some statistics, like playtime and songcount per server and per member. In the next update these statistics will be available for you to see."
                     },
                     {
                         "name": "Pleyr website!",
                         "value": "We are proud to announce the launch of our [webpage](https://pleyr.net).\nThis enables us to create links like https://pleyr.net/invite and http://pleyr.net/support and more neat things."
                     },
                     {
                         "name": "Bugs & fixes",
                         "value": "It's hard to make software the has no bug. We try to stimulate you to report bugs to us. Please join our [support](https://pleyr.net/support) server if you found a bug or have a great idea for the bot.\nPlease bear in mind that fixing a bug might take some time and we'll do our best to fix."
                     },
                     {
                         "name": "Milestone (!)",
                         "value": "We've reached over 10 servers! This might not seem much but for us it means the world! Thank you all for choosing Pleyr and all the support.\n\nIf you'd like to support us even more [give us your vote](https://discordbots.org/bot/387686098534531076/vote)."
                     }
                 ]
             }
         }
    }

    public setKey( key:string ):this {
        this.key = key;
        return this;
    }

    public getRef():string {
        let ref = '';
        if(this.global)
            ref = `${this.ref}`;
        else
            ref = `${this.ref}/${this.identifier}`;
        if(this.staticKey)
            ref += `/${this.staticKey}`;
        if( this.key != '' )
            ref += `/${this.key}`;
        this.key = '';
        return ref;
    }

    get data(): firebase.database.Reference {
        return Firebase.database.ref(this.getRef());
    }
}
