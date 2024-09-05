"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentReminderFetchFailed = exports.AppointmentReminderPostFailed = exports.AppointmentReminderPatchFailed = exports.AppointmentReminders = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var errors_1 = require("../errors");
var AppointmentReminders = (function (_super) {
    tslib_1.__extends(AppointmentReminders, _super);
    function AppointmentReminders(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: AppointmentReminders.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = AppointmentReminders.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    AppointmentReminders.prototype.get = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new AppointmentReminderFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new AppointmentReminderFetchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    AppointmentReminders.prototype.post = function (appointmentReminder) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, appointmentReminder)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new AppointmentReminderPostFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    AppointmentReminders.prototype.patch = function (id, appointmentReminder) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().patch(uri, appointmentReminder)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new AppointmentReminderPatchFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    AppointmentReminders.baseEndpoint = '/api/v1/notifications/appointment-reminders';
    return AppointmentReminders;
}(base_1.ThBaseHandler));
exports.AppointmentReminders = AppointmentReminders;
var AppointmentReminderPatchFailed = (function (_super) {
    tslib_1.__extends(AppointmentReminderPatchFailed, _super);
    function AppointmentReminderPatchFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter appointment reminder.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AppointmentReminderPatchFailed';
        Object.setPrototypeOf(_this, AppointmentReminderPatchFailed.prototype);
        return _this;
    }
    return AppointmentReminderPatchFailed;
}(errors_1.BaseError));
exports.AppointmentReminderPatchFailed = AppointmentReminderPatchFailed;
var AppointmentReminderPostFailed = (function (_super) {
    tslib_1.__extends(AppointmentReminderPostFailed, _super);
    function AppointmentReminderPostFailed(message, properties) {
        if (message === void 0) { message = 'Could not create appointment reminder.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AppointmentReminderPostFailed';
        Object.setPrototypeOf(_this, AppointmentReminderPostFailed.prototype);
        return _this;
    }
    return AppointmentReminderPostFailed;
}(errors_1.BaseError));
exports.AppointmentReminderPostFailed = AppointmentReminderPostFailed;
var AppointmentReminderFetchFailed = (function (_super) {
    tslib_1.__extends(AppointmentReminderFetchFailed, _super);
    function AppointmentReminderFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch appointment reminders.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AppointmentReminderFetchFailed';
        Object.setPrototypeOf(_this, AppointmentReminderFetchFailed.prototype);
        return _this;
    }
    return AppointmentReminderFetchFailed;
}(errors_1.BaseError));
exports.AppointmentReminderFetchFailed = AppointmentReminderFetchFailed;
//# sourceMappingURL=appointment_reminders.js.map