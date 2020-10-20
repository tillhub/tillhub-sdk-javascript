"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mqtt_1 = require("mqtt");
var events_1 = tslib_1.__importDefault(require("events"));
var Realtime = (function (_super) {
    tslib_1.__extends(Realtime, _super);
    function Realtime(options) {
        var _this = _super.call(this) || this;
        _this.initialized = false;
        _this.connected = false;
        _this.options = tslib_1.__assign({ endpoint: 'wss://wss.tillhub.com' }, options);
        _this.client = mqtt_1.connect(_this.options.endpoint);
        _this.initialized = true;
        _this.client.on('connect', function () {
            _this.connected = true;
        });
        _this.client.on('close', function () {
            _this.connected = false;
        });
        return _this;
    }
    Realtime.prototype.isInitialized = function () {
        return this.initialized;
    };
    Realtime.prototype.isConnected = function () {
        return this.connected;
    };
    Realtime.prototype.destroy = function () {
        if (!this.client) {
            throw new Error('cannot destroy instance, because a client is not initialized');
        }
        this.client.end();
        this.initialized = false;
    };
    return Realtime;
}(events_1.default.EventEmitter));
exports.default = Realtime;
//# sourceMappingURL=realtime.js.map