"use strict";
exports.__esModule = true;
var YouTube_1 = require("./YouTube");
var Song = /** @class */ (function () {
    /**
     * Construct a new Song
     *
     * @param item
     */
    function Song(item) {
        this.createdAt = new Date();
        this.item = {};
        this.snippet = {};
        this.item = item;
        this.snippet = item.snippet;
        this.author = null;
    }
    Object.defineProperty(Song.prototype, "youtubeId", {
        /**
         * Get the youtubeId
         *
         * @return {string}
         */
        get: function () {
            return this.snippet.resourceId ? this.snippet.resourceId.videoId : this.item.id.videoId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Song.prototype, "url", {
        /**
         * Get the YouTube watch url
         *
         * @return {string}
         */
        get: function () {
            return "https://www.youtube.com/watch?v=" + this.youtubeId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Song.prototype, "stream", {
        /**
         * Get the YouTube watch url
         *
         * @return {string}
         */
        get: function () {
            if (!this._stream)
                this.buffer();
            return this._stream;
        },
        enumerable: true,
        configurable: true
    });
    Song.prototype.buffer = function () {
        var _this = this;
        YouTube_1["default"].getDataStream(this.youtubeId, false).then(function (steam) {
            _this._stream = steam;
        });
    };
    return Song;
}());
exports["default"] = Song;
