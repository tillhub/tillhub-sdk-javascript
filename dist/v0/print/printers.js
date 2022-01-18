"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Printers = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../../errors"));
var Printers = (function () {
    function Printers(options, http, uriHelper) {
        this.options = options;
        this.http = http;
        this.uriHelper = uriHelper;
    }
    Printers.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/printers');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.PrintersFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new errors.PrintersFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Printers.prototype.get = function (printerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/printers/" + printerId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.PrinterFetchFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                msg: response.data.msg
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new errors.PrinterFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Printers.prototype.create = function (printer) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/printers');
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().post(uri, printer)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.PrinterCreateFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new errors.PrinterCreateFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Printers.prototype.update = function (printerId, printer) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/printers/" + printerId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().patch(uri, printer)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.PrinterUpdateFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new errors.PrinterUpdateFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Printers.prototype.delete = function (printerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/printers/" + printerId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.PrinterDeleteFailed();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 2:
                        error_5 = _a.sent();
                        throw new errors.PrinterDeleteFailed();
                    case 3: return [2];
                }
            });
        });
    };
    return Printers;
}());
exports.Printers = Printers;
//# sourceMappingURL=printers.js.map