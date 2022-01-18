"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsImageCreateFailed = exports.TransactionsGetImagesFailed = exports.Transactions = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var baseError_1 = require("../errors/baseError");
var Transactions = (function () {
    function Transactions(options, http) {
        var _a;
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v2/transactions';
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    Transactions.prototype.getImages = function (transactionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + transactionId + "/images");
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TransactionsGetImagesFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0])
                            throw new TransactionsGetImagesFailed();
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new TransactionsGetImagesFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Transactions.prototype.createImage = function (transactionId, image) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + transactionId + "/images");
                        return [4, this.http.getClient().post(uri, image)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TransactionsImageCreateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new TransactionsImageCreateFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    return Transactions;
}());
exports.Transactions = Transactions;
var TransactionsGetImagesFailed = (function (_super) {
    tslib_1.__extends(TransactionsGetImagesFailed, _super);
    function TransactionsGetImagesFailed(message, properties) {
        if (message === void 0) { message = 'Could not get the transaction\'s images'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionsGetImagesFailed';
        Object.setPrototypeOf(_this, TransactionsGetImagesFailed.prototype);
        return _this;
    }
    return TransactionsGetImagesFailed;
}(baseError_1.BaseError));
exports.TransactionsGetImagesFailed = TransactionsGetImagesFailed;
var TransactionsImageCreateFailed = (function (_super) {
    tslib_1.__extends(TransactionsImageCreateFailed, _super);
    function TransactionsImageCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create transactions image'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionsImageCreateFailed';
        Object.setPrototypeOf(_this, TransactionsImageCreateFailed.prototype);
        return _this;
    }
    return TransactionsImageCreateFailed;
}(baseError_1.BaseError));
exports.TransactionsImageCreateFailed = TransactionsImageCreateFailed;
//# sourceMappingURL=transactions.js.map