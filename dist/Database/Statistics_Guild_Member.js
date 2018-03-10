"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractModel_1 = require("./AbstractModel");
class Statistics_Guild_Member extends AbstractModel_1.default {
    constructor() {
        super(...arguments);
        this.ref = '';
    }
    incrementTotalSecondsWith(seconds) {
        this.setKey('total_seconds_queued').data.transaction(current => {
            return (current || 0) + seconds;
        });
    }
    incrementTotalSongs() {
        this.setKey('total_songs_queued').data.transaction(current => {
            return (current || 0) + 1;
        });
    }
    incrementTotalSecondsListenedWith(seconds) {
        this.setKey('total_seconds_listened').data.transaction(current => {
            return (current || 0) + seconds;
        });
    }
    incrementTotalSongsListened() {
        this.setKey('total_songs_listened').data.transaction(current => {
            return (current || 0) + 1;
        });
    }
}
exports.default = Statistics_Guild_Member;
//# sourceMappingURL=Statistics_Guild_Member.js.map