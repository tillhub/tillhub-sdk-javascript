"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deliveries = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors"));
var base_1 = require("../base");
var Deliveries = (function (_super) {
    tslib_1.__extends(Deliveries, _super);
    function Deliveries(options, http) {
        var _this = _super.call(this, http, {
            endpoint: Deliveries.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Deliveries.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        return _this;
    }
    Deliveries.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, next, queryString, response_1, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (query && query.uri) {
                            uri = query.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        }
                        if (query && query.embed) {
                            queryString = query.embed
                                .map(function (item) {
                                return "embed[]=" + item;
                            })
                                .join('&');
                            uri = uri + "?" + queryString;
                        }
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            })];
                    case 2:
                        err_1 = _a.sent();
                        return [2, reject(new errors.DeliveriesFetchAllFailed())];
                    case 3: return [2];
                }
            });
        }); });
    };
    Deliveries.prototype.getOne = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var deliveryId, query, uri, queryString, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deliveryId = requestObject.deliveryId, query = requestObject.query;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + deliveryId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (query && query.embed) {
                            queryString = query.embed
                                .map(function (item) {
                                return "embed[]=" + item;
                            })
                                .join('&');
                            uri = uri + "?" + queryString;
                        }
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_2 = _a.sent();
                        return [2, reject(new errors.DeliveriesFetchOneFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Deliveries.prototype.createDelivery = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var body, query, uri, queryString, response, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = requestObject.body, query = requestObject.query;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (query && query.embed) {
                            queryString = query.embed
                                .map(function (item) {
                                return "embed[]=" + item;
                            })
                                .join('&');
                            uri = uri + "?" + queryString;
                        }
                        return [4, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_3 = _a.sent();
                        return [2, reject(new errors.DeliveriesCreateFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Deliveries.prototype.createDeliveryPDF = function (deliveryId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + deliveryId + "/pdf?format=uri";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, null, {
                                headers: {
                                    Accept: 'application/json'
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_4 = _a.sent();
                        return [2, reject(new errors.DeliveriesPDFFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Deliveries.prototype.updateDelivery = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var body, query, deliveryId, uri, queryString, response, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = requestObject.body, query = requestObject.query, deliveryId = requestObject.deliveryId;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + deliveryId;
                        if (query && query.embed) {
                            queryString = query.embed
                                .map(function (item) {
                                return "embed[]=" + item;
                            })
                                .join('&');
                            uri = uri + "?" + queryString;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, body)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_5 = _a.sent();
                        return [2, reject(new errors.DeliveriesUpdateFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Deliveries.prototype.setInProgress = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var deliveryId, query, uri, queryString, response, err_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deliveryId = requestObject.deliveryId, query = requestObject.query;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + deliveryId + "/in_progress";
                        if (query && query.embed) {
                            queryString = query.embed
                                .map(function (item) {
                                return "embed[]=" + item;
                            })
                                .join('&');
                            uri = uri + "?" + queryString;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_6 = _a.sent();
                        return [2, reject(new errors.DeliveriesInProgressFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Deliveries.prototype.dispatchDelivery = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var deliveryId, query, uri, queryString, response, err_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deliveryId = requestObject.deliveryId, query = requestObject.query;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + deliveryId + "/dispatch";
                        if (query && query.embed) {
                            queryString = query.embed
                                .map(function (item) {
                                return "embed[]=" + item;
                            })
                                .join('&');
                            uri = uri + "?" + queryString;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_7 = _a.sent();
                        return [2, reject(new errors.DeliveriesDispatchFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Deliveries.prototype.deleteDelivery = function (deliveryId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + deliveryId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_8 = _a.sent();
                        return [2, reject(new errors.DeliveriesDeleteFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Deliveries.prototype.createDeliveryItems = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var body, query, uri, queryString, response, err_9;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = requestObject.body, query = requestObject.query;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/items";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (query && query.embed) {
                            queryString = query.embed
                                .map(function (item) {
                                return "embed[]=" + item;
                            })
                                .join('&');
                            uri = uri + "?" + queryString;
                        }
                        return [4, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_9 = _a.sent();
                        return [2, reject(new errors.DeliveryItemsCreateFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Deliveries.prototype.getAllDeliveryItems = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var deliveryId, query, uri, queryString, response, err_10;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deliveryId = requestObject.deliveryId, query = requestObject.query;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + deliveryId + "/items";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (query && query.embed) {
                            queryString = query.embed
                                .map(function (item) {
                                return "embed[]=" + item;
                            })
                                .join('&');
                            uri = uri + "?" + queryString;
                        }
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_10 = _a.sent();
                        return [2, reject(new errors.DeliveryItemsFetchAllFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Deliveries.prototype.updateDeliveryItem = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var body, query, itemId, uri, queryString, response, err_11;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = requestObject.body, query = requestObject.query, itemId = requestObject.itemId;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/items/" + itemId;
                        if (query && query.embed) {
                            queryString = query.embed
                                .map(function (item) {
                                return "embed[]=" + item;
                            })
                                .join('&');
                            uri = uri + "?" + queryString;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, body)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_11 = _a.sent();
                        return [2, reject(new errors.DeliveryItemUpdateFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Deliveries.prototype.deleteDeliveryItem = function (itemId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_12;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/items/" + itemId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_12 = _a.sent();
                        return [2, reject(new errors.DeliveriesDeleteFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Deliveries.baseEndpoint = '/api/v0/deliveries';
    return Deliveries;
}(base_1.ThBaseHandler));
exports.Deliveries = Deliveries;
//# sourceMappingURL=deliveries.js.map