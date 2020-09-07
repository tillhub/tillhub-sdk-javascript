"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacySettings = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var LegacySettings = (function () {
    function LegacySettings(options, http) {
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/settings_old';
        this.options.base = this.options.base || 'https://api.tillhub.com';
    }
    LegacySettings.prototype.getAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new errors_1.LegacySettingsFetchFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2, reject(new errors_1.LegacySettingsFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    LegacySettings.prototype.get = function (LegacySettingId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + LegacySettingId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new errors_1.LegacySettingFetchFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2, reject(new errors_1.LegacySettingFetchFailed(undefined, { error: error_2 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    LegacySettings.prototype.update = function (LegacySettingId, LegacySetting) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + LegacySettingId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().patch(uri, LegacySetting)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2, reject(new errors_1.LegacySettingUpdateFailed(undefined, { error: error_3 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    return LegacySettings;
}());
exports.LegacySettings = LegacySettings;
//# sourceMappingURL=settings_old.js.map