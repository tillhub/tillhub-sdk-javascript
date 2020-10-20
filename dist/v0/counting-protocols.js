"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountingProtocolsMetaFailed = exports.CountingProtocolsFetchFailed = exports.CountingProtocols = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var CountingProtocols = (function (_super) {
    tslib_1.__extends(CountingProtocols, _super);
    function CountingProtocols(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: CountingProtocols.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = CountingProtocols.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    CountingProtocols.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new CountingProtocolsFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new CountingProtocolsFetchFailed(undefined, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    CountingProtocols.prototype.meta = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri('/meta');
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new CountingProtocolsMetaFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new CountingProtocolsMetaFailed(undefined, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    CountingProtocols.baseEndpoint = '/api/v0/cashier_counting_protocols';
    return CountingProtocols;
}(base_1.ThBaseHandler));
exports.CountingProtocols = CountingProtocols;
var CountingProtocolsFetchFailed = (function (_super) {
    tslib_1.__extends(CountingProtocolsFetchFailed, _super);
    function CountingProtocolsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the counting protocols'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CountingProtocolsFetchFailed';
        Object.setPrototypeOf(_this, CountingProtocolsFetchFailed.prototype);
        return _this;
    }
    return CountingProtocolsFetchFailed;
}(errors_1.BaseError));
exports.CountingProtocolsFetchFailed = CountingProtocolsFetchFailed;
var CountingProtocolsMetaFailed = (function (_super) {
    tslib_1.__extends(CountingProtocolsMetaFailed, _super);
    function CountingProtocolsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch metadata for counting protocols'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CountingProtocolsMetaFailed';
        Object.setPrototypeOf(_this, CountingProtocolsMetaFailed.prototype);
        return _this;
    }
    return CountingProtocolsMetaFailed;
}(errors_1.BaseError));
exports.CountingProtocolsMetaFailed = CountingProtocolsMetaFailed;
//# sourceMappingURL=counting-protocols.js.map