"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsignmentNotes = void 0;
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
    ConsignmentNotes.prototype.pdfUri = function (consignmentNoteId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, pdfObj, error_1;
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
                        error_1 = _a.sent();
                        throw new ConsignmentNotesPdfFailed(error_1.message);
                    case 3: return [2];
                }
            });
        });
    };
    ConsignmentNotes.baseEndpoint = '/api/v0/consignment-notes';
    return ConsignmentNotes;
}(base_1.ThBaseHandler));
exports.ConsignmentNotes = ConsignmentNotes;
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