"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jobs = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../../errors"));
var Jobs = (function () {
    function Jobs(options, http, uriHelper) {
        this.options = options;
        this.http = http;
        this.uriHelper = uriHelper;
    }
    Jobs.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/jobs');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.PrintJobsFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        e_1 = _a.sent();
                        throw new errors.PrintJobsFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Jobs.prototype.get = function (jobId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/jobs/" + jobId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.PrintJobFetchFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                msg: response.data.msg
                            }];
                    case 2:
                        e_2 = _a.sent();
                        throw new errors.PrintJobFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Jobs.prototype.create = function (job, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, e_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/jobs');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().post(uri, job)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.PrintJobCreateFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        e_3 = _a.sent();
                        throw new errors.PrintJobCreateFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Jobs.prototype.update = function (jobId, job) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, e_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/jobs/" + jobId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().patch(uri, job)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.PrintJobUpdateFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        e_4 = _a.sent();
                        throw new errors.PrintJobUpdateFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Jobs.prototype.delete = function (jobId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, e_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/jobs/" + jobId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.PrintJobDeleteFailed();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 2:
                        e_5 = _a.sent();
                        throw new errors.PrintJobDeleteFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Jobs.prototype.getData = function (jobId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, e_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/jobs/" + jobId + "/data");
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.PrintJobDataFetchFailed();
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 2:
                        e_6 = _a.sent();
                        throw new errors.PrintJobDataFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    return Jobs;
}());
exports.Jobs = Jobs;
//# sourceMappingURL=jobs.js.map