"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YouTube_1 = require("./YouTube");
const stream_1 = require("stream");
class Song {
    /**
     * Construct a new Song
     *
     * @param item
     */
    constructor(item) {
        this.createdAt = new Date();
        this.item = {};
        this.snippet = {};
        this.begin = '00:00:00.000';
        this.item = item;
        this.snippet = item.snippet;
        this.author = null;
    }
    /**
     * Get the youtubeId
     *
     * @return {string}
     */
    get youtubeId() {
        return this.snippet.resourceId ? this.snippet.resourceId.videoId : this.item.id.videoId;
    }
    /**
     * Get the YouTube watch url
     *
     * @return {string}
     */
    get url() {
        return `https://www.youtube.com/watch?v=${this.youtubeId}`;
    }
    /**
     * Get the YouTube watch url
     *
     * @return {Readable}
     */
    get stream() {
        if (this._buffer instanceof stream_1.Readable) {
            return this._buffer;
        }
        return YouTube_1.default.getDataStream(this.youtubeId);
    }
    buffer() {
        this._buffer = YouTube_1.default.getDataStream(this.youtubeId);
    }
}
exports.default = Song;
//# sourceMappingURL=Song.js.map