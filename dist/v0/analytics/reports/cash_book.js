"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashBookReportFetchFailed = exports.CashBook = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../../../errors");
var CashBook = (function () {
    function CashBook(options, http, uriHelper) {
        this.options = options;
        this.http = http;
        this.uriHelper = uriHelper;
    }
    CashBook.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/cash_book');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0].values,
                                metadata: { count: response.data.results[0].count }
                            })];
                    case 2:
                        err_1 = _a.sent();
                        return [2, reject(new CashBookReportFetchFailed())];
                    case 3: return [2];
                }
            });
        }); });
    };
    return CashBook;
}());
exports.CashBook = CashBook;
var CashBookReportFetchFailed = (function (_super) {
    tslib_1.__extends(CashBookReportFetchFailed, _super);
    function CashBookReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the cash book report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CashBookReportFetchFailed';
        Object.setPrototypeOf(_this, CashBookReportFetchFailed.prototype);
        return _this;
    }
    return CashBookReportFetchFailed;
}(errors_1.BaseError));
exports.CashBookReportFetchFailed = CashBookReportFetchFailed;
//# sourceMappingURL=cash_book.js.map