"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchGroupDeleteFailed = exports.BranchGroupCreationFailed = exports.BranchGroupPutFailed = exports.BranchGroupFetchFailed = exports.BranchGroupsFetchFailed = exports.BranchGroups = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var BranchGroups = /** @class */ (function (_super) {
    tslib_1.__extends(BranchGroups, _super);
    function BranchGroups(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: BranchGroups.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = BranchGroups.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    BranchGroups.prototype.getAll = function (queryOrOptions) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new BranchGroupsFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () {
                                return _this.getAll({ uri: response_1.data.cursor.next });
                            };
                        }
                        return [2 /*return*/, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new BranchGroupsFetchFailed(undefined, { error: error_1 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BranchGroups.prototype.get = function (branchId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + branchId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new BranchGroupFetchFailed(undefined, { status: response.status });
                        }
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new BranchGroupFetchFailed(undefined, { error: error_2 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BranchGroups.prototype.put = function (branchId, branchGroup) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + branchId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, branchGroup)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new BranchGroupPutFailed(undefined, { error: error_3 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BranchGroups.prototype.create = function (branchGroup) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, branchGroup)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new BranchGroupCreationFailed(undefined, { error: error_4 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BranchGroups.prototype.delete = function (branchId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + branchId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new BranchGroupDeleteFailed();
                        return [2 /*return*/, {
                                msg: response.data.msg
                            }];
                    case 3:
                        err_1 = _a.sent();
                        throw new BranchGroupDeleteFailed();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BranchGroups.baseEndpoint = '/api/v0/branch_groups';
    return BranchGroups;
}(base_1.ThBaseHandler));
exports.BranchGroups = BranchGroups;
var BranchGroupsFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(BranchGroupsFetchFailed, _super);
    function BranchGroupsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch branch groups'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BranchGroupsFetchFailed';
        Object.setPrototypeOf(_this, BranchGroupsFetchFailed.prototype);
        return _this;
    }
    return BranchGroupsFetchFailed;
}(errors_1.BaseError));
exports.BranchGroupsFetchFailed = BranchGroupsFetchFailed;
var BranchGroupFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(BranchGroupFetchFailed, _super);
    function BranchGroupFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch branch group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BranchGroupFetchFailed';
        Object.setPrototypeOf(_this, BranchGroupFetchFailed.prototype);
        return _this;
    }
    return BranchGroupFetchFailed;
}(errors_1.BaseError));
exports.BranchGroupFetchFailed = BranchGroupFetchFailed;
var BranchGroupPutFailed = /** @class */ (function (_super) {
    tslib_1.__extends(BranchGroupPutFailed, _super);
    function BranchGroupPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter branch group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BranchPutFailed';
        Object.setPrototypeOf(_this, BranchGroupPutFailed.prototype);
        return _this;
    }
    return BranchGroupPutFailed;
}(errors_1.BaseError));
exports.BranchGroupPutFailed = BranchGroupPutFailed;
var BranchGroupCreationFailed = /** @class */ (function (_super) {
    tslib_1.__extends(BranchGroupCreationFailed, _super);
    function BranchGroupCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create branch group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BranchGroupCreationFailed';
        Object.setPrototypeOf(_this, BranchGroupCreationFailed.prototype);
        return _this;
    }
    return BranchGroupCreationFailed;
}(errors_1.BaseError));
exports.BranchGroupCreationFailed = BranchGroupCreationFailed;
var BranchGroupDeleteFailed = /** @class */ (function (_super) {
    tslib_1.__extends(BranchGroupDeleteFailed, _super);
    function BranchGroupDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete branch group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BranchGroupDeleteFailed';
        Object.setPrototypeOf(_this, BranchGroupDeleteFailed.prototype);
        return _this;
    }
    return BranchGroupDeleteFailed;
}(errors_1.BaseError));
exports.BranchGroupDeleteFailed = BranchGroupDeleteFailed;
//# sourceMappingURL=branch_groups.js.map