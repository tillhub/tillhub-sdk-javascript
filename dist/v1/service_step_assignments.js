"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceStepAssignmentsPutFailed = exports.ServiceStepAssignmentsFetchAllFailed = exports.ServiceStepAssignments = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var baseError_1 = require("../errors/baseError");
var ServiceStepAssignments = (function () {
    function ServiceStepAssignments(options, http) {
        var _a;
        this.options = options;
        this.http = http;
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(ServiceStepAssignments.baseEndpoint, this.options);
    }
    ServiceStepAssignments.prototype.getAll = function (serviceId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + serviceId + "/steps");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new ServiceStepAssignmentsFetchAllFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    ServiceStepAssignments.prototype.put = function (serviceId, serviceStepAssignments) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + serviceId + "/steps");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, serviceStepAssignments)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new ServiceStepAssignmentsPutFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    ServiceStepAssignments.baseEndpoint = '/api/v1/services';
    return ServiceStepAssignments;
}());
exports.ServiceStepAssignments = ServiceStepAssignments;
var ServiceStepAssignmentsFetchAllFailed = (function (_super) {
    tslib_1.__extends(ServiceStepAssignmentsFetchAllFailed, _super);
    function ServiceStepAssignmentsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all service step assignments'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServiceStepAssignmentsFetchAllFailed';
        Object.setPrototypeOf(_this, ServiceStepAssignmentsFetchAllFailed.prototype);
        return _this;
    }
    return ServiceStepAssignmentsFetchAllFailed;
}(baseError_1.BaseError));
exports.ServiceStepAssignmentsFetchAllFailed = ServiceStepAssignmentsFetchAllFailed;
var ServiceStepAssignmentsPutFailed = (function (_super) {
    tslib_1.__extends(ServiceStepAssignmentsPutFailed, _super);
    function ServiceStepAssignmentsPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter the service step assignments'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServiceStepAssignmentsPutFailed';
        Object.setPrototypeOf(_this, ServiceStepAssignmentsPutFailed.prototype);
        return _this;
    }
    return ServiceStepAssignmentsPutFailed;
}(baseError_1.BaseError));
exports.ServiceStepAssignmentsPutFailed = ServiceStepAssignmentsPutFailed;
//# sourceMappingURL=service_step_assignments.js.map