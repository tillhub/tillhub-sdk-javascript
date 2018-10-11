"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors = __importStar(require("../errors"));
var Deliveries = /** @class */ (function () {
    function Deliveries(options, http) {
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/deliveries';
        this.options.base = this.options.base || 'https://api.tillhub.com';
    }
    Deliveries.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, next, queryString, response, err_1;
            return __generator(this, function (_a) {
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
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.data.cursor && response.data.cursor.next) {
                            next = this.getAll({ uri: response.data.cursor.next });
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count },
                                next: next
                            })];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, reject(new errors.DeliveriesFetchAllFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Deliveries.prototype.getOne = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var deliveryId, query, uri, queryString, response, err_2;
            return __generator(this, function (_a) {
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
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, reject(new errors.DeliveriesFetchOneFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Deliveries.prototype.createDelivery = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, uri, queryString, response, err_3;
            return __generator(this, function (_a) {
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
                        return [4 /*yield*/, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, reject(new errors.DeliveriesCreateFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Deliveries.prototype.createDeliveryPDF = function (deliveryId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + deliveryId + "/pdf?format=uri";
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
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_4 = _a.sent();
                        return [2 /*return*/, reject(new errors.DeliveriesPDFFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Deliveries.prototype.updateDelivery = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, deliveryId, uri, queryString, response, err_5;
            return __generator(this, function (_a) {
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
                        return [4 /*yield*/, this.http.getClient().put(uri, body)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, reject(new errors.DeliveriesUpdateFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Deliveries.prototype.setInProgress = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var deliveryId, query, uri, queryString, response, err_6;
            return __generator(this, function (_a) {
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
                        return [4 /*yield*/, this.http.getClient().post(uri)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_6 = _a.sent();
                        return [2 /*return*/, reject(new errors.DeliveriesInProgressFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Deliveries.prototype.dispatchDelivery = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var deliveryId, query, uri, queryString, response, err_7;
            return __generator(this, function (_a) {
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
                        return [4 /*yield*/, this.http.getClient().post(uri)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_7 = _a.sent();
                        return [2 /*return*/, reject(new errors.DeliveriesDispatchFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Deliveries.prototype.deleteDelivery = function (deliveryId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + deliveryId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_8 = _a.sent();
                        return [2 /*return*/, reject(new errors.DeliveriesDeleteFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Deliveries.prototype.createDeliveryItems = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, uri, queryString, response, err_9;
            return __generator(this, function (_a) {
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
                        return [4 /*yield*/, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_9 = _a.sent();
                        return [2 /*return*/, reject(new errors.DeliveryItemsCreateFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Deliveries.prototype.getAllDeliveryItems = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var deliveryId, query, uri, queryString, response, err_10;
            return __generator(this, function (_a) {
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
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_10 = _a.sent();
                        return [2 /*return*/, reject(new errors.DeliveryItemsFetchAllFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Deliveries.prototype.updateDeliveryItem = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, itemId, uri, queryString, response, err_11;
            return __generator(this, function (_a) {
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
                        return [4 /*yield*/, this.http.getClient().put(uri, body)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_11 = _a.sent();
                        return [2 /*return*/, reject(new errors.DeliveryItemUpdateFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Deliveries.prototype.deleteDeliveryItem = function (itemId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/items/" + itemId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_12 = _a.sent();
                        return [2 /*return*/, reject(new errors.DeliveriesDeleteFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    return Deliveries;
}());
exports.Deliveries = Deliveries;
//# sourceMappingURL=deliveries.js.map