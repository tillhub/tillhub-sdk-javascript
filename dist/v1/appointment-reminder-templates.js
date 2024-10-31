"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentReminderTemplatesFetchFailed = exports.AppointmentReminderTemplates = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var errors_1 = require("../errors");
var AppointmentReminderTemplates = (function (_super) {
    tslib_1.__extends(AppointmentReminderTemplates, _super);
    function AppointmentReminderTemplates(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: AppointmentReminderTemplates.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = AppointmentReminderTemplates.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    AppointmentReminderTemplates.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/templates');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new AppointmentReminderTemplatesFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.results.length }
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new AppointmentReminderTemplatesFetchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    AppointmentReminderTemplates.baseEndpoint = '/api/v1/notifications/appointment-reminders';
    return AppointmentReminderTemplates;
}(base_1.ThBaseHandler));
exports.AppointmentReminderTemplates = AppointmentReminderTemplates;
var AppointmentReminderTemplatesFetchFailed = (function (_super) {
    tslib_1.__extends(AppointmentReminderTemplatesFetchFailed, _super);
    function AppointmentReminderTemplatesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch appointment reminder templates.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AppointmentReminderTemplatesFetchFailed';
        Object.setPrototypeOf(_this, AppointmentReminderTemplatesFetchFailed.prototype);
        return _this;
    }
    return AppointmentReminderTemplatesFetchFailed;
}(errors_1.BaseError));
exports.AppointmentReminderTemplatesFetchFailed = AppointmentReminderTemplatesFetchFailed;
//# sourceMappingURL=appointment-reminder-templates.js.map