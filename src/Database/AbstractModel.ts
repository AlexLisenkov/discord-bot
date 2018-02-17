import Firebase from './Firebase';
import AbstractInterface from './AbstractInterface';
import {Snowflake} from "discord.js";

export default class AbstractModel implements AbstractInterface
{
    public ref: string;
    public identifier: string|Snowflake;

    public constructor(identifier: string|Snowflake) {
        this.identifier = identifier;
    }

    get data(): firebase.database.Reference {
        return Firebase.database.ref(`${this.ref}/${this.identifier}`);
    }
}
