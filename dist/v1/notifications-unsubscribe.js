"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsUnsubscribeFailed = exports.NotificationsUnsubscribe = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var NotificationsUnsubscribe = (function (_super) {
    tslib_1.__extends(NotificationsUnsubscribe, _super);
    function NotificationsUnsubscribe(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: NotificationsUnsubscribe.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = NotificationsUnsubscribe.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    NotificationsUnsubscribe.prototype.unsubscribe = function (tenantId, notificationId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + tenantId + "/" + notificationId);
                        return [4, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new NotificationsUnsubscribeFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new NotificationsUnsubscribeFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    NotificationsUnsubscribe.baseEndpoint = '/api/v1/notifications/unsubscribe';
    return NotificationsUnsubscribe;
}(base_1.ThBaseHandler));
exports.NotificationsUnsubscribe = NotificationsUnsubscribe;
var NotificationsUnsubscribeFailed = (function (_super) {
    tslib_1.__extends(NotificationsUnsubscribeFailed, _super);
    function NotificationsUnsubscribeFailed(message, properties) {
        if (message === void 0) { message = 'Could not unsubscribe from the notification'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationsUnsubscribeFailed';
        Object.setPrototypeOf(_this, NotificationsUnsubscribeFailed.prototype);
        return _this;
    }
    return NotificationsUnsubscribeFailed;
}(errors_1.BaseError));
exports.NotificationsUnsubscribeFailed = NotificationsUnsubscribeFailed;
//# sourceMappingURL=notifications-unsubscribe.js.map