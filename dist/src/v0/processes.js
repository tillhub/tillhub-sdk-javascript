"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessesMetaFailed = exports.ProcessItemsFetchFailed = exports.ProcessesDeleteFailed = exports.ProcessesCreationFailed = exports.ProcessesUpdateFailed = exports.ProcessesFetchOneFailed = exports.ProcessesFetchFailed = exports.Processes = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var errors_1 = require("../errors");
var Processes = /** @class */ (function (_super) {
    tslib_1.__extends(Processes, _super);
    function Processes(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Processes.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Processes.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Processes.prototype.create = function (process) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri();
                        return [4 /*yield*/, this.http.getClient().post(uri, process)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ProcessesCreationFailed(undefined, { status: response.status });
                        }
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new ProcessesCreationFailed(undefined, { error: error_1 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Processes.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, baseUri, uri, response_1, error_2;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        baseUri = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(baseUri, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new ProcessesFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2 /*return*/, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            }];
                    case 2:
                        error_2 = _b.sent();
                        throw new ProcessesFetchFailed(undefined, { error: error_2 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Processes.prototype.get = function (processId, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var baseUri, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        baseUri = this.uriHelper.generateBaseUri("/" + processId);
                        uri = this.uriHelper.generateUriWithQuery(baseUri, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ProcessesFetchOneFailed(undefined, { status: response.status });
                        }
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: 1 }
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new ProcessesFetchOneFailed(undefined, { error: error_3 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Processes.prototype.update = function (processId, process) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + processId);
                        return [4 /*yield*/, this.http.getClient().patch(uri, process)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ProcessesUpdateFailed(undefined, { status: response.status });
                        }
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new ProcessesUpdateFailed(undefined, { error: error_4 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Processes.prototype.delete = function (processId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + processId);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ProcessesDeleteFailed(undefined, { status: response.status });
                        }
                        return [2 /*return*/, {
                                msg: response.data.msg
                            }];
                    case 2:
                        error_5 = _a.sent();
                        throw new ProcessesDeleteFailed(undefined, { error: error_5 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Processes.prototype.getItems = function (processId, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var baseUri, uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        baseUri = this.uriHelper.generateBaseUri("/" + processId + "/items");
                        uri = this.uriHelper.generateUriWithQuery(baseUri, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ProcessItemsFetchFailed(undefined, { state: response.status });
                        }
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_6 = _a.sent();
                        throw new ProcessItemsFetchFailed(undefined, { error: error_6 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Processes.prototype.meta = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ProcessesMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new ProcessesMetaFailed(undefined, { status: response.status });
                        }
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_1 = _a.sent();
                        throw new ProcessesMetaFailed(undefined, { error: err_1 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Processes.baseEndpoint = '/api/v0/processes';
    return Processes;
}(base_1.ThBaseHandler));
exports.Processes = Processes;
var ProcessesFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProcessesFetchFailed, _super);
    function ProcessesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch processes'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProcessesFetchFailed';
        Object.setPrototypeOf(_this, ProcessesFetchFailed.prototype);
        return _this;
    }
    return ProcessesFetchFailed;
}(errors_1.BaseError));
exports.ProcessesFetchFailed = ProcessesFetchFailed;
var ProcessesFetchOneFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProcessesFetchOneFailed, _super);
    function ProcessesFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch one process'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProcessesFetchOneFailed';
        Object.setPrototypeOf(_this, ProcessesFetchOneFailed.prototype);
        return _this;
    }
    return ProcessesFetchOneFailed;
}(errors_1.BaseError));
exports.ProcessesFetchOneFailed = ProcessesFetchOneFailed;
var ProcessesUpdateFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProcessesUpdateFailed, _super);
    function ProcessesUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update process'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProcessesUpdateFailed';
        Object.setPrototypeOf(_this, ProcessesUpdateFailed.prototype);
        return _this;
    }
    return ProcessesUpdateFailed;
}(errors_1.BaseError));
exports.ProcessesUpdateFailed = ProcessesUpdateFailed;
var ProcessesCreationFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProcessesCreationFailed, _super);
    function ProcessesCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create process'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProcessesCreationFailed';
        Object.setPrototypeOf(_this, ProcessesCreationFailed.prototype);
        return _this;
    }
    return ProcessesCreationFailed;
}(errors_1.BaseError));
exports.ProcessesCreationFailed = ProcessesCreationFailed;
var ProcessesDeleteFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProcessesDeleteFailed, _super);
    function ProcessesDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete process'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProcessesDeleteFailed';
        Object.setPrototypeOf(_this, ProcessesDeleteFailed.prototype);
        return _this;
    }
    return ProcessesDeleteFailed;
}(errors_1.BaseError));
exports.ProcessesDeleteFailed = ProcessesDeleteFailed;
var ProcessItemsFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProcessItemsFetchFailed, _super);
    function ProcessItemsFetchFailed(message, properties) {
        if (message === void 0) { message = "Could not fetch one process' items"; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProcessItemsFetchFailed';
        Object.setPrototypeOf(_this, ProcessItemsFetchFailed.prototype);
        return _this;
    }
    return ProcessItemsFetchFailed;
}(errors_1.BaseError));
exports.ProcessItemsFetchFailed = ProcessItemsFetchFailed;
var ProcessesMetaFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProcessesMetaFailed, _super);
    function ProcessesMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get meta of Processes'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProcessesMetaFailed';
        Object.setPrototypeOf(_this, ProcessesMetaFailed.prototype);
        return _this;
    }
    return ProcessesMetaFailed;
}(errors_1.BaseError));
exports.ProcessesMetaFailed = ProcessesMetaFailed;
//# sourceMappingURL=processes.js.map