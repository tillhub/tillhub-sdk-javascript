"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tags = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors/tags"));
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Tags = (function (_super) {
    tslib_1.__extends(Tags, _super);
    function Tags(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, { endpoint: Tags.baseEndpoint, base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Tags.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Tags.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new errors.TagsFetchAllFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Tags.prototype.get = function (tagId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + tagId);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.TagsFetchOneFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new errors.TagsFetchOneFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    Tags.prototype.meta = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri('/meta');
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.TagsGetMetaFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new errors.TagsGetMetaFailed(error_3.message, { error: error_3 });
                    case 3: return [2];
                }
            });
        });
    };
    Tags.prototype.create = function (tag) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri();
                        return [4, this.http.getClient().post(uri, tag)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new errors.TagsCreationFailed(error_4.message, { error: error_4 });
                    case 3: return [2];
                }
            });
        });
    };
    Tags.prototype.put = function (tagId, tag) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + tagId);
                        return [4, this.http.getClient().put(uri, tag)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.TagsPutFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_5 = _a.sent();
                        throw new errors.TagsPutFailed(error_5.message, { error: error_5 });
                    case 3: return [2];
                }
            });
        });
    };
    Tags.baseEndpoint = '/api/v0/tags';
    return Tags;
}(base_1.ThBaseHandler));
exports.Tags = Tags;
//# sourceMappingURL=tags.js.map