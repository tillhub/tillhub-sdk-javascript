"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsignmentNotesMetaFailed = exports.ConsignmentNotesFetchFailed = exports.ConsignmentNotes = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var ConsignmentNotes = (function (_super) {
    tslib_1.__extends(ConsignmentNotes, _super);
    function ConsignmentNotes(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: ConsignmentNotes.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = ConsignmentNotes.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    ConsignmentNotes.prototype.getAll = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, options);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new ConsignmentNotesFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () {
                                return _this.getAll({ uri: response_1.data.cursor.next });
                            };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new ConsignmentNotesFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    ConsignmentNotes.prototype.meta = function (q) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, q);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ConsignmentNotesMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new ConsignmentNotesMetaFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new ConsignmentNotesMetaFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    ConsignmentNotes.prototype.pdfUri = function (consignmentNoteId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, pdfObj, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/" + consignmentNoteId + "/pdf");
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        pdfObj = response.data.results[0];
                        return [2, {
                                data: pdfObj.base64Content,
                                contentType: pdfObj.contentType,
                                filename: pdfObj.filename
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new ConsignmentNotesPdfFailed(error_3.message);
                    case 3: return [2];
                }
            });
        });
    };
    ConsignmentNotes.baseEndpoint = '/api/v0/consignment-notes';
    return ConsignmentNotes;
}(base_1.ThBaseHandler));
exports.ConsignmentNotes = ConsignmentNotes;
var ConsignmentNotesFetchFailed = (function (_super) {
    tslib_1.__extends(ConsignmentNotesFetchFailed, _super);
    function ConsignmentNotesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the consignment notes'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ConsignmentNotesFetchFailed';
        Object.setPrototypeOf(_this, ConsignmentNotesFetchFailed.prototype);
        return _this;
    }
    return ConsignmentNotesFetchFailed;
}(errors_1.BaseError));
exports.ConsignmentNotesFetchFailed = ConsignmentNotesFetchFailed;
var ConsignmentNotesMetaFailed = (function (_super) {
    tslib_1.__extends(ConsignmentNotesMetaFailed, _super);
    function ConsignmentNotesMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get consignment notes metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ConsignmentNotesMetaFailed';
        Object.setPrototypeOf(_this, ConsignmentNotesMetaFailed.prototype);
        return _this;
    }
    return ConsignmentNotesMetaFailed;
}(errors_1.BaseError));
exports.ConsignmentNotesMetaFailed = ConsignmentNotesMetaFailed;
var ConsignmentNotesPdfFailed = (function (_super) {
    tslib_1.__extends(ConsignmentNotesPdfFailed, _super);
    function ConsignmentNotesPdfFailed(message, properties) {
        if (message === void 0) { message = 'Could not download pdf'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ConsignmentNotesPdfFailed';
        Object.setPrototypeOf(_this, ConsignmentNotesPdfFailed.prototype);
        return _this;
    }
    return ConsignmentNotesPdfFailed;
}(errors_1.BaseError));
//# sourceMappingURL=consignment_notes.js.map