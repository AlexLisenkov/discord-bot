import {User} from "discord.js";
import YouTube from "./YouTube";
import {Readable} from "stream";

export default class Song
{
    public createdAt:Date = new Date();
    public item:any = {};
    public snippet:any = {};
    public author:User;
    public begin:string = '00:00:00.000';
    private _buffer:Readable;

    /**
     * Construct a new Song
     *
     * @param item
     */
    constructor( item:any ){
        this.item = item;
        this.snippet = item.snippet;
        this.author = null;
    }

    /**
     * Get the youtubeId
     *
     * @return {string}
     */
    get youtubeId():string {
        return this.snippet.resourceId ? this.snippet.resourceId.videoId : this.item.id.videoId;
    }

    /**
     * Get the YouTube watch url
     *
     * @return {string}
     */
    get url():string {
        return `https://www.youtube.com/watch?v=${this.youtubeId}`
    }

    /**
     * Get the YouTube watch url
     *
     * @return {Readable}
     */
    get stream():Readable {
        if( this._buffer instanceof Readable){
            return this._buffer;
        }
        return YouTube.getDataStream(this.youtubeId);
    }

    public buffer():void {
        this._buffer = YouTube.getDataStream(this.youtubeId);
    }
}