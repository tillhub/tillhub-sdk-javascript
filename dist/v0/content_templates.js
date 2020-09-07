"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentTemplatesSearchFailed = exports.ContentTemplateDeleteFailed = exports.ContentTemplateCreationFailed = exports.ContentTemplatePatchFailed = exports.ContentTemplateFetchFailed = exports.ContentTemplatesFetchFailed = exports.ContentTemplates = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var ContentTemplates = (function (_super) {
    tslib_1.__extends(ContentTemplates, _super);
    function ContentTemplates(options, http) {
        var _this = _super.call(this, http, {
            endpoint: ContentTemplates.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = ContentTemplates.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    ContentTemplates.prototype.getAll = function (queryOrOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, uri, queryString, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (queryOrOptions && queryOrOptions.uri) {
                            uri = queryOrOptions.uri;
                        }
                        else {
                            queryString = '';
                            if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
                                queryString = qs_1.default.stringify(tslib_1.__assign({ limit: queryOrOptions.limit }, queryOrOptions.query));
                            }
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + (queryString ? "?" + queryString : '');
                        }
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.status !== 200) {
                            return [2, reject(new ContentTemplatesFetchFailed(undefined, { status: response_1.status }))];
                        }
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () {
                                return _this.getAll({ uri: response_1.data.cursor.next });
                            };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2, reject(new ContentTemplatesFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    ContentTemplates.prototype.get = function (templateId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + templateId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new ContentTemplateFetchFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2, reject(new ContentTemplateFetchFailed(undefined, { error: error_2 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    ContentTemplates.prototype.search = function (searchTerm) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "?q=" + searchTerm;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new ContentTemplatesSearchFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2, reject(new ContentTemplatesSearchFailed(undefined, { error: error_3 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    ContentTemplates.prototype.patch = function (templateId, content) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + templateId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().patch(uri, content)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2, reject(new ContentTemplatePatchFailed(undefined, { error: error_4 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    ContentTemplates.prototype.create = function (content) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, content)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_5 = _a.sent();
                        return [2, reject(new ContentTemplateCreationFailed(undefined, { error: error_5 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    ContentTemplates.prototype.delete = function (templateId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + templateId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().patch(uri, { deleted: true, active: false })];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new ContentTemplateDeleteFailed());
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2, reject(new ContentTemplateDeleteFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    ContentTemplates.baseEndpoint = '/api/v0/content_templates';
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
var ContentTemplatesSearchFailed = (function (_super) {
    tslib_1.__extends(ContentTemplatesSearchFailed, _super);
    function ContentTemplatesSearchFailed(message, properties) {
        if (message === void 0) { message = 'Could not search content templates'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContentTemplatesSearchFailed';
        Object.setPrototypeOf(_this, ContentTemplatesSearchFailed.prototype);
        return _this;
    }
    return ContentTemplatesSearchFailed;
}(errors_1.BaseError));
exports.ContentTemplatesSearchFailed = ContentTemplatesSearchFailed;
//# sourceMappingURL=content_templates.js.map