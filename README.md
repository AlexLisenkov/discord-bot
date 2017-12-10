# Discord Music Bot
An open-source Javascript music bot for discord.

## Features
__Commands__ (prefixed with your defined prefix)
* `help` List commands
* `play <query|url>` Add song to queue
* `pause` Pause current song
* `resume` Resume current song
* `queue` List queue
* `skip` Skip current song
* `remove <index>` Remove a song from the playlist (index can be found in queue)
* `volume <0-100>` Set the volume
* `mute` Mute the bot
* `unmute` Unmute the bot
* `rapeme` Add an ear rape song to queue
* `clearqueue` Clears queue and stops playing
* `disconnect` Disconnect bot from channel and clear queue

__Roles and permissions__

You may define roles in the `permissions.json` file.
Roles are assigned to each command, when there are no roles present to a command everyone may execute it.
It is possible to assign multiple roles to one command.

Example of the `permissions.json` file:
```javascript
{
  "play": [
      
  ],
  "disconnect": [
      "Admin"
  ]
  "skip": [
      "DJ"
      "Admin"
  ],
}
```
In this example `play` is executable for everyone, 
`disconnect` only for Admin role and
`skip` for both DJ and Admin

Please note: All commands that are undefined will be executable for everone.

__Blacklist__

```javascript

  "blacklist": [
      "any-youtube-id",
      "other-youtube-id"
    ]

```

Ability to add a YouTube songId to in the `youtube.config.json` file.

Please note: You cannot blacklist ear rape songs

__Ear rapes__

Enable disable ear rape command in the `youtube.config.json` file.
```javascript

  "ear_rapes_enabled": true, // or false

```

__This bot does not (yet) support__
..
* YouTube playlists
* YouTube live streams

## Pre requirements

* A discord bot (you'll need the key)
* A YouTube v3 api key
* Node (6 or higher, latest version recommended)
* ffmpeg

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
  "token"  : "Your Discord key goes here",
  "prefix"  : "."
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

__permissions.json example__
```javascript
{
  "clearqueue": [
  ],
  "disconnect": [
  ],
  "earrape": [
  ],
  "pause": [
  ],
  "play": [
  ],
  "queue": [
  ],
  "resume": [
  ],
  "skip": [
  ],
  "remove": [
  ],
  "mute": [
  ],
  "unmute": [
  ],
  "volume": [
  ]
}
```

## Run the bot
1. Run `node ./app.js` in the installation directory