"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentTemplatesMetaFailed = exports.ContentTemplateDeleteFailed = exports.ContentTemplateCreationFailed = exports.ContentTemplatePatchFailed = exports.ContentTemplateFetchFailed = exports.ContentTemplatesFetchFailed = exports.ContentTemplates = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var ContentTemplates = (function (_super) {
    tslib_1.__extends(ContentTemplates, _super);
    function ContentTemplates(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: ContentTemplates.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = ContentTemplates.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    ContentTemplates.prototype.meta = function (queryOrOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ContentTemplatesMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new ContentTemplatesMetaFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new ContentTemplatesMetaFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    ContentTemplates.prototype.getAll = function (queryOrOptions) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_2;
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
                            throw new ContentTemplatesFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () {
                                return _this.getAll({ uri: response_1.data.cursor.next });
                            };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_2 = _b.sent();
                        throw new ContentTemplatesFetchFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    ContentTemplates.prototype.get = function (templateId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + templateId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ContentTemplateFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new ContentTemplateFetchFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    ContentTemplates.prototype.patch = function (templateId, content) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + templateId);
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
                        throw new ContentTemplatePatchFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    ContentTemplates.prototype.create = function (content) {
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
                        throw new ContentTemplateCreationFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    ContentTemplates.prototype.delete = function (templateId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + templateId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().patch(uri, { deleted: true, active: false })];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ContentTemplateDeleteFailed();
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new ContentTemplateDeleteFailed(error_6.message, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    ContentTemplates.baseEndpoint = '/api/v1/content_templates';
    return ContentTemplates;
}(base_1.ThBaseHandler));
exports.ContentTemplates = ContentTemplates;
var ContentTemplatesFetchFailed = (function (_super) {
    tslib_1.__extends(ContentTemplatesFetchFailed, _super);
    function ContentTemplatesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch content templates'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContentTemplatesFetchFailed';
        Object.setPrototypeOf(_this, ContentTemplatesFetchFailed.prototype);
        return _this;
    }
    return ContentTemplatesFetchFailed;
}(errors_1.BaseError));
exports.ContentTemplatesFetchFailed = ContentTemplatesFetchFailed;
var ContentTemplateFetchFailed = (function (_super) {
    tslib_1.__extends(ContentTemplateFetchFailed, _super);
    function ContentTemplateFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch content template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContentTemplateFetchFailed';
        Object.setPrototypeOf(_this, ContentTemplateFetchFailed.prototype);
        return _this;
    }
    return ContentTemplateFetchFailed;
}(errors_1.BaseError));
exports.ContentTemplateFetchFailed = ContentTemplateFetchFailed;
var ContentTemplatePatchFailed = (function (_super) {
    tslib_1.__extends(ContentTemplatePatchFailed, _super);
    function ContentTemplatePatchFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter content template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContentTemplatePatchFailed';
        Object.setPrototypeOf(_this, ContentTemplatePatchFailed.prototype);
        return _this;
    }
    return ContentTemplatePatchFailed;
}(errors_1.BaseError));
exports.ContentTemplatePatchFailed = ContentTemplatePatchFailed;
var ContentTemplateCreationFailed = (function (_super) {
    tslib_1.__extends(ContentTemplateCreationFailed, _super);
    function ContentTemplateCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create content template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContentTemplateCreationFailed';
        Object.setPrototypeOf(_this, ContentTemplateCreationFailed.prototype);
        return _this;
    }
    return ContentTemplateCreationFailed;
}(errors_1.BaseError));
exports.ContentTemplateCreationFailed = ContentTemplateCreationFailed;
var ContentTemplateDeleteFailed = (function (_super) {
    tslib_1.__extends(ContentTemplateDeleteFailed, _super);
    function ContentTemplateDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete content template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContentTemplateDeleteFailed';
        Object.setPrototypeOf(_this, ContentTemplateDeleteFailed.prototype);
        return _this;
    }
    return ContentTemplateDeleteFailed;
}(errors_1.BaseError));
exports.ContentTemplateDeleteFailed = ContentTemplateDeleteFailed;
var ContentTemplatesMetaFailed = (function (_super) {
    tslib_1.__extends(ContentTemplatesMetaFailed, _super);
    function ContentTemplatesMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the content templates meta'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContentTemplatesMetaFailed';
        Object.setPrototypeOf(_this, ContentTemplatesMetaFailed.prototype);
        return _this;
    }
    return ContentTemplatesMetaFailed;
}(errors_1.BaseError));
exports.ContentTemplatesMetaFailed = ContentTemplatesMetaFailed;
//# sourceMappingURL=content-templates.js.map