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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.ReportsGastroReservationsFetchAllFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new errors.ReportsGastroReservationsFetchAllFailed();
                    case 3: return [2];
                }
            });
        });
    };
    return GastroReservations;
}());
exports.GastroReservations = GastroReservations;
//# sourceMappingURL=gastro-reservations.js.map