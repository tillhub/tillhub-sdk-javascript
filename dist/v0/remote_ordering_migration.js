"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteOrderingMigrationProgressFetchFailed = exports.RemoteOrderingMigration = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var RemoteOrderingMigration = (function (_super) {
    tslib_1.__extends(RemoteOrderingMigration, _super);
    function RemoteOrderingMigration(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: RemoteOrderingMigration.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = RemoteOrderingMigration.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    RemoteOrderingMigration.prototype.getProgress = function () {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, row, error_1;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/data-migration-progress');
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _d.sent();
                        if (response.status !== 200) {
                            throw new RemoteOrderingMigrationProgressFetchFailed(undefined, {
                                status: response.status
                            });
                        }
                        row = (_a = response.data.results) === null || _a === void 0 ? void 0 : _a[0];
                        return [2, {
                                data: row !== null && row !== void 0 ? row : null,
                                msg: response.data.msg,
                                metadata: {
                                    count: (_b = response.data.count) !== null && _b !== void 0 ? _b : (_c = response.data.results) === null || _c === void 0 ? void 0 : _c.length
                                }
                            }];
                    case 3:
                        error_1 = _d.sent();
                        if (error_1 instanceof RemoteOrderingMigrationProgressFetchFailed)
                            throw error_1;
                        throw new RemoteOrderingMigrationProgressFetchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    RemoteOrderingMigration.baseEndpoint = '/api/v0/remote-ordering-inner';
    return RemoteOrderingMigration;
}(base_1.ThBaseHandler));
exports.RemoteOrderingMigration = RemoteOrderingMigration;
var RemoteOrderingMigrationProgressFetchFailed = (function (_super) {
    tslib_1.__extends(RemoteOrderingMigrationProgressFetchFailed, _super);
    function RemoteOrderingMigrationProgressFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch remote ordering migration progress'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RemoteOrderingMigrationProgressFetchFailed';
        Object.setPrototypeOf(_this, RemoteOrderingMigrationProgressFetchFailed.prototype);
        return _this;
    }
    return RemoteOrderingMigrationProgressFetchFailed;
}(baseError_1.BaseError));
exports.RemoteOrderingMigrationProgressFetchFailed = RemoteOrderingMigrationProgressFetchFailed;
//# sourceMappingURL=remote_ordering_migration.js.map