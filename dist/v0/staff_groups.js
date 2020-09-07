"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffGroupDeleteFailed = exports.StaffGroupCreationFailed = exports.StaffGroupPutFailed = exports.StaffGroupFetchFailed = exports.StaffGroups = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var baseError_1 = require("../errors/baseError");
var base_1 = require("../base");
var StaffGroups = (function (_super) {
    tslib_1.__extends(StaffGroups, _super);
    function StaffGroups(options, http) {
        var _this = _super.call(this, http, {
            endpoint: StaffGroups.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = StaffGroups.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    StaffGroups.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2, reject(new StaffGroupsFetchAllFailed(undefined, { error: error_1 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    StaffGroups.prototype.meta = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/meta");
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            reject(new StaffGroupsMetaFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        error_2 = _a.sent();
                        return [2, reject(new StaffGroupsMetaFailed(undefined, { error: error_2 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    StaffGroups.prototype.get = function (staffGroupId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + staffGroupId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StaffGroupFetchFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2, reject(new StaffGroupFetchFailed(undefined, { error: error_3 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    StaffGroups.prototype.put = function (staffGroupId, staffGroup) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + staffGroupId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, staffGroup)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2, reject(new StaffGroupPutFailed(undefined, { error: error_4 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    StaffGroups.prototype.create = function (staffGroup) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, staffGroup)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_5 = _a.sent();
                        return [2, reject(new StaffGroupCreationFailed(undefined, { error: error_5 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    StaffGroups.prototype.delete = function (staffGroupId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + staffGroupId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new StaffGroupDeleteFailed());
                        return [2, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2, reject(new StaffGroupDeleteFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    StaffGroups.baseEndpoint = '/api/v0/staff_groups';
    return StaffGroups;
}(base_1.ThBaseHandler));
exports.StaffGroups = StaffGroups;
var StaffGroupsFetchAllFailed = (function (_super) {
    tslib_1.__extends(StaffGroupsFetchAllFailed, _super);
    function StaffGroupsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all staff groups'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffGroupsFetchAllFailed';
        return _this;
    }
    return StaffGroupsFetchAllFailed;
}(baseError_1.BaseError));
var StaffGroupsMetaFailed = (function (_super) {
    tslib_1.__extends(StaffGroupsMetaFailed, _super);
    function StaffGroupsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch staff groups meta call'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffGroupsMetaFailed';
        return _this;
    }
    return StaffGroupsMetaFailed;
}(baseError_1.BaseError));
var StaffGroupFetchFailed = (function (_super) {
    tslib_1.__extends(StaffGroupFetchFailed, _super);
    function StaffGroupFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the staff group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffGroupFetchFailed';
        return _this;
    }
    return StaffGroupFetchFailed;
}(baseError_1.BaseError));
exports.StaffGroupFetchFailed = StaffGroupFetchFailed;
var StaffGroupPutFailed = (function (_super) {
    tslib_1.__extends(StaffGroupPutFailed, _super);
    function StaffGroupPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter the staff group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffGroupPutFailed';
        return _this;
    }
    return StaffGroupPutFailed;
}(baseError_1.BaseError));
exports.StaffGroupPutFailed = StaffGroupPutFailed;
var StaffGroupCreationFailed = (function (_super) {
    tslib_1.__extends(StaffGroupCreationFailed, _super);
    function StaffGroupCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the staff group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffGroupCreationFailed';
        return _this;
    }
    return StaffGroupCreationFailed;
}(baseError_1.BaseError));
exports.StaffGroupCreationFailed = StaffGroupCreationFailed;
var StaffGroupDeleteFailed = (function (_super) {
    tslib_1.__extends(StaffGroupDeleteFailed, _super);
    function StaffGroupDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the staff group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffGroupDeleteFailed';
        return _this;
    }
    return StaffGroupDeleteFailed;
}(baseError_1.BaseError));
exports.StaffGroupDeleteFailed = StaffGroupDeleteFailed;
//# sourceMappingURL=staff_groups.js.map