"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Templates = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors"));
var base_1 = require("../base");
var uri_helper_1 = require("../uri-helper");
var Templates = (function (_super) {
    tslib_1.__extends(Templates, _super);
    function Templates(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Templates.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Templates.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Templates.prototype.create = function (template) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, template)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_1 = _a.sent();
                        throw new errors.TemplatesCreationFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Templates.prototype.put = function (templateId, template) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + templateId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, template)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_2 = _a.sent();
                        throw new errors.TemplatesPutFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Templates.prototype.getAll = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, options);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count, cursor: response.data.cursor }
                            }];
                    case 2:
                        err_3 = _a.sent();
                        throw new errors.TemplatesFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Templates.prototype.preview = function (requestObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var body, query, templateId, base, uri, response, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = requestObject.body, query = requestObject.query, templateId = requestObject.templateId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        base = this.uriHelper.generateBaseUri("/" + templateId + "/preview");
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().post(uri, body, {
                                headers: {
                                    Accept: 'application/json'
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_4 = _a.sent();
                        throw new errors.TemplatesPreviewFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Templates.baseEndpoint = '/api/v1/templates';
    return Templates;
}(base_1.ThBaseHandler));
exports.Templates = Templates;
//# sourceMappingURL=templates.js.map