"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StocksBook = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../base");
var uri_helper_1 = require("../uri-helper");
var stocks_1 = require("../v0/stocks");
var StocksBook = (function (_super) {
    tslib_1.__extends(StocksBook, _super);
    function StocksBook(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: StocksBook.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = StocksBook.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    StocksBook.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/book');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new stocks_1.StocksBookFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new stocks_1.StocksBookFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    StocksBook.prototype.meta = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/book/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new stocks_1.StocksBookGetMetaFailed();
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new stocks_1.StocksBookGetMetaFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    StocksBook.baseEndpoint = '/api/v1/stock';
    return StocksBook;
}(base_1.ThBaseHandler));
exports.StocksBook = StocksBook;
//# sourceMappingURL=stocks.js.map