"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uri_helper_1 = require("../uri-helper");
/* subclasses */
var jobs_1 = require("./print/jobs");
var messages_1 = require("./print/messages");
var printers_1 = require("./print/printers");
var Print = /** @class */ (function () {
    function Print(options, http) {
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/print';
        this.options.base = this.options.base || 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    Print.prototype.jobs = function () {
        return new jobs_1.Jobs(this.options, this.http, this.uriHelper);
    };
    Print.prototype.messages = function () {
        return new messages_1.Messages(this.options, this.http, this.uriHelper);
    };
    Print.prototype.printers = function () {
        return new printers_1.Printers(this.options, this.http, this.uriHelper);
    };
    Print.prototype.subscribeTo = function (eventName) {
        var base = this.uriHelper.generateBaseUri("/events/" + eventName);
        var uri = this.uriHelper.generateUriWithQuery(base);
        return new EventSource(uri);
    };
    return Print;
}());
exports.Print = Print;
//# sourceMappingURL=print.js.map