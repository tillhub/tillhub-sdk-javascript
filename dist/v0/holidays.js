"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Holidays = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var baseError_1 = require("../errors/baseError");
var base_1 = require("../base");
var Holidays = (function (_super) {
    tslib_1.__extends(Holidays, _super);
    function Holidays(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Holidays.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Holidays.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Holidays.prototype.getAll = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri();
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new HolidaysFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg,
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new HolidaysFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Holidays.baseEndpoint = '/api/v0/holidays';
    return Holidays;
}(base_1.ThBaseHandler));
exports.Holidays = Holidays;
var HolidaysFetchFailed = (function (_super) {
    tslib_1.__extends(HolidaysFetchFailed, _super);
    function HolidaysFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch holidays'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'HolidaysFetchFailed';
        Object.setPrototypeOf(_this, HolidaysFetchFailed.prototype);
        return _this;
    }
    return HolidaysFetchFailed;
}(baseError_1.BaseError));
//# sourceMappingURL=holidays.js.map