"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleStreamsFetchFailed = exports.SaleStreams = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var SaleStreams = (function (_super) {
    tslib_1.__extends(SaleStreams, _super);
    function SaleStreams(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, { endpoint: SaleStreams.baseEndpoint, base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = SaleStreams.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    SaleStreams.prototype.getMotoSaleStreams = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base + "/moto");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SaleStreamsFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new SaleStreamsFetchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    SaleStreams.baseEndpoint = '/api/v0/sale-streams';
    return SaleStreams;
}(base_1.ThBaseHandler));
exports.SaleStreams = SaleStreams;
var SaleStreamsFetchFailed = (function (_super) {
    tslib_1.__extends(SaleStreamsFetchFailed, _super);
    function SaleStreamsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch payment products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SaleStreamsFetchFailed';
        Object.setPrototypeOf(_this, SaleStreamsFetchFailed.prototype);
        return _this;
    }
    return SaleStreamsFetchFailed;
}(baseError_1.BaseError));
exports.SaleStreamsFetchFailed = SaleStreamsFetchFailed;
//# sourceMappingURL=sale_streams.js.map