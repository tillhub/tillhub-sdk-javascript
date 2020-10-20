"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimetrackingEntryDeleteFailed = exports.TimetrackingEntryPutFailed = exports.TimetrackingEntryCreateFailed = exports.TimetrackingEntriesFetchFailed = exports.TimetrackingStaffListFetchFailed = exports.TimetrackingReportFetchFailed = exports.Timetracking = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Timetracking = (function (_super) {
    tslib_1.__extends(Timetracking, _super);
    function Timetracking(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Timetracking.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Timetracking.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Timetracking.prototype.get = function (staffId, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/reports/staff/" + staffId);
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TimetrackingReportFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new TimetrackingReportFetchFailed(undefined, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Timetracking.prototype.getEntries = function (staffId, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/entries/staff/" + staffId);
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TimetrackingEntriesFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new TimetrackingEntriesFetchFailed(undefined, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Timetracking.prototype.createEntry = function (entry) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/entries');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, entry)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TimetrackingEntryCreateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new TimetrackingEntryCreateFailed(undefined, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Timetracking.prototype.updateEntry = function (entryId, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/entries/" + entryId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, data)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TimetrackingEntryPutFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new TimetrackingEntryPutFailed(undefined, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Timetracking.prototype.deleteEntry = function (entryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/entries/" + entryId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TimetrackingEntryDeleteFailed(undefined, { status: response.status });
                        }
                        return [2, { msg: response.data.msg }];
                    case 3:
                        error_5 = _a.sent();
                        throw new TimetrackingEntryDeleteFailed(undefined, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Timetracking.prototype.getStaffList = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/staff');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TimetrackingStaffListFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new TimetrackingStaffListFetchFailed(undefined, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    Timetracking.baseEndpoint = '/api/v0/time_tracking';
    return Timetracking;
}(base_1.ThBaseHandler));
exports.Timetracking = Timetracking;
var TimetrackingReportFetchFailed = (function (_super) {
    tslib_1.__extends(TimetrackingReportFetchFailed, _super);
    function TimetrackingReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the timetracking report for the staff member'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TimetrackingReportFetchFailed';
        Object.setPrototypeOf(_this, TimetrackingReportFetchFailed.prototype);
        return _this;
    }
    return TimetrackingReportFetchFailed;
}(errors_1.BaseError));
exports.TimetrackingReportFetchFailed = TimetrackingReportFetchFailed;
var TimetrackingStaffListFetchFailed = (function (_super) {
    tslib_1.__extends(TimetrackingStaffListFetchFailed, _super);
    function TimetrackingStaffListFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the list of staff with timetracking entries'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TimetrackingStaffListFetchFailed';
        Object.setPrototypeOf(_this, TimetrackingStaffListFetchFailed.prototype);
        return _this;
    }
    return TimetrackingStaffListFetchFailed;
}(errors_1.BaseError));
exports.TimetrackingStaffListFetchFailed = TimetrackingStaffListFetchFailed;
var TimetrackingEntriesFetchFailed = (function (_super) {
    tslib_1.__extends(TimetrackingEntriesFetchFailed, _super);
    function TimetrackingEntriesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the timetracking entries for the staff member'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TimetrackingEntriesFetchFailed';
        Object.setPrototypeOf(_this, TimetrackingEntriesFetchFailed.prototype);
        return _this;
    }
    return TimetrackingEntriesFetchFailed;
}(errors_1.BaseError));
exports.TimetrackingEntriesFetchFailed = TimetrackingEntriesFetchFailed;
var TimetrackingEntryCreateFailed = (function (_super) {
    tslib_1.__extends(TimetrackingEntryCreateFailed, _super);
    function TimetrackingEntryCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could have not create the timetracking entry'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TimetrackingEntryCreateFailed';
        Object.setPrototypeOf(_this, TimetrackingEntryCreateFailed.prototype);
        return _this;
    }
    return TimetrackingEntryCreateFailed;
}(errors_1.BaseError));
exports.TimetrackingEntryCreateFailed = TimetrackingEntryCreateFailed;
var TimetrackingEntryPutFailed = (function (_super) {
    tslib_1.__extends(TimetrackingEntryPutFailed, _super);
    function TimetrackingEntryPutFailed(message, properties) {
        if (message === void 0) { message = 'Could have not update the timetracking entry'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TimetrackingEntryPutFailed';
        Object.setPrototypeOf(_this, TimetrackingEntryPutFailed.prototype);
        return _this;
    }
    return TimetrackingEntryPutFailed;
}(errors_1.BaseError));
exports.TimetrackingEntryPutFailed = TimetrackingEntryPutFailed;
var TimetrackingEntryDeleteFailed = (function (_super) {
    tslib_1.__extends(TimetrackingEntryDeleteFailed, _super);
    function TimetrackingEntryDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could have not delete the timetracking entry'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TimetrackingEntryDeleteFailed';
        Object.setPrototypeOf(_this, TimetrackingEntryDeleteFailed.prototype);
        return _this;
    }
    return TimetrackingEntryDeleteFailed;
}(errors_1.BaseError));
exports.TimetrackingEntryDeleteFailed = TimetrackingEntryDeleteFailed;
//# sourceMappingURL=timetracking.js.map