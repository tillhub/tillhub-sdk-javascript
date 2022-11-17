"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Webhooks = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var baseError_1 = require("../errors/baseError");
var base_1 = require("../base");
var Webhooks = (function (_super) {
    tslib_1.__extends(Webhooks, _super);
    function Webhooks(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Webhooks.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Webhooks.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Webhooks.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        next = void 0;
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new WebhookFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.after) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.after }); };
                        }
                        return [2, {
                                msg: response_1.data.msg,
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new WebhookFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Webhooks.prototype.get = function (webhookId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + webhookId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new WebhookFetchOneFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg,
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new WebhookFetchOneFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Webhooks.prototype.create = function (webhook) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, webhook)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new WebhookCreateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg,
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new WebhookCreateFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Webhooks.prototype.put = function (webhookId, webhook) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + webhookId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, webhook)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new WebhookPutFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg,
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new WebhookPutFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Webhooks.prototype.delete = function (webhookId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + webhookId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new WebhookDeleteFailed(undefined, { status: response.status });
                        }
                        return [2, { msg: response.data.msg }];
                    case 3:
                        error_5 = _a.sent();
                        throw new WebhookDeleteFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Webhooks.baseEndpoint = '/api/v0/webhooks';
    return Webhooks;
}(base_1.ThBaseHandler));
exports.Webhooks = Webhooks;
var WebhookFetchFailed = (function (_super) {
    tslib_1.__extends(WebhookFetchFailed, _super);
    function WebhookFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch webhooks'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'WebhookFetchFailed';
        Object.setPrototypeOf(_this, WebhookFetchFailed.prototype);
        return _this;
    }
    return WebhookFetchFailed;
}(baseError_1.BaseError));
var WebhookFetchOneFailed = (function (_super) {
    tslib_1.__extends(WebhookFetchOneFailed, _super);
    function WebhookFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch one webhook'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'WebhookFetchOneFailed';
        Object.setPrototypeOf(_this, WebhookFetchOneFailed.prototype);
        return _this;
    }
    return WebhookFetchOneFailed;
}(baseError_1.BaseError));
var WebhookCreateFailed = (function (_super) {
    tslib_1.__extends(WebhookCreateFailed, _super);
    function WebhookCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the webhook'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'WebhookCreateFailed';
        Object.setPrototypeOf(_this, WebhookCreateFailed.prototype);
        return _this;
    }
    return WebhookCreateFailed;
}(baseError_1.BaseError));
var WebhookPutFailed = (function (_super) {
    tslib_1.__extends(WebhookPutFailed, _super);
    function WebhookPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter the webhook'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'WebhookPutFailed';
        Object.setPrototypeOf(_this, WebhookPutFailed.prototype);
        return _this;
    }
    return WebhookPutFailed;
}(baseError_1.BaseError));
var WebhookDeleteFailed = (function (_super) {
    tslib_1.__extends(WebhookDeleteFailed, _super);
    function WebhookDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the webhook'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'WebhookDeleteFailed';
        Object.setPrototypeOf(_this, WebhookDeleteFailed.prototype);
        return _this;
    }
    return WebhookDeleteFailed;
}(baseError_1.BaseError));
//# sourceMappingURL=webhooks.js.map