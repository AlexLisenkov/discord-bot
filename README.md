# Discord Music Bot
[![Discord Bots](https://discordbots.org/api/widget/status/387686098534531076.svg?noavatar=true)](https://discordbots.org/bot/387686098534531076)[![Discord Bots](https://discordbots.org/api/widget/servers/387686098534531076.svg?noavatar=true)](https://discordbots.org/bot/387686098534531076)[![Discord Bots](https://discordbots.org/api/widget/upvotes/387686098534531076.svg?noavatar=true)](https://discordbots.org/bot/387686098534531076)  
**An open-source TypeScript music bot for discord that runs on Node.**

Next to listening to music you also can:
* Manage the **channels the bot can't join**
* Fully manageable **roles and permissions**
* Ability to **blacklist songs**
* Choose your own **custom prefix**

## Features
__Commands__ (prefixed with your defined prefix)
* `help` List commands
* `join` Joins a channel
* `play <query|url>` Add song to queue
* `forceplay <query|url>` Plays a song directly, skipping the current song
* `pause` Pause current song
* `resume` Resume current song
* `queue <page>` List queue, page command is optional
* `skip` Skip current song
* `np` Show the song that is currenty playing
* `shuffle` Suffles the queue
* `remove <index|range|user>` Remove a song from the playlist (index, range or mention a user)
* `move <old index> <new index>` Move a songs from one index to another
* `volume <0-100>` Set the volume
* `mute` Mute the bot
* `unmute` Unmute the bot
* `clearqueue` Clears queue and stops playing
* `disconnect` Disconnect bot from channel and clear queue
* `statistics` See global, server and personal statistics
* `blacklist show` Lists blacklisted YouTube ids
* `voicechannel show` Lists blocked voice channels for the bot

Admin commands:
* `blacklist add <YouTube-url>` Adds a YouTube video to the blacklist
* `blacklist remove <YouTube-id>` Removes a YouTube video from the blacklist
* `voicechannel disallow <channel-name>` Blocks the bot from joining a channel
* `voicechannel allow <channel-name>` Removes the channel from the blacklist
* `dj role <role>` Set the DJ role
* `dj require <command>` Set a command to DJ-only *(help command is always public)*
* `dj remove <command>` Remove DJ-only from a command
* `prefix <char>` Set the prefix for commands

Note:
* Administrators can always run every command
* Admin commands can only be ran by administrators. When you give admin-only commands DJ-only, DJ's are also able to run this command.

## Pre requirements

* [A discord bot](https://discordapp.com/developers/applications/me)
* [A YouTube v3 api key](https://developers.google.com/youtube/v3/getting-started)
* [Node.js](https://nodejs.org) (8.9.4 or higher, latest version recommended)
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
  "secret": "Your secret", // This password is used for the http
  "http_port": 8000, (8000 by default)
  "message_lifetime": 30000,
  "token": "Discord api token",
  "prefix": ".",
  "queue_limit": 50, // -1 for unlimited
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

[See our trello](https://trello.com/b/kWbyNTxN/kanban)
