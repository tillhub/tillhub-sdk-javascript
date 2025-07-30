"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Submissions = exports.SubmissionStatus = exports.SubmissionRegisterStatus = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var baseError_1 = require("../errors/baseError");
var base_1 = require("../base");
var taxpayer_1 = require("./taxpayer");
var SubmissionRegisterStatus;
(function (SubmissionRegisterStatus) {
    SubmissionRegisterStatus["Unchanged"] = "UNCHANGED";
    SubmissionRegisterStatus["New"] = "NEW";
    SubmissionRegisterStatus["Updated"] = "UPDATED";
    SubmissionRegisterStatus["Decommissioned"] = "DECOMMISSIONED";
})(SubmissionRegisterStatus = exports.SubmissionRegisterStatus || (exports.SubmissionRegisterStatus = {}));
var SubmissionStatus;
(function (SubmissionStatus) {
    SubmissionStatus["Draft"] = "DRAFT";
    SubmissionStatus["Ongoing"] = "ONGOING";
    SubmissionStatus["Submitted"] = "SUBMITTED";
    SubmissionStatus["Failed"] = "FAILED";
    SubmissionStatus["Cancelled"] = "CANCELLED";
})(SubmissionStatus = exports.SubmissionStatus || (exports.SubmissionStatus = {}));
var Submissions = (function (_super) {
    tslib_1.__extends(Submissions, _super);
    function Submissions(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Submissions.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Submissions.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Submissions.prototype.getOverview = function (queryOrOptions) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        next = void 0;
                        base = this.uriHelper.generateBaseUri('/submissions/overview');
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new SubmissionsGetOverviewFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursors) === null || _a === void 0 ? void 0 : _a.after) {
                            next = function () {
                                return _this.getOverview({ uri: response_1.data.cursors.after });
                            };
                        }
                        return [2, {
                                msg: response_1.data.msg,
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new SubmissionsGetOverviewFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Submissions.prototype.getCurrent = function (branchId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/branches/" + branchId + "/submissions/current");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SubmissionsGetCurrentFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg,
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new SubmissionsGetCurrentFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Submissions.prototype.create = function (branchId, submissionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/branches/" + branchId + "/submissions/" + submissionId + "/create");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SubmissionCreateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new SubmissionCreateFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Submissions.prototype.delete = function (branchId, submissionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/branches/" + branchId + "/submissions/" + submissionId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SubmissionDeleteFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new SubmissionDeleteFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Submissions.prototype.trigger = function (branchId, submissionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/branches/" + branchId + "/submissions/" + submissionId + "/trigger");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SubmissionTriggerFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new SubmissionTriggerFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Submissions.prototype.getPreviewPdf = function (branchId, submissionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, data, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/branches/" + branchId + "/submissions/" + submissionId + "/preview");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri, {
                                responseType: 'blob'
                            })];
                    case 2:
                        data = (_a.sent()).data;
                        return [2, data];
                    case 3:
                        error_6 = _a.sent();
                        throw new SubmissionsGetPreviewPdfFailed(error_6.message, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    Submissions.prototype.getPdf = function (branchId, submissionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, data, error_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/branches/" + branchId + "/submissions/" + submissionId + "/download");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri, {
                                responseType: 'blob'
                            })];
                    case 2:
                        data = (_a.sent()).data;
                        return [2, data];
                    case 3:
                        error_7 = _a.sent();
                        throw new SubmissionsGetPdfFailed(error_7.message, { error: error_7 });
                    case 4: return [2];
                }
            });
        });
    };
    Submissions.prototype.taxpayer = function () {
        return new taxpayer_1.Taxpayer(this.options, this.http, this.uriHelper);
    };
    Submissions.baseEndpoint = '/api/v0/submissions';
    return Submissions;
}(base_1.ThBaseHandler));
exports.Submissions = Submissions;
var SubmissionsGetOverviewFailed = (function (_super) {
    tslib_1.__extends(SubmissionsGetOverviewFailed, _super);
    function SubmissionsGetOverviewFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch submissions overview'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SubmissionsGetOverviewFailed';
        Object.setPrototypeOf(_this, SubmissionsGetOverviewFailed.prototype);
        return _this;
    }
    return SubmissionsGetOverviewFailed;
}(baseError_1.BaseError));
var SubmissionCreateFailed = (function (_super) {
    tslib_1.__extends(SubmissionCreateFailed, _super);
    function SubmissionCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create submission'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SubmissionCreateFailed';
        Object.setPrototypeOf(_this, SubmissionCreateFailed.prototype);
        return _this;
    }
    return SubmissionCreateFailed;
}(baseError_1.BaseError));
var SubmissionDeleteFailed = (function (_super) {
    tslib_1.__extends(SubmissionDeleteFailed, _super);
    function SubmissionDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete submission'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SubmissionDeleteFailed';
        Object.setPrototypeOf(_this, SubmissionDeleteFailed.prototype);
        return _this;
    }
    return SubmissionDeleteFailed;
}(baseError_1.BaseError));
var SubmissionTriggerFailed = (function (_super) {
    tslib_1.__extends(SubmissionTriggerFailed, _super);
    function SubmissionTriggerFailed(message, properties) {
        if (message === void 0) { message = 'Could not trigger submission'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SubmissionTriggerFailed';
        Object.setPrototypeOf(_this, SubmissionTriggerFailed.prototype);
        return _this;
    }
    return SubmissionTriggerFailed;
}(baseError_1.BaseError));
var SubmissionsGetCurrentFailed = (function (_super) {
    tslib_1.__extends(SubmissionsGetCurrentFailed, _super);
    function SubmissionsGetCurrentFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch current submission for branch'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SubmissionsGetCurrentFailed';
        Object.setPrototypeOf(_this, SubmissionsGetCurrentFailed.prototype);
        return _this;
    }
    return SubmissionsGetCurrentFailed;
}(baseError_1.BaseError));
var SubmissionsGetPreviewPdfFailed = (function (_super) {
    tslib_1.__extends(SubmissionsGetPreviewPdfFailed, _super);
    function SubmissionsGetPreviewPdfFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch submission preview pdf'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SubmissionsGetPreviewPdfFailed';
        Object.setPrototypeOf(_this, SubmissionsGetPreviewPdfFailed.prototype);
        return _this;
    }
    return SubmissionsGetPreviewPdfFailed;
}(baseError_1.BaseError));
var SubmissionsGetPdfFailed = (function (_super) {
    tslib_1.__extends(SubmissionsGetPdfFailed, _super);
    function SubmissionsGetPdfFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch submission pdf'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SubmissionsGetPdfFailed';
        Object.setPrototypeOf(_this, SubmissionsGetPdfFailed.prototype);
        return _this;
    }
    return SubmissionsGetPdfFailed;
}(baseError_1.BaseError));
//# sourceMappingURL=submissions.js.map