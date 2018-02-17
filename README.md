# Discord Music Bot
An open-source TypeScript music bot for discord that runs on Node.

## Features
__Commands__ (prefixed with your defined prefix)
* `help` List commands
* `play <query|url>` Add song to queue
* `pause` Pause current song
* `resume` Resume current song
* `queue` List queue
* `skip` Skip current song
* `np` Show the song that is currenty playing
* `remove <index>` Remove a song from the playlist (index can be found in queue)
* `volume <0-100>` Set the volume
* `mute` Mute the bot
* `unmute` Unmute the bot
* `clearqueue` Clears queue and stops playing
* `disconnect` Disconnect bot from channel and clear queue
* `blacklist show` Lists blacklisted YouTube ids

Admin commands:
* `blacklist add <YouTube-url>` Adds a YouTube video to the blacklist
* `blacklist remove <YouTube-id>` Removes a YouTube video from the blacklist

## Pre requirements

* [A discord bot](https://discordapp.com/developers/applications/me)
* [A YouTube v3 api key](https://developers.google.com/youtube/v3/getting-started)
* [Node.js](https://nodejs.org) (6 or higher, latest version recommended)
* [ffmpeg](https://www.ffmpeg.org/) (latest)
* [Firebase](https://console.firebase.google.com/u/0/) (just the database)

## Installation
1. Install all pre requirements
2. Clone this repository
3. Copy config.json.example > config.json
4. Copy youtube.config.json.example > youtube.config.json
5. Run `npm install` to install all dependencies
6. Make sure all your credentials are correct

__config.json example__
```javascript
{
  "secret"  : "Your secret", // This password is used for the http
  "http_port"  : 8000, (8000 by default)
  "token"  : "Discord api token",
  "prefix" : ".",
  "queue_limit" : 50, // -1 for unlimited
  "firebase": {
    "apiKey": "",
    "authDomain": "",
    "databaseURL": "",
    "projectId": "",
    "storageBucket": ""
  }
}
```

__config.youtube.json example__
```javascript
{
  "API_KEY": "Paste your key here",
  "default_stream_options": {
    "seek": 0,
    "volume": 1
  }
}
```

## Run the bot
1. Run `npm start` in the installation directory

### Todo:

* Customizable settings between guilds
* Roles and permissions
* Ability to load over 50 playlist songs
* YouTube live streams
