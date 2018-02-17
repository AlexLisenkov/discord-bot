import PlayCommand from "./Commands/PlayCommand";
import ClearQueueCommand from "./Commands/ClearQueueCommand";
import DisconnectCommand from "./Commands/DisconnectCommand";
import HelpCommand from "./Commands/HelpCommand";
import MuteCommand from "./Commands/MuteCommand";
import NowPlayingCommand from "./Commands/NowPlayingCommand";
import PauseCommand from "./Commands/PauseCommand";
import QueueCommand from "./Commands/QueueCommand";
import RemoveCommand from "./Commands/RemoveCommand";
import SetVolumeCommand from "./Commands/SetVolumeCommand";
import ResumeCommand from "./Commands/ResumeCommand";
import StopCommand from "./Commands/StopCommand";
import UnmuteCommand from "./Commands/UnmuteCommand";
import Client from "./ActiveConnection/Client";
import {DMChannel, User} from "discord.js";
import HTTPServer from "./OpenConnection/HTTPServer";
import AddToBlacklistCommand from "./Commands/AddToBlacklistCommand";
import RemoveFromBlacklistCommand from "./Commands/RemoveFromBlacklistCommand";
import ShowBlacklistCommand from "./Commands/ShowBlacklistCommand";

// Create instance
Client.instance;

// Log uncaught exceptions
process.on('uncaughtException', (err) => {
    if( HTTPServer.server )
        HTTPServer.server.close();
    console.error(err);
});

// Register commands
new PlayCommand();
new ClearQueueCommand();
new DisconnectCommand();
new HelpCommand();
new MuteCommand();
new NowPlayingCommand();
new PauseCommand();
new QueueCommand();
new RemoveCommand();
new ResumeCommand();
new SetVolumeCommand();
new StopCommand();
new UnmuteCommand();
new AddToBlacklistCommand();
new RemoveFromBlacklistCommand();
new ShowBlacklistCommand();

// HTTP server
HTTPServer.instance;
process.on('exit', () => {
    Client.sendMessageToAllGuilds('Goodbye @everyone');
    HTTPServer.server.close();
});