"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxpayerPutFailed = exports.TaxpayerFetchFailed = exports.Taxpayer = exports.Salutation = exports.PersonType = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var PersonType;
(function (PersonType) {
    PersonType["NATURAL"] = "natural";
    PersonType["LEGAL"] = "legal";
})(PersonType = exports.PersonType || (exports.PersonType = {}));
var Salutation;
(function (Salutation) {
    Salutation["MR"] = "1";
    Salutation["MS"] = "2";
    Salutation["OTHER"] = "3";
})(Salutation = exports.Salutation || (exports.Salutation = {}));
var Taxpayer = (function () {
    function Taxpayer(options, http, uriHelper) {
        this.options = options;
        this.http = http;
        this.uriHelper = uriHelper;
    }
    Taxpayer.prototype.get = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/taxpayer');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TaxpayerFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new TaxpayerFetchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Taxpayer.prototype.put = function (taxpayer) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/taxpayer');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, taxpayer)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new TaxpayerPutFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    return Taxpayer;
}());
exports.Taxpayer = Taxpayer;
var TaxpayerFetchFailed = (function (_super) {
    tslib_1.__extends(TaxpayerFetchFailed, _super);
    function TaxpayerFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch taxpayer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TaxpayerFetchFailed';
        Object.setPrototypeOf(_this, TaxpayerFetchFailed.prototype);
        return _this;
    }
    return TaxpayerFetchFailed;
}(errors_1.BaseError));
exports.TaxpayerFetchFailed = TaxpayerFetchFailed;
var TaxpayerPutFailed = (function (_super) {
    tslib_1.__extends(TaxpayerPutFailed, _super);
    function TaxpayerPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter taxpayer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TaxpayerPutFailed';
        Object.setPrototypeOf(_this, TaxpayerPutFailed.prototype);
        return _this;
    }
    return TaxpayerPutFailed;
}(errors_1.BaseError));
exports.TaxpayerPutFailed = TaxpayerPutFailed;
//# sourceMappingURL=taxpayer.js.map