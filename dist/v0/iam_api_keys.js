"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IamApiKeysGetByUnitAndChannelFailed = exports.IamApiKeysPrivateKeyFetchFailed = exports.IamApiKeyFetchFailed = exports.IamApiKeysMetaFailed = exports.IamApiKeysFetchFailed = exports.IamApiKeys = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var IamApiKeys = (function (_super) {
    tslib_1.__extends(IamApiKeys, _super);
    function IamApiKeys(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, { endpoint: IamApiKeys.baseEndpoint, base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = IamApiKeys.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    IamApiKeys.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new IamApiKeysFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursors) === null || _a === void 0 ? void 0 : _a.after) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursors.after }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursors },
                                next: next
                            }];
                    case 3:
                        error_1 = _b.sent();
                        throw new IamApiKeysFetchFailed(error_1.msg, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    IamApiKeys.prototype.get = function (branchUnzerId, apiKeyId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + branchUnzerId + "/" + apiKeyId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new IamApiKeyFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new IamApiKeyFetchFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    IamApiKeys.prototype.getPrivateKey = function (publicKey) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/private-key');
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, { publicKey: publicKey })];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new IamApiKeysPrivateKeyFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                privateKey: response.data.results[0]
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new IamApiKeysPrivateKeyFetchFailed(error_3.msg, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    IamApiKeys.prototype.getKeypairsByUnitAndChannel = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new IamApiKeysGetByUnitAndChannelFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new IamApiKeysGetByUnitAndChannelFailed(error_4.msg, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    IamApiKeys.prototype.meta = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new IamApiKeysMetaFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_5 = _a.sent();
                        throw new IamApiKeysMetaFailed(error_5.msg, { error: error_5 });
                    case 3: return [2];
                }
            });
        });
    };
    IamApiKeys.baseEndpoint = '/api/v0/iam/api-keys';
    return IamApiKeys;
}(base_1.ThBaseHandler));
exports.IamApiKeys = IamApiKeys;
var IamApiKeysFetchFailed = (function (_super) {
    tslib_1.__extends(IamApiKeysFetchFailed, _super);
    function IamApiKeysFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta api keys'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IamApiKeysFetchFailed';
        Object.setPrototypeOf(_this, IamApiKeysFetchFailed.prototype);
        return _this;
    }
    return IamApiKeysFetchFailed;
}(baseError_1.BaseError));
exports.IamApiKeysFetchFailed = IamApiKeysFetchFailed;
var IamApiKeysMetaFailed = (function (_super) {
    tslib_1.__extends(IamApiKeysMetaFailed, _super);
    function IamApiKeysMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta api keys'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IamApiKeysMetaFailed';
        Object.setPrototypeOf(_this, IamApiKeysMetaFailed.prototype);
        return _this;
    }
    return IamApiKeysMetaFailed;
}(baseError_1.BaseError));
exports.IamApiKeysMetaFailed = IamApiKeysMetaFailed;
var IamApiKeyFetchFailed = (function (_super) {
    tslib_1.__extends(IamApiKeyFetchFailed, _super);
    function IamApiKeyFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not meta api key'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IamApiKeyFetchFailed';
        Object.setPrototypeOf(_this, IamApiKeyFetchFailed.prototype);
        return _this;
    }
    return IamApiKeyFetchFailed;
}(baseError_1.BaseError));
exports.IamApiKeyFetchFailed = IamApiKeyFetchFailed;
var IamApiKeysPrivateKeyFetchFailed = (function (_super) {
    tslib_1.__extends(IamApiKeysPrivateKeyFetchFailed, _super);
    function IamApiKeysPrivateKeyFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not private key'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IamApiKeysPrivateKeyFetchFailed';
        Object.setPrototypeOf(_this, IamApiKeysMetaFailed.prototype);
        return _this;
    }
    return IamApiKeysPrivateKeyFetchFailed;
}(baseError_1.BaseError));
exports.IamApiKeysPrivateKeyFetchFailed = IamApiKeysPrivateKeyFetchFailed;
var IamApiKeysGetByUnitAndChannelFailed = (function (_super) {
    tslib_1.__extends(IamApiKeysGetByUnitAndChannelFailed, _super);
    function IamApiKeysGetByUnitAndChannelFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch api keys by unit and channel'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IamApiKeysGetByUnitAndChannelFailed';
        Object.setPrototypeOf(_this, IamApiKeysGetByUnitAndChannelFailed.prototype);
        return _this;
    }
    return IamApiKeysGetByUnitAndChannelFailed;
}(baseError_1.BaseError));
exports.IamApiKeysGetByUnitAndChannelFailed = IamApiKeysGetByUnitAndChannelFailed;
//# sourceMappingURL=iam_api_keys.js.map