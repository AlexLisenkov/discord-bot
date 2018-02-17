"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PlayCommand_1 = require("./Commands/PlayCommand");
const ClearQueueCommand_1 = require("./Commands/ClearQueueCommand");
const DisconnectCommand_1 = require("./Commands/DisconnectCommand");
const HelpCommand_1 = require("./Commands/HelpCommand");
const MuteCommand_1 = require("./Commands/MuteCommand");
const NowPlayingCommand_1 = require("./Commands/NowPlayingCommand");
const PauseCommand_1 = require("./Commands/PauseCommand");
const QueueCommand_1 = require("./Commands/QueueCommand");
const RemoveCommand_1 = require("./Commands/RemoveCommand");
const SetVolumeCommand_1 = require("./Commands/SetVolumeCommand");
const ResumeCommand_1 = require("./Commands/ResumeCommand");
const StopCommand_1 = require("./Commands/StopCommand");
const UnmuteCommand_1 = require("./Commands/UnmuteCommand");
const Client_1 = require("./ActiveConnection/Client");
const HTTPServer_1 = require("./OpenConnection/HTTPServer");
const AddToBlacklistCommand_1 = require("./Commands/AddToBlacklistCommand");
const RemoveFromBlacklistCommand_1 = require("./Commands/RemoveFromBlacklistCommand");
const ShowBlacklistCommand_1 = require("./Commands/ShowBlacklistCommand");
// Create instance
Client_1.default.instance;
// Log uncaught exceptions
process.on('uncaughtException', (err) => {
    if (HTTPServer_1.default.server)
        HTTPServer_1.default.server.close();
    console.error(err);
});
// Register commands
new PlayCommand_1.default();
new ClearQueueCommand_1.default();
new DisconnectCommand_1.default();
new HelpCommand_1.default();
new MuteCommand_1.default();
new NowPlayingCommand_1.default();
new PauseCommand_1.default();
new QueueCommand_1.default();
new RemoveCommand_1.default();
new ResumeCommand_1.default();
new SetVolumeCommand_1.default();
new StopCommand_1.default();
new UnmuteCommand_1.default();
new AddToBlacklistCommand_1.default();
new RemoveFromBlacklistCommand_1.default();
new ShowBlacklistCommand_1.default();
// HTTP server
HTTPServer_1.default.instance;
process.on('exit', () => {
    Client_1.default.sendMessageToAllGuilds('Goodbye @everyone');
    HTTPServer_1.default.server.close();
});
//# sourceMappingURL=app.js.map