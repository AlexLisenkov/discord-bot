"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YoutubeConfig_1 = require("../Config/YoutubeConfig");
const Song_1 = require("./Song");
const axios_1 = require("axios");
const ytdl = require("ytdl-core");
class YouTube {
    /**
     * Get the YouTube watch url
     *
     * @return {string}
     */
    static get WATCH_VIDEO_URL() {
        return 'https://www.youtube.com/watch?v=';
    }
    /**
     * Get the YouTube search API uri
     *
     * @return {string}
     */
    static get API_URL() {
        return `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video,playlist&maxResults=1&key=${YoutubeConfig_1.default.API_KEY}`;
    }
    /**
     * Get the YouTube videos API uri
     *
     * @return {string}
     */
    static get SONG_INFO_URL() {
        return `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&key=${YoutubeConfig_1.default.API_KEY}`;
    }
    /**
     * Get the YouTube videos API uri
     *
     * @param {string} id
     * @return {Promise}
     */
    static getSongInfo(id) {
        return axios_1.default.get(YouTube.SONG_INFO_URL + '&id=' + id);
    }
    /**
     * Get the YouTube playlist API uri
     *
     * @return {string}
     */
    static get PLAYLIST_URL() {
        return `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&key=${YoutubeConfig_1.default.API_KEY}`;
    }
    /**
     * Search for a youtube song
     *
     * @return {Promise}
     */
    static search(query) {
        const query_url = `${YouTube.API_URL}&q=${query}`;
        return new Promise((then, reject) => {
            axios_1.default.get(query_url)
                .then(response => {
                if (response.data.pageInfo.totalResults === 0)
                    return reject(`❌ No results found for '${query}'`);
                const item = response.data.items[0];
                if (item.snippet.liveBroadcastContent === 'live')
                    return reject('❌ I\'m sorry, I can\'t broadcast live streams');
                if (item.id.kind === 'youtube#video')
                    return then(new Song_1.default(item));
                const url = `${YouTube.PLAYLIST_URL}&playlistId=${item.id.playlistId}`;
                return axios_1.default.get(url)
                    .then(response => {
                    const videoItems = response.data.items;
                    const videos = [];
                    for (let i = 0; i < videoItems.length; i++) {
                        const video = videoItems[i];
                        videos.push(new Song_1.default(video));
                    }
                    return then(videos);
                }).catch(e => {
                    return console.error(e);
                });
            })
                .catch(function (error) {
                return console.error(error);
            });
        });
    }
    /**
     * @deprecated
     * @param {string} videoId
     * @return {boolean}
     */
    static isBlacklisted(videoId) {
        return false;
    }
    /**
     * Get data stream from YouTube videoId
     *
     * @return {ReadableStream}
     */
    static getDataStream(videoId) {
        return ytdl(`${YouTube.WATCH_VIDEO_URL}${videoId}`, { filter: 'audioonly' });
    }
    constructor() {
        throw "Class YouTube must explicitly be called statically";
    }
}
exports.default = YouTube;
//# sourceMappingURL=YouTube.js.map