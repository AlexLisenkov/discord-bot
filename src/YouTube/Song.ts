import {User} from "discord.js";
import YouTube from "./YouTube";

export default class Song
{
    public createdAt:Date = new Date();
    public item:any = {};
    public snippet:any = {};
    public author:User;
    private _stream:ReadableStream;

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
     * @return {string}
     */
    get stream():ReadableStream {
        if( this._stream == undefined )
            this._stream = YouTube.getDataStream(this.youtubeId);
        return this._stream
    }

    public buffer():void {
        const _ = this.stream;
    }
}