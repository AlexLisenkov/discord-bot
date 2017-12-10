const PlayCommand = require("./modules/Commands/PlayCommand");
const DisconnectCommand = require("./modules/Commands/DisconnectCommand");
const PauseCommand = require("./modules/Commands/PauseCommand");
const ResumeCommand = require("./modules/Commands/ResumeCommand");
const StopCommand = require("./modules/Commands/StopCommand");
const EarRapeCommand = require("./modules/Commands/EarRapeCommand");
const ClearQueueCommand = require("./modules/Commands/ClearQueueCommand");
const QueueCommand = require("./modules/Commands/QueueCommand");
const HelpCommand = require("./modules/Commands/HelpCommand");
const MuteCommand = require("./modules/Commands/MuteCommand");
const UnmuteCommand = require("./modules/Commands/UnmuteCommand");
const SetVolumeCommand = require("./modules/Commands/SetVolumeCommand");
const RemoveCommand = require("./modules/Commands/RemoveCommand");

// Commands
new PlayCommand();
new DisconnectCommand();
new PauseCommand();
new ResumeCommand();
new StopCommand();
new EarRapeCommand();
new ClearQueueCommand();
new HelpCommand();
new QueueCommand();
new MuteCommand();
new UnmuteCommand();
new RemoveCommand();