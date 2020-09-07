"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Templates = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var errors = tslib_1.__importStar(require("../errors"));
var base_1 = require("../base");
var Templates = (function (_super) {
    tslib_1.__extends(Templates, _super);
    function Templates(options, http) {
        var _this = _super.call(this, http, {
            endpoint: Templates.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Templates.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        return _this;
    }
    Templates.prototype.create = function (template) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, template)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2, reject(new errors.TemplatesCreationFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Templates.prototype.put = function (templateId, template) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + templateId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, template)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_2 = _a.sent();
                        return [2, reject(new errors.TemplatesPutFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Templates.prototype.getAll = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (options && options.uri) {
                            uri = options.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + (options && options.query ? "?" + qs_1.default.stringify(options.query) : '');
                        }
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count, cursor: response.data.cursor }
                            })];
                    case 2:
                        err_3 = _a.sent();
                        return [2, reject(new errors.TemplatesFetchFailed())];
                    case 3: return [2];
                }
            });
        }); });
    };
    Templates.prototype.preview = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var body, query, templateId, uri, response, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = requestObject.body, query = requestObject.query, templateId = requestObject.templateId;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + templateId + "/preview";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (query && query.format) {
                            uri = uri + "?format=" + query.format;
                        }
                        return [4, this.http.getClient().post(uri, body, {
                                headers: {
                                    Accept: 'application/json'
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_4 = _a.sent();
                        return [2, reject(new errors.TemplatesPreviewFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Templates.baseEndpoint = '/api/v1/templates';
    return Templates;
}(base_1.ThBaseHandler));
exports.Templates = Templates;
//# sourceMappingURL=templates.js.map