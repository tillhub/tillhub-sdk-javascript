"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbBackupsSignedUrlFetchFailed = exports.DbBackupsFetchFailed = exports.DbBackups = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../base");
var uri_helper_1 = require("../uri-helper");
var errors_1 = require("../errors");
var DbBackups = (function (_super) {
    tslib_1.__extends(DbBackups, _super);
    function DbBackups(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: DbBackups.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = DbBackups.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    DbBackups.prototype.getAll = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        return [4, this.http.getClient().get(base, { timeout: 0 })];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new DbBackupsFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new DbBackupsFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    DbBackups.prototype.signedUrl = function (dbBackupDate) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/signed_url/" + dbBackupDate);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri, { timeout: 0 })];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new DbBackupsSignedUrlFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new DbBackupsSignedUrlFetchFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    DbBackups.baseEndpoint = '/api/v0/db_backups';
    return DbBackups;
}(base_1.ThBaseHandler));
exports.DbBackups = DbBackups;
var DbBackupsFetchFailed = (function (_super) {
    tslib_1.__extends(DbBackupsFetchFailed, _super);
    function DbBackupsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch backups'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DbBackupsFetchFailed';
        Object.setPrototypeOf(_this, DbBackupsFetchFailed.prototype);
        return _this;
    }
    return DbBackupsFetchFailed;
}(errors_1.BaseError));
exports.DbBackupsFetchFailed = DbBackupsFetchFailed;
var DbBackupsSignedUrlFetchFailed = (function (_super) {
    tslib_1.__extends(DbBackupsSignedUrlFetchFailed, _super);
    function DbBackupsSignedUrlFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch signed url for backup'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DbBackupsSignedUrlFetchFailed';
        Object.setPrototypeOf(_this, DbBackupsSignedUrlFetchFailed.prototype);
        return _this;
    }
    return DbBackupsSignedUrlFetchFailed;
}(errors_1.BaseError));
exports.DbBackupsSignedUrlFetchFailed = DbBackupsSignedUrlFetchFailed;
//# sourceMappingURL=db_backups.js.map