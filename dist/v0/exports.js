"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportsGobdFetchFailed = exports.Exports = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var baseError_1 = require("../errors/baseError");
var Exports = (function () {
    function Exports(options, http) {
        var _a;
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/exports';
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    Exports.prototype.datev = function (datevQuery, queryOrOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/datev');
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        return [4, this.http.getClient().post(uri, datevQuery)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ExportsDatevFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: {}
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new ExportsDatevFetchFailed(undefined, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Exports.prototype.gobd = function (gobdQuery, queryOrOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/gobd');
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        return [4, this.http.getClient().post(uri, gobdQuery)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ExportsGobdFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: {}
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new ExportsGobdFetchFailed(undefined, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    return Exports;
}());
exports.Exports = Exports;
var ExportsDatevFetchFailed = (function (_super) {
    tslib_1.__extends(ExportsDatevFetchFailed, _super);
    function ExportsDatevFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch datev export'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ExportsDatevFetchFailed';
        Object.setPrototypeOf(_this, ExportsDatevFetchFailed.prototype);
        return _this;
    }
    return ExportsDatevFetchFailed;
}(baseError_1.BaseError));
var ExportsGobdFetchFailed = (function (_super) {
    tslib_1.__extends(ExportsGobdFetchFailed, _super);
    function ExportsGobdFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch gobd export'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ExportsGobdFetchFailed';
        Object.setPrototypeOf(_this, ExportsGobdFetchFailed.prototype);
        return _this;
    }
    return ExportsGobdFetchFailed;
}(baseError_1.BaseError));
exports.ExportsGobdFetchFailed = ExportsGobdFetchFailed;
//# sourceMappingURL=exports.js.map