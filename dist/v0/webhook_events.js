"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookEvents = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var baseError_1 = require("../errors/baseError");
var base_1 = require("../base");
var WebhookEvents = (function (_super) {
    tslib_1.__extends(WebhookEvents, _super);
    function WebhookEvents(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: WebhookEvents.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = WebhookEvents.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    WebhookEvents.prototype.getAll = function (webhookId, query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        next = void 0;
                        base = this.uriHelper.generateBaseUri("/" + webhookId);
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new WebhookEventFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll(webhookId, { uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                msg: response_1.data.msg,
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new WebhookEventFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    WebhookEvents.prototype.getOne = function (webhookId, eventId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + webhookId + "/" + eventId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new WebhookFetchOneEventFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg,
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new WebhookFetchOneEventFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    WebhookEvents.prototype.replay = function (webhookId, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + webhookId + "/replay");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, query)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new WebhookEventReplayFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg,
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new WebhookEventReplayFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    WebhookEvents.baseEndpoint = '/v0/events';
    return WebhookEvents;
}(base_1.ThBaseHandler));
exports.WebhookEvents = WebhookEvents;
var WebhookEventFetchFailed = (function (_super) {
    tslib_1.__extends(WebhookEventFetchFailed, _super);
    function WebhookEventFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch events from webhook'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'WebhookEventFetchFailed';
        Object.setPrototypeOf(_this, WebhookEventFetchFailed.prototype);
        return _this;
    }
    return WebhookEventFetchFailed;
}(baseError_1.BaseError));
var WebhookFetchOneEventFailed = (function (_super) {
    tslib_1.__extends(WebhookFetchOneEventFailed, _super);
    function WebhookFetchOneEventFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch one event from one webhook'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'WebhookFetchOneEventFailed';
        Object.setPrototypeOf(_this, WebhookFetchOneEventFailed.prototype);
        return _this;
    }
    return WebhookFetchOneEventFailed;
}(baseError_1.BaseError));
var WebhookEventReplayFailed = (function (_super) {
    tslib_1.__extends(WebhookEventReplayFailed, _super);
    function WebhookEventReplayFailed(message, properties) {
        if (message === void 0) { message = 'Could not replay the events'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'WebhookEventReplayFailed';
        Object.setPrototypeOf(_this, WebhookEventReplayFailed.prototype);
        return _this;
    }
    return WebhookEventReplayFailed;
}(baseError_1.BaseError));
//# sourceMappingURL=webhook_events.js.map