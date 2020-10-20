"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deliveries = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors"));
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Deliveries = /** @class */ (function (_super) {
    tslib_1.__extends(Deliveries, _super);
    function Deliveries(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Deliveries.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Deliveries.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Deliveries.prototype.generateUriQueryEmbed = function (base, query) {
        var _a = query !== null && query !== void 0 ? query : {}, embed = _a.embed, restQuery = tslib_1.__rest(_a, ["embed"]); // eslint-disable-line @typescript-eslint/no-unused-vars
        var uri = this.uriHelper.generateUriWithQuery(base, restQuery);
        if (query === null || query === void 0 ? void 0 : query.embed) {
            var queryString = query.embed
                .map(function (item) {
                return "embed[]=" + item;
            })
                .join('&');
            var connector = uri.includes('?') ? '&' : '?';
            uri = "" + uri + connector + queryString;
        }
        return uri;
    };
    Deliveries.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.generateUriQueryEmbed(base, query);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response_1 = _b.sent();
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2 /*return*/, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            }];
                    case 3:
                        err_1 = _b.sent();
                        throw new errors.DeliveriesFetchAllFailed();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Deliveries.prototype.getOne = function (requestObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var deliveryId, query, base, uri, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deliveryId = requestObject.deliveryId, query = requestObject.query;
                        base = this.uriHelper.generateBaseUri("/" + deliveryId);
                        uri = this.generateUriQueryEmbed(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_2 = _a.sent();
                        throw new errors.DeliveriesFetchOneFailed();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Deliveries.prototype.createDelivery = function (requestObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var body, query, base, uri, response, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = requestObject.body, query = requestObject.query;
                        base = this.uriHelper.generateBaseUri();
                        uri = this.generateUriQueryEmbed(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_3 = _a.sent();
                        throw new errors.DeliveriesCreateFailed();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Deliveries.prototype.createDeliveryPDF = function (deliveryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + deliveryId + "/pdf?format=uri");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, null, {
                                headers: {
                                    Accept: 'application/json' // not needed for tillhub-api, but axios sets default headers { 'accept': 'application/json, text/plain, */*' } if not specified
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_4 = _a.sent();
                        throw new errors.DeliveriesPDFFailed();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Deliveries.prototype.updateDelivery = function (requestObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var body, query, deliveryId, base, uri, response, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = requestObject.body, query = requestObject.query, deliveryId = requestObject.deliveryId;
                        base = this.uriHelper.generateBaseUri("/" + deliveryId);
                        uri = this.generateUriQueryEmbed(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, body)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_5 = _a.sent();
                        throw new errors.DeliveriesUpdateFailed();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Deliveries.prototype.setInProgress = function (requestObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var deliveryId, query, base, uri, response, err_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deliveryId = requestObject.deliveryId, query = requestObject.query;
                        base = this.uriHelper.generateBaseUri("/" + deliveryId + "/in_progress");
                        uri = this.generateUriQueryEmbed(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_6 = _a.sent();
                        throw new errors.DeliveriesInProgressFailed();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Deliveries.prototype.dispatchDelivery = function (requestObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var deliveryId, query, base, uri, response, err_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deliveryId = requestObject.deliveryId, query = requestObject.query;
                        base = this.uriHelper.generateBaseUri("/" + deliveryId + "/dispatch");
                        uri = this.generateUriQueryEmbed(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_7 = _a.sent();
                        throw new errors.DeliveriesDispatchFailed();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Deliveries.prototype.deleteDelivery = function (deliveryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + deliveryId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                msg: response.data.msg
                            }];
                    case 3:
                        err_8 = _a.sent();
                        throw new errors.DeliveriesDeleteFailed();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Deliveries.prototype.createDeliveryItems = function (requestObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var body, query, base, uri, response, err_9;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = requestObject.body, query = requestObject.query;
                        base = this.uriHelper.generateBaseUri('/items');
                        uri = this.generateUriQueryEmbed(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_9 = _a.sent();
                        throw new errors.DeliveryItemsCreateFailed();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Deliveries.prototype.getAllDeliveryItems = function (requestObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var deliveryId, query, base, uri, response, err_10;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deliveryId = requestObject.deliveryId, query = requestObject.query;
                        base = this.uriHelper.generateBaseUri("/" + deliveryId + "/items");
                        uri = this.generateUriQueryEmbed(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_10 = _a.sent();
                        throw new errors.DeliveryItemsFetchAllFailed();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Deliveries.prototype.updateDeliveryItem = function (requestObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var body, query, itemId, base, uri, response, err_11;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = requestObject.body, query = requestObject.query, itemId = requestObject.itemId;
                        base = this.uriHelper.generateBaseUri("/items/" + itemId);
                        uri = this.generateUriQueryEmbed(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, body)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_11 = _a.sent();
                        throw new errors.DeliveryItemUpdateFailed();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Deliveries.prototype.deleteDeliveryItem = function (itemId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_12;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/items/" + itemId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                msg: response.data.msg
                            }];
                    case 3:
                        err_12 = _a.sent();
                        throw new errors.DeliveriesDeleteFailed();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Deliveries.baseEndpoint = '/api/v0/deliveries';
    return Deliveries;
}(base_1.ThBaseHandler));
exports.Deliveries = Deliveries;
//# sourceMappingURL=deliveries.js.map