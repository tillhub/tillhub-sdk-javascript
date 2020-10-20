"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vat = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../../../errors/analytics"));
var Vat = /** @class */ (function () {
    function Vat(options, http, uriHelper) {
        this.options = options;
        this.http = http;
        this.uriHelper = uriHelper;
    }
    Vat.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/vat');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2 /*return*/, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            }];
                    case 2:
                        err_1 = _b.sent();
                        throw new errors.VatReportFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Vat.prototype.meta = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/vat/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.VatReportFetchMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new errors.VatReportFetchMetaFailed('Could not get vat metadata unexpectedly');
                        }
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_2 = _a.sent();
                        throw new errors.VatReportFetchMetaFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Vat;
}());
exports.Vat = Vat;
//# sourceMappingURL=vat.js.map