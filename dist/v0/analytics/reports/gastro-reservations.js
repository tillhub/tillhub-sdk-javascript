"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GastroReservations = exports.ReservationSource = exports.ReservationStatus = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../../../uri-helper");
var errors = tslib_1.__importStar(require("../../../errors/analytics"));
var ReservationStatus;
(function (ReservationStatus) {
    ReservationStatus["RESERVED"] = "reserved";
    ReservationStatus["SEATED"] = "seated";
    ReservationStatus["COMPLETED"] = "completed";
    ReservationStatus["CANCELLED"] = "cancelled";
    ReservationStatus["NO_SHOW"] = "no_show";
})(ReservationStatus = exports.ReservationStatus || (exports.ReservationStatus = {}));
var ReservationSource;
(function (ReservationSource) {
    ReservationSource["WALK_IN"] = "walk_in";
    ReservationSource["ONLINE_BOOKING"] = "online_booking";
    ReservationSource["ONLINE_CALENDAR"] = "ios_calendar";
})(ReservationSource = exports.ReservationSource || (exports.ReservationSource = {}));
var GastroReservations = (function () {
    function GastroReservations(options, http) {
        var _a;
        this.endpoint = '/api/v0/gastro/reservations/appointments/report';
        this.options = options;
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.http = http;
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    GastroReservations.prototype.getAll = function (query) {
        var _a, _b, _c, _d, _e;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _f.sent();
                        if (response_1.status !== 200) {
                            throw new errors.ReportsGastroReservationsFetchAllFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursors) === null || _a === void 0 ? void 0 : _a.after) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursors.after }); };
                        }
                        return [2, {
                                data: (_c = (_b = response_1.data.results[0]) === null || _b === void 0 ? void 0 : _b.values) !== null && _c !== void 0 ? _c : [],
                                summary: [(_e = (_d = response_1.data.results[1]) === null || _d === void 0 ? void 0 : _d.values) !== null && _e !== void 0 ? _e : {}],
                                metadata: { cursor: response_1.data.cursors },
                                next: next
                            }];
                    case 2:
                        error_1 = _f.sent();
                        throw new errors.ReportsGastroReservationsFetchAllFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    GastroReservations.prototype.meta = function (queryOrOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.ReportsGastroReservationsMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new errors.ReportsGastroReservationsMetaFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new errors.ReportsGastroReservationsMetaFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    return GastroReservations;
}());
exports.GastroReservations = GastroReservations;
//# sourceMappingURL=gastro-reservations.js.map