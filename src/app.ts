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
import HTTPServer from "./OpenConnection/HTTPServer";
import AddToBlacklistCommand from "./Commands/AddToBlacklistCommand";
import RemoveFromBlacklistCommand from "./Commands/RemoveFromBlacklistCommand";
import ShowBlacklistCommand from "./Commands/ShowBlacklistCommand";
import DisallowVoiceChannelsCommand from "./Commands/DisallowVoiceChannelsCommand";
import RemoveDisallowVoiceChannelsCommand from "./Commands/RemoveDisallowVoiceChannelsCommand";
import ShowDisallowedVoiceChannelsCommand from "./Commands/ShowDisallowedVoiceChannelsCommand";
import SetDJRoleCommand from "./Commands/SetDJRoleCommand";
import SetDJCommandCommand from "./Commands/SetDJCommandCommand";
import RemoveDJCommandCommand from "./Commands/RemoveDJCommandCommand";
import JoinCommand from "./Commands/JoinCommand";
import SetPrefixCommand from "./Commands/SetPrefixCommand";
import ForcePlayCommand from "./Commands/ForcePlayCommand";
import ShuffleCommand from "./Commands/ShuffleCommand";
import MoveCommand from "./Commands/MoveCommand";
import StatisticsCommand from "./Commands/StatisticsCommand";

// Create instance
Client.instance;

// Log uncaught exceptions
process.on('uncaughtException', (err) => {
    if( HTTPServer.server )
        HTTPServer.server.close();
    console.log(err);
});

process.on('unhandledRejection', (err) => {
    if( HTTPServer.server )
        HTTPServer.server.close();
    console.error(err);
});

// Register commands
new PlayCommand();
new ForcePlayCommand();
new ClearQueueCommand();
new DisconnectCommand();
new HelpCommand();
new MuteCommand();
new ShuffleCommand();
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
new DisallowVoiceChannelsCommand();
new RemoveDisallowVoiceChannelsCommand();
new ShowDisallowedVoiceChannelsCommand();
new SetDJRoleCommand();
new SetDJCommandCommand();
new RemoveDJCommandCommand();
new JoinCommand();
new SetPrefixCommand();
new MoveCommand();
new StatisticsCommand();

// HTTP server
HTTPServer.instance;
process.on('disconnect', () => {
    Client.sendMessageToAllGuilds('Goodbye @everyone');
    HTTPServer.server.close();
});