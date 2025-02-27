"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsInventoryExportFetchError = exports.AnalyticsReportsInventoryFetchError = exports.AnalyticsReportsInventory = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsInventory = (function (_super) {
    tslib_1.__extends(AnalyticsReportsInventory, _super);
    function AnalyticsReportsInventory(options, http) {
        var _a;
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        _this.timeout = (_a = options.timeout) !== null && _a !== void 0 ? _a : _this.http.getClient().defaults.timeout;
        return _this;
    }
    AnalyticsReportsInventory.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsInventory, options, http);
    };
    AnalyticsReportsInventory.prototype.getAll = function (query) {
        var _a, _b, _c, _d, _e, _f;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var nextFn, localUriHelper, uri, _g, d, next_1, data, summary, count, output, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 2, , 3]);
                        nextFn = void 0;
                        localUriHelper = new uri_helper_1.UriHelper('/api/v1/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/inventory');
                        return [4, this.handleGet(uri, query, { timeout: this.timeout })];
                    case 1:
                        _g = _h.sent(), d = _g.results, next_1 = _g.next;
                        if (!d) {
                            throw new TypeError('Unexpectedly did not return data.');
                        }
                        data = (_b = (_a = d === null || d === void 0 ? void 0 : d.find(function (item) { return item.metric.job === 'reports_inventory'; })) === null || _a === void 0 ? void 0 : _a.values) !== null && _b !== void 0 ? _b : [];
                        summary = (_d = (_c = d === null || d === void 0 ? void 0 : d.find(function (item) { return item.metric.job === 'reports_inventory_summary'; })) === null || _c === void 0 ? void 0 : _c.values) !== null && _d !== void 0 ? _d : [];
                        count = (_f = (_e = d === null || d === void 0 ? void 0 : d.find(function (item) {
                            return item.metric.job === 'reports_inventory_filtered_meta';
                        })) === null || _e === void 0 ? void 0 : _e.values[0]) !== null && _f !== void 0 ? _f : {};
                        if (next_1) {
                            nextFn = function () {
                                return _this.getAll({ uri: next_1 });
                            };
                        }
                        output = {
                            data: data,
                            summary: summary,
                            metadata: count,
                            next: nextFn
                        };
                        console.log('output: ', output);
                        return [2, output];
                    case 2:
                        error_1 = _h.sent();
                        throw new AnalyticsReportsInventoryFetchError(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsInventory;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsInventory = AnalyticsReportsInventory;
var AnalyticsReportsInventoryFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsInventoryFetchError, _super);
    function AnalyticsReportsInventoryFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch inventory items. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsInventoryFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsInventoryFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsInventoryFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsInventoryFetchError = AnalyticsReportsInventoryFetchError;
var AnalyticsReportsInventoryExportFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsInventoryExportFetchError, _super);
    function AnalyticsReportsInventoryExportFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch inventory export. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsInventoryExportFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsInventoryExportFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsInventoryExportFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsInventoryExportFetchError = AnalyticsReportsInventoryExportFetchError;
//# sourceMappingURL=inventory.js.map