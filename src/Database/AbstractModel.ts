import Firebase from './Firebase';
import AbstractInterface from './AbstractInterface';
import {Snowflake} from "discord.js";

export default class AbstractModel implements AbstractInterface
{
    public ref: string;
    public identifier: string|Snowflake;
    private key: string = '';

    public constructor(identifier: string|Snowflake) {
        this.identifier = identifier;
    }

    public setKey( key:string ):this {
        this.key = key;
        return this;
    }

    get data(): firebase.database.Reference {
        let ref = `${this.ref}/${this.identifier}`;
        if( this.key != '' )
            ref += `/${this.key}`;
        this.key = '';
        return Firebase.database.ref(ref);
    }
}
