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
var UnmuteCommand = /** @class */ (function (_super) {
    __extends(UnmuteCommand, _super);
    function UnmuteCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.command = "unmute";
        return _this;
    }
    UnmuteCommand.prototype.handle = function (parameter, message, connection) {
        connection.unMute();
    };
    return UnmuteCommand;
}(Command_1["default"]));
exports["default"] = UnmuteCommand;
