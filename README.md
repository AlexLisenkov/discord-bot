# Discord Music Bot
An open-source Javascript music bot for discord.

## Features
__Commands__
* `.play <query|url>` Add song to queue
* `.pause` Pause current song
* `.resume` Resume current song
* `.skip` Skip current song
* `.rapeme` Add an ear rape song to queue
* `.disconnect` Disconnect bot from channel and clear queue
* `.nickname <name>` Change nickname of the bot

__Blacklist__

Ability to add a YouTube songId to in the `youtube.config.json` file

__Ear rapes__

Enable disable ear rape command in the `youtube.config.json` file


__More coming soon__
..
## Pre requirements

* **A discord bot (you'll need the key)**
* **A YouTube v3 api key**
* **Node (6 or higher)**
* **ffmpeg**

## Installation
1. Install all pre requirements
2. Clone this repository
3. Copy config.json.example > config.json
4. Copy config.youtube.json.example > config.youtube.json
5. Run `npm install` to install all dependencies
6. Make sure all your credentials are correct

__config.json example__
```javascript
{
  "token"  : "Your Discord key goes here",
  "prefix" : "+"
}
```

__config.youtube.json example__
```javascript
{
  "API_KEY": "Paste your key here",
  "default_stream_options": {
    "seek": 0,
    "volume": 1
  },
  "ear_rapes_enabled": true,
  "blacklist": [
  ]
}
```

## Run the bot
1. Run `node ./app.js` in the installation directory