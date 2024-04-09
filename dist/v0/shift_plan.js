"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftPlanPutFailed = exports.ShiftPlan = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var baseError_1 = require("../errors/baseError");
var base_1 = require("../base");
var ShiftPlan = (function (_super) {
    tslib_1.__extends(ShiftPlan, _super);
    function ShiftPlan(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: ShiftPlan.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = ShiftPlan.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    ShiftPlan.prototype.getAll = function () {
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
                            throw new ShiftPlanFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg,
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new ShiftPlanFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    ShiftPlan.prototype.put = function (shiftPlanOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, shiftPlanOptions)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new ShiftPlanPutFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    ShiftPlan.baseEndpoint = '/api/v0/shift_plan';
    return ShiftPlan;
}(base_1.ThBaseHandler));
exports.ShiftPlan = ShiftPlan;
var ShiftPlanFetchFailed = (function (_super) {
    tslib_1.__extends(ShiftPlanFetchFailed, _super);
    function ShiftPlanFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch ShiftPlan'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ShiftPlanFetchFailed';
        Object.setPrototypeOf(_this, ShiftPlanFetchFailed.prototype);
        return _this;
    }
    return ShiftPlanFetchFailed;
}(baseError_1.BaseError));
var ShiftPlanPutFailed = (function (_super) {
    tslib_1.__extends(ShiftPlanPutFailed, _super);
    function ShiftPlanPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter the shift plan'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ShiftPlanPutFailed';
        Object.setPrototypeOf(_this, ShiftPlanPutFailed.prototype);
        return _this;
    }
    return ShiftPlanPutFailed;
}(baseError_1.BaseError));
exports.ShiftPlanPutFailed = ShiftPlanPutFailed;
//# sourceMappingURL=shift_plan.js.map