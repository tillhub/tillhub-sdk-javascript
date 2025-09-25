"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notifications = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors"));
var uri_helper_1 = require("../uri-helper");
var Notifications = (function () {
    function Notifications(options, http) {
        var _a;
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/notifications';
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    Notifications.prototype.email = function (requestObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, body, type, base, uri, response, error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = requestObject.body, body = _a === void 0 ? {} : _a, type = requestObject.type;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        base = this.uriHelper.generateBaseUri("/emails/" + type);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _b.sent();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        error_1 = _b.sent();
                        throw new errors.NotificationsEmailError();
                    case 4: return [2];
                }
            });
        });
    };
    Notifications.prototype.sms = function (requestObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/sms/send');
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().post(uri, requestObject)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new errors.NotificationsEmailError();
                    case 3: return [2];
                }
            });
        });
    };
    return Notifications;
}());
exports.Notifications = Notifications;
//# sourceMappingURL=notifications.js.map