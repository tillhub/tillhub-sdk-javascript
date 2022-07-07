"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VouchersFetchFailed = exports.Vouchers = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var vouchers_1 = require("../v0/vouchers");
var Vouchers = (function (_super) {
    tslib_1.__extends(Vouchers, _super);
    function Vouchers(options, http) {
        var _this = _super.call(this, options, http) || this;
        _this.endpointV1 = Vouchers.baseEndpointV1;
        _this.uriHelperV1 = new uri_helper_1.UriHelper(_this.endpointV1, options);
        return _this;
    }
    Vouchers.prototype.getAll = function (optionsOrQuery) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelperV1.generateBaseUri();
                        uri = this.uriHelperV1.generateUriWithQuery(base, optionsOrQuery);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new VouchersFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new VouchersFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Vouchers.prototype.meta = function (q) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelperV1.generateBaseUri('/meta');
                        uri = this.uriHelperV1.generateUriWithQuery(base, q);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new vouchers_1.VouchersMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new vouchers_1.VouchersMetaFailed('could not get voucher metadata unexpectedly');
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new vouchers_1.VouchersMetaFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    Vouchers.baseEndpointV1 = '/api/v1/vouchers';
    return Vouchers;
}(vouchers_1.Vouchers));
exports.Vouchers = Vouchers;
var VouchersFetchFailed = (function (_super) {
    tslib_1.__extends(VouchersFetchFailed, _super);
    function VouchersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the vouchers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VouchersFetchFailed';
        Object.setPrototypeOf(_this, VouchersFetchFailed.prototype);
        return _this;
    }
    return VouchersFetchFailed;
}(errors_1.BaseError));
exports.VouchersFetchFailed = VouchersFetchFailed;
//# sourceMappingURL=vouchers.js.map