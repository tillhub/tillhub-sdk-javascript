"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffPermissionsTemplatesDeleteFailed = exports.StaffPermissionsTemplatesCreationFailed = exports.StaffPermissionsTemplatesUpdateFailed = exports.StaffPermissionsTemplatesFetchOneFailed = exports.StaffPermissionsTemplatesFetchFailed = exports.StaffPermissionsTemplates = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var errors_1 = require("../errors");
var StaffPermissionsTemplates = (function (_super) {
    tslib_1.__extends(StaffPermissionsTemplates, _super);
    function StaffPermissionsTemplates(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: StaffPermissionsTemplates.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = StaffPermissionsTemplates.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    StaffPermissionsTemplates.prototype.create = function (template) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri();
                        return [4, this.http.getClient().post(uri, template)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StaffPermissionsTemplatesCreationFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new StaffPermissionsTemplatesCreationFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    StaffPermissionsTemplates.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var baseUri, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        baseUri = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(baseUri, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StaffPermissionsTemplatesFetchFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new StaffPermissionsTemplatesFetchFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    StaffPermissionsTemplates.prototype.get = function (templateId, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var baseUri, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        baseUri = this.uriHelper.generateBaseUri("/" + templateId);
                        uri = this.uriHelper.generateUriWithQuery(baseUri, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StaffPermissionsTemplatesFetchOneFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: 1 }
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new StaffPermissionsTemplatesFetchOneFailed(error_3.message, { error: error_3 });
                    case 3: return [2];
                }
            });
        });
    };
    StaffPermissionsTemplates.prototype.update = function (templateId, template) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + templateId);
                        return [4, this.http.getClient().put(uri, template)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StaffPermissionsTemplatesUpdateFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new StaffPermissionsTemplatesUpdateFailed(error_4.message, { error: error_4 });
                    case 3: return [2];
                }
            });
        });
    };
    StaffPermissionsTemplates.prototype.delete = function (templateId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + templateId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StaffPermissionsTemplatesDeleteFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new StaffPermissionsTemplatesDeleteFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    StaffPermissionsTemplates.baseEndpoint = '/api/v0/staff_permission_templates';
    return StaffPermissionsTemplates;
}(base_1.ThBaseHandler));
exports.StaffPermissionsTemplates = StaffPermissionsTemplates;
var StaffPermissionsTemplatesFetchFailed = (function (_super) {
    tslib_1.__extends(StaffPermissionsTemplatesFetchFailed, _super);
    function StaffPermissionsTemplatesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all staff permissions templates'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffPermissionsTemplatesFetchFailed';
        Object.setPrototypeOf(_this, StaffPermissionsTemplatesFetchFailed.prototype);
        return _this;
    }
    return StaffPermissionsTemplatesFetchFailed;
}(errors_1.BaseError));
exports.StaffPermissionsTemplatesFetchFailed = StaffPermissionsTemplatesFetchFailed;
var StaffPermissionsTemplatesFetchOneFailed = (function (_super) {
    tslib_1.__extends(StaffPermissionsTemplatesFetchOneFailed, _super);
    function StaffPermissionsTemplatesFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch one staff permissions template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffPermissionsTemplatesFetchOneFailed';
        Object.setPrototypeOf(_this, StaffPermissionsTemplatesFetchOneFailed.prototype);
        return _this;
    }
    return StaffPermissionsTemplatesFetchOneFailed;
}(errors_1.BaseError));
exports.StaffPermissionsTemplatesFetchOneFailed = StaffPermissionsTemplatesFetchOneFailed;
var StaffPermissionsTemplatesUpdateFailed = (function (_super) {
    tslib_1.__extends(StaffPermissionsTemplatesUpdateFailed, _super);
    function StaffPermissionsTemplatesUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update staff permissions template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffPermissionsTemplatesUpdateFailed';
        Object.setPrototypeOf(_this, StaffPermissionsTemplatesUpdateFailed.prototype);
        return _this;
    }
    return StaffPermissionsTemplatesUpdateFailed;
}(errors_1.BaseError));
exports.StaffPermissionsTemplatesUpdateFailed = StaffPermissionsTemplatesUpdateFailed;
var StaffPermissionsTemplatesCreationFailed = (function (_super) {
    tslib_1.__extends(StaffPermissionsTemplatesCreationFailed, _super);
    function StaffPermissionsTemplatesCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create staff permissions template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffPermissionsTemplatesCreationFailed';
        Object.setPrototypeOf(_this, StaffPermissionsTemplatesCreationFailed.prototype);
        return _this;
    }
    return StaffPermissionsTemplatesCreationFailed;
}(errors_1.BaseError));
exports.StaffPermissionsTemplatesCreationFailed = StaffPermissionsTemplatesCreationFailed;
var StaffPermissionsTemplatesDeleteFailed = (function (_super) {
    tslib_1.__extends(StaffPermissionsTemplatesDeleteFailed, _super);
    function StaffPermissionsTemplatesDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete staff permissions template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffPermissionsTemplatesDeleteFailed';
        Object.setPrototypeOf(_this, StaffPermissionsTemplatesDeleteFailed.prototype);
        return _this;
    }
    return StaffPermissionsTemplatesDeleteFailed;
}(errors_1.BaseError));
exports.StaffPermissionsTemplatesDeleteFailed = StaffPermissionsTemplatesDeleteFailed;
//# sourceMappingURL=staff_permissions_templates.js.map