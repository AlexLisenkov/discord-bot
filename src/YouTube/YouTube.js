"use strict";
exports.__esModule = true;
var YoutubeConfig_1 = require("../Config/YoutubeConfig");
var Song_1 = require("./Song");
var axios_1 = require("axios");
var ytdl = require("ytdl-core");
var YouTube = /** @class */ (function () {
    function YouTube() {
        throw "Class YouTube must explicitly be called statically";
    }
    Object.defineProperty(YouTube, "WATCH_VIDEO_URL", {
        /**
         * Get the YouTube watch url
         *
         * @return {string}
         */
        get: function () {
            return 'https://www.youtube.com/watch?v=';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YouTube, "API_URL", {
        /**
         * Get the YouTube search API uri
         *
         * @return {string}
         */
        get: function () {
            return "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video,playlist&maxResults=1&key=" + YoutubeConfig_1["default"].API_KEY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YouTube, "SONG_INFO_URL", {
        /**
         * Get the YouTube videos API uri
         *
         * @return {string}
         */
        get: function () {
            return "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&key=" + YoutubeConfig_1["default"].API_KEY;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the YouTube videos API uri
     *
     * @param {string} id
     * @return {Promise}
     */
    YouTube.getSongInfo = function (id) {
        return axios_1["default"].get(YouTube.SONG_INFO_URL + '&id=' + id);
    };
    Object.defineProperty(YouTube, "PLAYLIST_URL", {
        /**
         * Get the YouTube playlist API uri
         *
         * @return {string}
         */
        get: function () {
            return "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&key=" + YoutubeConfig_1["default"].API_KEY;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Search for a youtube song
     *
     * @return {Promise}
     */
    YouTube.search = function (query) {
        var query_url = YouTube.API_URL + "&q=" + query;
        return new Promise(function (then, reject) {
            axios_1["default"].get(query_url)
                .then(function (response) {
                if (response.data.pageInfo.totalResults === 0)
                    return reject("No results found for '" + query + "' \uD83D\uDE14");
                var item = response.data.items[0];
                if (item.snippet.liveBroadcastContent === 'live')
                    return reject('I\'m sorry, I can\'t broadcast live streams 😔');
                if (YouTube.isBlacklisted(item.id.videoId))
                    return reject('This song is blacklisted by the owner 😔');
                if (item.id.kind === 'youtube#video')
                    return then(new Song_1["default"](item));
                var url = YouTube.PLAYLIST_URL + "&playlistId=" + item.id.playlistId;
                return axios_1["default"].get(url)
                    .then(function (response) {
                    var videoItems = response.data.items;
                    var videos = [];
                    for (var i = 0; i < videoItems.length; i++) {
                        var video = videoItems[i];
                        videos.push(new Song_1["default"](video));
                    }
                    return then(videos);
                })["catch"](function (e) {
                    return console.error(e);
                });
            })["catch"](function (error) {
                return console.error(error);
            });
        });
    };
    YouTube.isBlacklisted = function (videoId) {
        return YoutubeConfig_1["default"].blacklist.indexOf(videoId) >= 0;
    };
    /**
     * Get data stream from YouTube videoId
     *
     * @return {Promise}
     */
    YouTube.getDataStream = function (videoId, validateBlacklist) {
        if (!validateBlacklist && typeof validateBlacklist !== 'undefined') {
            return ytdl("" + YouTube.WATCH_VIDEO_URL + videoId, { filter: 'audioonly' });
        }
        else {
            return new Promise(function (then, reject) {
                if (YouTube.isBlacklisted(videoId))
                    return reject('This song is blacklisted by the owner 😔');
                return then(ytdl("" + YouTube.WATCH_VIDEO_URL + videoId, { filter: 'audioonly' }));
            });
        }
    };
    return YouTube;
}());
exports["default"] = YouTube;
