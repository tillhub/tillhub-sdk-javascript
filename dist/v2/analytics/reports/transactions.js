"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsTransactionsOverviewExportFetchError = exports.AnalyticsReportsTransactionDetailFetcshError = exports.AnalyticsReportsTransactionsOverviewFetchError = exports.AnalyticsReportsTransactionsDetail = exports.AnalyticsReportsTransactionsOverview = void 0;
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var AnalyticsReportsTransactionsOverview = /** @class */ (function (_super) {
    __extends(AnalyticsReportsTransactionsOverview, _super);
    function AnalyticsReportsTransactionsOverview(options, http) {
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        return _this;
    }
    AnalyticsReportsTransactionsOverview.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsTransactionsOverview, options, http);
    };
    AnalyticsReportsTransactionsOverview.prototype.getAll = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var nextFn, _a, d, next_1, data, summary, count, totalCount, err_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        nextFn = void 0;
                        return [4 /*yield*/, this.handleGet(this.options.base + "/api/v2/analytics/" + this.options.user + "/reports/transactions/overview", query)];
                    case 1:
                        _a = _b.sent(), d = _a.results, next_1 = _a.next;
                        if (!d) {
                            throw new TypeError('Unexpectedly did not return data.');
                        }
                        data = d.find(function (item) {
                            return item.metric.job === 'reports_transactions_v2_overview_data';
                        }).values;
                        summary = d.find(function (item) {
                            return item.metric.job === 'reports_transactions_v2_overview_summary';
                        }).values;
                        count = d.find(function (item) {
                            return item.metric.job === 'reports_transactions_v2_overview_filtered_meta';
                        }).values[0];
                        totalCount = d.find(function (item) {
                            return item.metric.job === 'reports_transactions_v2_overview_meta';
                        }).values[0];
                        if (next_1) {
                            nextFn = function () {
                                return _this.getAll({ uri: next_1 });
                            };
                        }
                        return [2 /*return*/, {
                                data: data,
                                summary: summary,
                                metaData: {
                                    count: count.count,
                                    total_count: totalCount.count
                                },
                                next: nextFn
                            }];
                    case 2:
                        err_1 = _b.sent();
                        throw new AnalyticsReportsTransactionsOverviewFetchError(undefined, { error: err_1 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AnalyticsReportsTransactionsOverview.prototype.export = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.handleExport(this.options.base + "/api/v2/analytics/" + this.options.user + "/reports/transactions/overview", query)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        err_2 = _a.sent();
                        throw new AnalyticsReportsTransactionsOverviewExportFetchError(undefined, { error: err_2 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AnalyticsReportsTransactionsOverview;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsTransactionsOverview = AnalyticsReportsTransactionsOverview;
var AnalyticsReportsTransactionsDetail = /** @class */ (function (_super) {
    __extends(AnalyticsReportsTransactionsDetail, _super);
    function AnalyticsReportsTransactionsDetail(options, http) {
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        return _this;
    }
    AnalyticsReportsTransactionsDetail.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsTransactionsDetail, options, http);
    };
    AnalyticsReportsTransactionsDetail.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var d, data, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.handleGet(this.options.base + "/api/v2/analytics/" + this.options.user + "/reports/transactions/" + id + "/detail")
                            // eslint-disable-next-line
                            // @ts-ignore
                        ];
                    case 1:
                        d = (_a.sent()).results;
                        data = d.find(function (item) {
                            return item.metric.job === 'reports_transactions_v2_transaction_detail_data';
                        }).values;
                        return [2 /*return*/, {
                                data: data[0],
                                metaData: {
                                    count: 1,
                                    total_count: 1
                                }
                            }];
                    case 2:
                        err_3 = _a.sent();
                        throw new AnalyticsReportsTransactionDetailFetcshError(undefined, { error: err_3 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AnalyticsReportsTransactionsDetail;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsTransactionsDetail = AnalyticsReportsTransactionsDetail;
var AnalyticsReportsTransactionsOverviewFetchError = /** @class */ (function (_super) {
    __extends(AnalyticsReportsTransactionsOverviewFetchError, _super);
    function AnalyticsReportsTransactionsOverviewFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch transaction overview. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsTransactionsOverviewFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsTransactionsOverviewFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsTransactionsOverviewFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsTransactionsOverviewFetchError = AnalyticsReportsTransactionsOverviewFetchError;
var AnalyticsReportsTransactionDetailFetcshError = /** @class */ (function (_super) {
    __extends(AnalyticsReportsTransactionDetailFetcshError, _super);
    function AnalyticsReportsTransactionDetailFetcshError(message, properties) {
        if (message === void 0) { message = 'Could not fetch transaction detail. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsTransactionDetailFetcshError';
        Object.setPrototypeOf(_this, AnalyticsReportsTransactionDetailFetcshError.prototype);
        return _this;
    }
    return AnalyticsReportsTransactionDetailFetcshError;
}(errors_1.BaseError));
exports.AnalyticsReportsTransactionDetailFetcshError = AnalyticsReportsTransactionDetailFetcshError;
var AnalyticsReportsTransactionsOverviewExportFetchError = /** @class */ (function (_super) {
    __extends(AnalyticsReportsTransactionsOverviewExportFetchError, _super);
    function AnalyticsReportsTransactionsOverviewExportFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch transaction overview export. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsTransactionsOverviewExportFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsTransactionsOverviewExportFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsTransactionsOverviewExportFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsTransactionsOverviewExportFetchError = AnalyticsReportsTransactionsOverviewExportFetchError;
//# sourceMappingURL=transactions.js.map