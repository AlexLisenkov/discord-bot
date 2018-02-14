"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Command_1 = require("./Command");
var ClearQueueCommand = /** @class */ (function (_super) {
    __extends(ClearQueueCommand, _super);
    function ClearQueueCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.command = "clearqueue";
        return _this;
    }
    ClearQueueCommand.prototype.handle = function (parameter, message, connection) {
        connection.truncate();
        connection.channel.send('`Queue cleared`');
    };
    return ClearQueueCommand;
}(Command_1["default"]));
exports["default"] = ClearQueueCommand;
