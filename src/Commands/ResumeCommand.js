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
var ResumeCommand = /** @class */ (function (_super) {
    __extends(ResumeCommand, _super);
    function ResumeCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.command = "resume";
        return _this;
    }
    ResumeCommand.prototype.handle = function (parameter, message, connection) {
        connection.resume();
    };
    return ResumeCommand;
}(Command_1["default"]));
exports["default"] = ResumeCommand;
