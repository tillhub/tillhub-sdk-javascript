"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiscalizationInitFailed = exports.Fiscalization = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Fiscalization = (function (_super) {
    tslib_1.__extends(Fiscalization, _super);
    function Fiscalization(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Fiscalization.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Fiscalization.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Fiscalization.prototype.setLicense = function (branchId, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/branches/" + branchId + "/set-license");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, options)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new FiscalizationInitFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new FiscalizationInitFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Fiscalization.baseEndpoint = '/api/v0/fiscalization';
    return Fiscalization;
}(base_1.ThBaseHandler));
exports.Fiscalization = Fiscalization;
var FiscalizationInitFailed = (function (_super) {
    tslib_1.__extends(FiscalizationInitFailed, _super);
    function FiscalizationInitFailed(message, properties) {
        if (message === void 0) { message = 'Could not init fiscalization'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FiscalizationInitFailed';
        Object.setPrototypeOf(_this, FiscalizationInitFailed.prototype);
        return _this;
    }
    return FiscalizationInitFailed;
}(baseError_1.BaseError));
exports.FiscalizationInitFailed = FiscalizationInitFailed;
//# sourceMappingURL=fiscalization.js.map