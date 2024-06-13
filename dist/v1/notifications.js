"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsDeleteFailed = exports.NotificationsUpdateFailed = exports.NotificationsCreateFailed = exports.NotificationsMetaFailed = exports.NotificationsFetchFailed = exports.Notifications = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Notifications = (function (_super) {
    tslib_1.__extends(Notifications, _super);
    function Notifications(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Notifications.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Notifications.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Notifications.prototype.getAll = function (options) {
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
                            throw new NotificationsFetchFailed(undefined, { status: response_1.status });
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
                        throw new NotificationsFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Notifications.prototype.meta = function (q) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
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
                            throw new NotificationsMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new NotificationsMetaFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new NotificationsMetaFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Notifications.prototype.create = function (notification) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
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
                            throw new NotificationsCreateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new NotificationsCreateFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Notifications.prototype.update = function (notificationId, product) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
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
                            throw new NotificationsUpdateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new NotificationsUpdateFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Notifications.prototype.delete = function (notificationId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + notificationId);
                        return [4, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new NotificationsDeleteFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 2:
                        error_5 = _a.sent();
                        throw new NotificationsDeleteFailed(error_5.message, { error: error_5 });
                    case 3: return [2];
                }
            });
        });
    };
    Notifications.baseEndpoint = '/api/v1/notifications';
    return Notifications;
}(base_1.ThBaseHandler));
exports.Notifications = Notifications;
var NotificationsFetchFailed = (function (_super) {
    tslib_1.__extends(NotificationsFetchFailed, _super);
    function NotificationsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the notifications'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationsFetchFailed';
        Object.setPrototypeOf(_this, NotificationsFetchFailed.prototype);
        return _this;
    }
    return NotificationsFetchFailed;
}(errors_1.BaseError));
exports.NotificationsFetchFailed = NotificationsFetchFailed;
var NotificationsMetaFailed = (function (_super) {
    tslib_1.__extends(NotificationsMetaFailed, _super);
    function NotificationsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the notifications meta'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationsMetaFailed';
        Object.setPrototypeOf(_this, NotificationsMetaFailed.prototype);
        return _this;
    }
    return NotificationsMetaFailed;
}(errors_1.BaseError));
exports.NotificationsMetaFailed = NotificationsMetaFailed;
var NotificationsCreateFailed = (function (_super) {
    tslib_1.__extends(NotificationsCreateFailed, _super);
    function NotificationsCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the notification'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationsCreateFailed';
        Object.setPrototypeOf(_this, NotificationsCreateFailed.prototype);
        return _this;
    }
    return NotificationsCreateFailed;
}(errors_1.BaseError));
exports.NotificationsCreateFailed = NotificationsCreateFailed;
var NotificationsUpdateFailed = (function (_super) {
    tslib_1.__extends(NotificationsUpdateFailed, _super);
    function NotificationsUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update the notification'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationsUpdateFailed';
        Object.setPrototypeOf(_this, NotificationsUpdateFailed.prototype);
        return _this;
    }
    return NotificationsUpdateFailed;
}(errors_1.BaseError));
exports.NotificationsUpdateFailed = NotificationsUpdateFailed;
var NotificationsDeleteFailed = (function (_super) {
    tslib_1.__extends(NotificationsDeleteFailed, _super);
    function NotificationsDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the notification'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationsDeleteFailed';
        Object.setPrototypeOf(_this, NotificationsDeleteFailed.prototype);
        return _this;
    }
    return NotificationsDeleteFailed;
}(errors_1.BaseError));
exports.NotificationsDeleteFailed = NotificationsDeleteFailed;
//# sourceMappingURL=notifications.js.map