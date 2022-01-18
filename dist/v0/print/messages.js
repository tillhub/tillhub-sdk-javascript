"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../../errors"));
var Messages = (function () {
    function Messages(options, http, uriHelper) {
        this.options = options;
        this.http = http;
        this.uriHelper = uriHelper;
    }
    Messages.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/messages');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.PrintMessagesFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new errors.PrintMessagesFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Messages.prototype.get = function (messageId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/messages/" + messageId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.PrintMessageFetchFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                msg: response.data.msg
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new errors.PrintMessageFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Messages.prototype.create = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/messages');
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().post(uri, message)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.PrintMessageCreateFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new errors.PrintMessageCreateFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Messages.prototype.update = function (messageId, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/messages/" + messageId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().patch(uri, message)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.PrintMessageUpdateFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new errors.PrintMessageUpdateFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Messages.prototype.delete = function (messageId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/messages/" + messageId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.PrintMessageDeleteFailed();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 2:
                        error_5 = _a.sent();
                        throw new errors.PrintMessageDeleteFailed();
                    case 3: return [2];
                }
            });
        });
    };
    return Messages;
}());
exports.Messages = Messages;
//# sourceMappingURL=messages.js.map