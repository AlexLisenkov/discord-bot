const YouTube = require("./YouTube");

class Song
{
    /**
     * Get date this object was created
     *
     * @return {Date}
     */
    get addedAt() {
        return this._addedAt;
    }

    /**
     * Get the full item of the search query
     * Reference YouTube api docs /search/list
     *
     * @return {array}
     */
    get item() {
        return this._item;
    }

    /**
     * Get the snippet item of the search query
     * Reference YouTube api docs /search/list
     *
     * @return {array}
     */
    get snippet() {
        return this._item.snippet;
    }

    /**
     * Get full information of content
     * Reference YouTube api docs /videos/list
     *
     * @return {array}
     */
    get contentDetails() {
        if( this._contentDetails !== null )
            return this._contentDetails;

        YouTube.getSongInfo(this.youtubeId).then( result => {
            this._contentDetails = result;
            return this.contentDetails;
        });
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
        return `https://www.youtube.com/watch?v=${this.youtubeId}`
    }

    /**
     * Get Discord author
     *
     * @return {User}
     */
    get author() {
       return this._author;
    }

    /**
     * Set Discord author
     *
     * @param {User} author
     */
    set author( author ) {
        this._author = author;
    }

    /**
     * Construct a new Song
     *
     * @param {DataTransferItem} item
     */
    constructor( item ){
        this._item = item;
        this._addedAt = new Date();
        this._contentDetails = null;
        this._author = null;
    }

}

module.exports = Song;