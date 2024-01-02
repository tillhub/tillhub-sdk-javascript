"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledExportsToggleFailed = exports.ScheduledExports = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var ScheduledExports = (function (_super) {
    tslib_1.__extends(ScheduledExports, _super);
    function ScheduledExports(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: ScheduledExports.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = ScheduledExports.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    ScheduledExports.prototype.create = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                throw new Error('Creation of a scheduled export is not yet implemented');
            });
        });
    };
    ScheduledExports.prototype.toggle = function (scheduleId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + scheduleId + "/toggle");
                        return [4, this.http.getClient().put(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ScheduledExportsToggleFailed();
                        return [2, {
                                data: response.data.results[0]
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new ScheduledExportsToggleFailed();
                    case 3: return [2];
                }
            });
        });
    };
    ScheduledExports.baseEndpoint = '/api/v0/documents/scheduled-exports';
    return ScheduledExports;
}(base_1.ThBaseHandler));
exports.ScheduledExports = ScheduledExports;
var ScheduledExportsToggleFailed = (function (_super) {
    tslib_1.__extends(ScheduledExportsToggleFailed, _super);
    function ScheduledExportsToggleFailed(message, properties) {
        if (message === void 0) { message = 'Failed to toggle scheduled export active status'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ScheduledExportsToggleFailed';
        Object.setPrototypeOf(_this, ScheduledExportsToggleFailed.prototype);
        return _this;
    }
    return ScheduledExportsToggleFailed;
}(errors_1.BaseError));
exports.ScheduledExportsToggleFailed = ScheduledExportsToggleFailed;
//# sourceMappingURL=scheduled_exports.js.map