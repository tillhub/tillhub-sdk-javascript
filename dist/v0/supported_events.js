"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportedEvents = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var baseError_1 = require("../errors/baseError");
var base_1 = require("../base");
var SupportedEvents = (function (_super) {
    tslib_1.__extends(SupportedEvents, _super);
    function SupportedEvents(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: SupportedEvents.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : SupportedEvents.baseUrl
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = SupportedEvents.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : SupportedEvents.baseUrl;
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    SupportedEvents.prototype.getAll = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, response, error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = "" + ((_a = this.options.base) !== null && _a !== void 0 ? _a : '') + this.endpoint;
                        return [4, this.http.getClient().get(base)];
                    case 1:
                        response = _b.sent();
                        if (response.status !== 200) {
                            throw new SupportedEventFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg,
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new SupportedEventFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    SupportedEvents.baseEndpoint = '/api/v0/supported-events';
    SupportedEvents.baseUrl = 'https://api.tillhub.com';
    return SupportedEvents;
}(base_1.ThBaseHandler));
exports.SupportedEvents = SupportedEvents;
var SupportedEventFetchFailed = (function (_super) {
    tslib_1.__extends(SupportedEventFetchFailed, _super);
    function SupportedEventFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch supported events'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SupportedEventFetchFailed';
        Object.setPrototypeOf(_this, SupportedEventFetchFailed.prototype);
        return _this;
    }
    return SupportedEventFetchFailed;
}(baseError_1.BaseError));
//# sourceMappingURL=supported_events.js.map