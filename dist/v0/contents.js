"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentsSearchFailed = exports.ContentDeleteFailed = exports.ContentCreationFailed = exports.ContentPatchFailed = exports.ContentFetchFailed = exports.ContentsFetchFailed = exports.Contents = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Contents = (function (_super) {
    tslib_1.__extends(Contents, _super);
    function Contents(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Contents.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Contents.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Contents.prototype.getAll = function (queryOrOptions) {
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
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new ContentsFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new ContentsFetchFailed(undefined, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Contents.prototype.get = function (contentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + contentId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ContentFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new ContentFetchFailed(undefined, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Contents.prototype.search = function (searchTerm) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, { q: searchTerm });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ContentsSearchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new ContentsSearchFailed(undefined, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Contents.prototype.patch = function (contentId, content) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + contentId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().patch(uri, content)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new ContentPatchFailed(undefined, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Contents.prototype.create = function (content) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, content)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new ContentCreationFailed(undefined, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Contents.prototype.delete = function (contentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + contentId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ContentDeleteFailed();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        err_1 = _a.sent();
                        throw new ContentDeleteFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Contents.baseEndpoint = '/api/v0/contents';
    return Contents;
}(base_1.ThBaseHandler));
exports.Contents = Contents;
var ContentsFetchFailed = (function (_super) {
    tslib_1.__extends(ContentsFetchFailed, _super);
    function ContentsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch contents'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContentsFetchFailed';
        Object.setPrototypeOf(_this, ContentsFetchFailed.prototype);
        return _this;
    }
    return ContentsFetchFailed;
}(errors_1.BaseError));
exports.ContentsFetchFailed = ContentsFetchFailed;
var ContentFetchFailed = (function (_super) {
    tslib_1.__extends(ContentFetchFailed, _super);
    function ContentFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch content'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContentFetchFailed';
        Object.setPrototypeOf(_this, ContentFetchFailed.prototype);
        return _this;
    }
    return ContentFetchFailed;
}(errors_1.BaseError));
exports.ContentFetchFailed = ContentFetchFailed;
var ContentPatchFailed = (function (_super) {
    tslib_1.__extends(ContentPatchFailed, _super);
    function ContentPatchFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter content'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContentPatchFailed';
        Object.setPrototypeOf(_this, ContentPatchFailed.prototype);
        return _this;
    }
    return ContentPatchFailed;
}(errors_1.BaseError));
exports.ContentPatchFailed = ContentPatchFailed;
var ContentCreationFailed = (function (_super) {
    tslib_1.__extends(ContentCreationFailed, _super);
    function ContentCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create content'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContentCreationFailed';
        Object.setPrototypeOf(_this, ContentCreationFailed.prototype);
        return _this;
    }
    return ContentCreationFailed;
}(errors_1.BaseError));
exports.ContentCreationFailed = ContentCreationFailed;
var ContentDeleteFailed = (function (_super) {
    tslib_1.__extends(ContentDeleteFailed, _super);
    function ContentDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete content'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContentDeleteFailed';
        Object.setPrototypeOf(_this, ContentDeleteFailed.prototype);
        return _this;
    }
    return ContentDeleteFailed;
}(errors_1.BaseError));
exports.ContentDeleteFailed = ContentDeleteFailed;
var ContentsSearchFailed = (function (_super) {
    tslib_1.__extends(ContentsSearchFailed, _super);
    function ContentsSearchFailed(message, properties) {
        if (message === void 0) { message = 'Could not search contents'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContentDeleteFailed';
        Object.setPrototypeOf(_this, ContentsSearchFailed.prototype);
        return _this;
    }
    return ContentsSearchFailed;
}(errors_1.BaseError));
exports.ContentsSearchFailed = ContentsSearchFailed;
//# sourceMappingURL=contents.js.map