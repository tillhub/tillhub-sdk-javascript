"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsMsuDeleteFailed = exports.NotificationsMsuUpdateFailed = exports.NotificationsMsuCreateFailed = exports.NotificationsMsuMetaFailed = exports.NotificationsMsuGetFailed = exports.NotificationsMsuFetchFailed = exports.NotificationsMsu = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var NotificationsMsu = (function (_super) {
    tslib_1.__extends(NotificationsMsu, _super);
    function NotificationsMsu(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: NotificationsMsu.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = NotificationsMsu.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    NotificationsMsu.prototype.getAll = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, options);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new NotificationsMsuFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new NotificationsMsuFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    NotificationsMsu.prototype.get = function (notificationId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + notificationId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new NotificationsMsuGetFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new NotificationsMsuGetFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    NotificationsMsu.prototype.meta = function (q) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, q);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new NotificationsMsuMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new NotificationsMsuMetaFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new NotificationsMsuMetaFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    NotificationsMsu.prototype.create = function (notification) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, notification)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new NotificationsMsuCreateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new NotificationsMsuCreateFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    NotificationsMsu.prototype.update = function (notificationId, product) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + notificationId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, product)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new NotificationsMsuUpdateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new NotificationsMsuUpdateFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    NotificationsMsu.prototype.delete = function (notificationId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + notificationId);
                        return [4, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new NotificationsMsuDeleteFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 2:
                        error_6 = _a.sent();
                        throw new NotificationsMsuDeleteFailed(error_6.message, { error: error_6 });
                    case 3: return [2];
                }
            });
        });
    };
    NotificationsMsu.baseEndpoint = '/api/v1/notifications/msu';
    return NotificationsMsu;
}(base_1.ThBaseHandler));
exports.NotificationsMsu = NotificationsMsu;
var NotificationsMsuFetchFailed = (function (_super) {
    tslib_1.__extends(NotificationsMsuFetchFailed, _super);
    function NotificationsMsuFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch notifications'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationsMsuFetchFailed';
        Object.setPrototypeOf(_this, NotificationsMsuFetchFailed.prototype);
        return _this;
    }
    return NotificationsMsuFetchFailed;
}(errors_1.BaseError));
exports.NotificationsMsuFetchFailed = NotificationsMsuFetchFailed;
var NotificationsMsuGetFailed = (function (_super) {
    tslib_1.__extends(NotificationsMsuGetFailed, _super);
    function NotificationsMsuGetFailed(message, properties) {
        if (message === void 0) { message = 'Could not get the notification'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationsMsuGetFailed';
        Object.setPrototypeOf(_this, NotificationsMsuCreateFailed.prototype);
        return _this;
    }
    return NotificationsMsuGetFailed;
}(errors_1.BaseError));
exports.NotificationsMsuGetFailed = NotificationsMsuGetFailed;
var NotificationsMsuMetaFailed = (function (_super) {
    tslib_1.__extends(NotificationsMsuMetaFailed, _super);
    function NotificationsMsuMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the notifications meta'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationsMsuMetaFailed';
        Object.setPrototypeOf(_this, NotificationsMsuMetaFailed.prototype);
        return _this;
    }
    return NotificationsMsuMetaFailed;
}(errors_1.BaseError));
exports.NotificationsMsuMetaFailed = NotificationsMsuMetaFailed;
var NotificationsMsuCreateFailed = (function (_super) {
    tslib_1.__extends(NotificationsMsuCreateFailed, _super);
    function NotificationsMsuCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the notification'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationsMsuCreateFailed';
        Object.setPrototypeOf(_this, NotificationsMsuCreateFailed.prototype);
        return _this;
    }
    return NotificationsMsuCreateFailed;
}(errors_1.BaseError));
exports.NotificationsMsuCreateFailed = NotificationsMsuCreateFailed;
var NotificationsMsuUpdateFailed = (function (_super) {
    tslib_1.__extends(NotificationsMsuUpdateFailed, _super);
    function NotificationsMsuUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update the notification'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationsMsuUpdateFailed';
        Object.setPrototypeOf(_this, NotificationsMsuUpdateFailed.prototype);
        return _this;
    }
    return NotificationsMsuUpdateFailed;
}(errors_1.BaseError));
exports.NotificationsMsuUpdateFailed = NotificationsMsuUpdateFailed;
var NotificationsMsuDeleteFailed = (function (_super) {
    tslib_1.__extends(NotificationsMsuDeleteFailed, _super);
    function NotificationsMsuDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the notification'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationsMsuDeleteFailed';
        Object.setPrototypeOf(_this, NotificationsMsuDeleteFailed.prototype);
        return _this;
    }
    return NotificationsMsuDeleteFailed;
}(errors_1.BaseError));
exports.NotificationsMsuDeleteFailed = NotificationsMsuDeleteFailed;
//# sourceMappingURL=notifications-msu.js.map