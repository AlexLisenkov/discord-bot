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
var Client_1 = require("../ActiveConnection/Client");
var Command_1 = require("./Command");
var ChangeNicknameCommand = /** @class */ (function (_super) {
    __extends(ChangeNicknameCommand, _super);
    function ChangeNicknameCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.command = "nickname";
        return _this;
    }
    ChangeNicknameCommand.prototype.handle = function (parameter, message, connection) {
        Client_1["default"].instance.user.setUsername(parameter);
    };
    return ChangeNicknameCommand;
}(Command_1["default"]));
exports["default"] = ChangeNicknameCommand;
