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
