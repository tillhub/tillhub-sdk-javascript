"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorefrontsAvailableProductsMetaFailed = exports.StorefrontsAvailableProductsFailed = exports.StorefrontsFetchWhitelistedMetaFailed = exports.StorefrontsFetchWhitelistedFailed = exports.StorefrontsWhitelistFailed = exports.StorefrontsDeltaFailed = exports.StorefrontsSyncStatusFetchFailed = exports.StorefrontsSyncAllFailed = exports.StorefrontsProfileFetchFailed = exports.StorefrontsDeleteFailed = exports.StorefrontsCreationFailed = exports.StorefrontsPutFailed = exports.StorefrontsFetchOneFailed = exports.StorefrontsFetchFailed = exports.Storefronts = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var base_1 = require("../base");
var uri_helper_1 = require("../uri-helper");
var Storefronts = (function (_super) {
    tslib_1.__extends(Storefronts, _super);
    function Storefronts(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Storefronts.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Storefronts.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Storefronts.prototype.getAll = function (queryOrOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StorefrontsFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new StorefrontsFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Storefronts.prototype.get = function (storefrontId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + storefrontId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StorefrontsFetchOneFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new StorefrontsFetchOneFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Storefronts.prototype.put = function (storefrontId, storefront) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + storefrontId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, storefront)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new StorefrontsPutFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Storefronts.prototype.create = function (storefront) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, storefront)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new StorefrontsCreationFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Storefronts.prototype.delete = function (storefrontId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + storefrontId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new StorefrontsDeleteFailed();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new StorefrontsDeleteFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Storefronts.prototype.profile = function (storefrontId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + storefrontId + "/profile");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StorefrontsProfileFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new StorefrontsProfileFetchFailed(error_6.message, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    Storefronts.prototype.sync = function (storefrontId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + storefrontId + "/products/sync");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StorefrontsSyncAllFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        error_7 = _a.sent();
                        throw new StorefrontsSyncAllFailed(error_7.message, { error: error_7 });
                    case 4: return [2];
                }
            });
        });
    };
    Storefronts.prototype.syncStatus = function (storefrontId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + storefrontId + "/sync/status");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StorefrontsSyncStatusFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_8 = _a.sent();
                        throw new StorefrontsSyncStatusFetchFailed(error_8.message, { error: error_8 });
                    case 4: return [2];
                }
            });
        });
    };
    Storefronts.prototype.delta = function (storefrontId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_9;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + storefrontId + "/sync/delta");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StorefrontsDeltaFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_9 = _a.sent();
                        throw new StorefrontsDeltaFailed(error_9.message, { error: error_9 });
                    case 4: return [2];
                }
            });
        });
    };
    Storefronts.prototype.whitelist = function (storefrontId, products) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_10;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + storefrontId + "/products/whitelist");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, { products: products })];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StorefrontsWhitelistFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_10 = _a.sent();
                        throw new StorefrontsWhitelistFailed(error_10.message, { error: error_10 });
                    case 4: return [2];
                }
            });
        });
    };
    Storefronts.prototype.getWhitelisted = function (storefrontId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_11;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + storefrontId + "/products/whitelist");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StorefrontsFetchWhitelistedFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_11 = _a.sent();
                        throw new StorefrontsFetchWhitelistedFailed(error_11.message, { error: error_11 });
                    case 4: return [2];
                }
            });
        });
    };
    Storefronts.prototype.getWhitelistedMeta = function (storefrontId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_12;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + storefrontId + "/products/whitelist/meta");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StorefrontsFetchWhitelistedMetaFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_12 = _a.sent();
                        throw new StorefrontsFetchWhitelistedMetaFailed(error_12.message, { error: error_12 });
                    case 4: return [2];
                }
            });
        });
    };
    Storefronts.prototype.availableProducts = function (storefrontId, query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_13;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + storefrontId + "/products/available");
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new StorefrontsAvailableProductsFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.availableProducts(storefrontId, { uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                msg: response_1.data.msg,
                                metadata: { count: response_1.data.count },
                                next: next
                            }];
                    case 3:
                        error_13 = _b.sent();
                        throw new StorefrontsAvailableProductsFailed(error_13.message, { error: error_13 });
                    case 4: return [2];
                }
            });
        });
    };
    Storefronts.prototype.availableProductsMeta = function (storefrontId, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_14;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + storefrontId + "/products/available/meta");
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StorefrontsAvailableProductsMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new StorefrontsAvailableProductsMetaFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_14 = _a.sent();
                        throw new StorefrontsAvailableProductsMetaFailed(error_14.message, { error: error_14 });
                    case 4: return [2];
                }
            });
        });
    };
    Storefronts.baseEndpoint = '/api/v0/storefronts';
    return Storefronts;
}(base_1.ThBaseHandler));
exports.Storefronts = Storefronts;
var StorefrontsFetchFailed = (function (_super) {
    tslib_1.__extends(StorefrontsFetchFailed, _super);
    function StorefrontsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch storefronts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsFetchFailed';
        Object.setPrototypeOf(_this, StorefrontsFetchFailed.prototype);
        return _this;
    }
    return StorefrontsFetchFailed;
}(errors_1.BaseError));
exports.StorefrontsFetchFailed = StorefrontsFetchFailed;
var StorefrontsFetchOneFailed = (function (_super) {
    tslib_1.__extends(StorefrontsFetchOneFailed, _super);
    function StorefrontsFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch one storefront'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsFetchOneFailed';
        Object.setPrototypeOf(_this, StorefrontsFetchOneFailed.prototype);
        return _this;
    }
    return StorefrontsFetchOneFailed;
}(errors_1.BaseError));
exports.StorefrontsFetchOneFailed = StorefrontsFetchOneFailed;
var StorefrontsPutFailed = (function (_super) {
    tslib_1.__extends(StorefrontsPutFailed, _super);
    function StorefrontsPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not update storefront'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsPutFailed';
        Object.setPrototypeOf(_this, StorefrontsPutFailed.prototype);
        return _this;
    }
    return StorefrontsPutFailed;
}(errors_1.BaseError));
exports.StorefrontsPutFailed = StorefrontsPutFailed;
var StorefrontsCreationFailed = (function (_super) {
    tslib_1.__extends(StorefrontsCreationFailed, _super);
    function StorefrontsCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create storefronts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsCreationFailed';
        Object.setPrototypeOf(_this, StorefrontsCreationFailed.prototype);
        return _this;
    }
    return StorefrontsCreationFailed;
}(errors_1.BaseError));
exports.StorefrontsCreationFailed = StorefrontsCreationFailed;
var StorefrontsDeleteFailed = (function (_super) {
    tslib_1.__extends(StorefrontsDeleteFailed, _super);
    function StorefrontsDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete storefronts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsDeleteFailed';
        Object.setPrototypeOf(_this, StorefrontsDeleteFailed.prototype);
        return _this;
    }
    return StorefrontsDeleteFailed;
}(errors_1.BaseError));
exports.StorefrontsDeleteFailed = StorefrontsDeleteFailed;
var StorefrontsProfileFetchFailed = (function (_super) {
    tslib_1.__extends(StorefrontsProfileFetchFailed, _super);
    function StorefrontsProfileFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the storefront profile data'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsProfileFetchFailed';
        Object.setPrototypeOf(_this, StorefrontsProfileFetchFailed.prototype);
        return _this;
    }
    return StorefrontsProfileFetchFailed;
}(errors_1.BaseError));
exports.StorefrontsProfileFetchFailed = StorefrontsProfileFetchFailed;
var StorefrontsSyncAllFailed = (function (_super) {
    tslib_1.__extends(StorefrontsSyncAllFailed, _super);
    function StorefrontsSyncAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not sync all the products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsSyncAllFailed';
        Object.setPrototypeOf(_this, StorefrontsSyncAllFailed.prototype);
        return _this;
    }
    return StorefrontsSyncAllFailed;
}(errors_1.BaseError));
exports.StorefrontsSyncAllFailed = StorefrontsSyncAllFailed;
var StorefrontsSyncStatusFetchFailed = (function (_super) {
    tslib_1.__extends(StorefrontsSyncStatusFetchFailed, _super);
    function StorefrontsSyncStatusFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the status of the sync process'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsSyncStatusFetchFailed';
        Object.setPrototypeOf(_this, StorefrontsSyncStatusFetchFailed.prototype);
        return _this;
    }
    return StorefrontsSyncStatusFetchFailed;
}(errors_1.BaseError));
exports.StorefrontsSyncStatusFetchFailed = StorefrontsSyncStatusFetchFailed;
var StorefrontsDeltaFailed = (function (_super) {
    tslib_1.__extends(StorefrontsDeltaFailed, _super);
    function StorefrontsDeltaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the delta for the whitelisted products of the store'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsDeltaFailed';
        Object.setPrototypeOf(_this, StorefrontsDeltaFailed.prototype);
        return _this;
    }
    return StorefrontsDeltaFailed;
}(errors_1.BaseError));
exports.StorefrontsDeltaFailed = StorefrontsDeltaFailed;
var StorefrontsWhitelistFailed = (function (_super) {
    tslib_1.__extends(StorefrontsWhitelistFailed, _super);
    function StorefrontsWhitelistFailed(message, properties) {
        if (message === void 0) { message = 'Could not whitelist the provided products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsWhitelistFailed';
        Object.setPrototypeOf(_this, StorefrontsWhitelistFailed.prototype);
        return _this;
    }
    return StorefrontsWhitelistFailed;
}(errors_1.BaseError));
exports.StorefrontsWhitelistFailed = StorefrontsWhitelistFailed;
var StorefrontsFetchWhitelistedFailed = (function (_super) {
    tslib_1.__extends(StorefrontsFetchWhitelistedFailed, _super);
    function StorefrontsFetchWhitelistedFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch whitelisted products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsFetchWhitelistedFailed';
        Object.setPrototypeOf(_this, StorefrontsFetchWhitelistedFailed.prototype);
        return _this;
    }
    return StorefrontsFetchWhitelistedFailed;
}(errors_1.BaseError));
exports.StorefrontsFetchWhitelistedFailed = StorefrontsFetchWhitelistedFailed;
var StorefrontsFetchWhitelistedMetaFailed = (function (_super) {
    tslib_1.__extends(StorefrontsFetchWhitelistedMetaFailed, _super);
    function StorefrontsFetchWhitelistedMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for the whitelisted products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsFetchWhitelistedMetaFailed';
        Object.setPrototypeOf(_this, StorefrontsFetchWhitelistedMetaFailed.prototype);
        return _this;
    }
    return StorefrontsFetchWhitelistedMetaFailed;
}(errors_1.BaseError));
exports.StorefrontsFetchWhitelistedMetaFailed = StorefrontsFetchWhitelistedMetaFailed;
var StorefrontsAvailableProductsFailed = (function (_super) {
    tslib_1.__extends(StorefrontsAvailableProductsFailed, _super);
    function StorefrontsAvailableProductsFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch available products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsAvailableProductsFailed';
        Object.setPrototypeOf(_this, StorefrontsAvailableProductsFailed.prototype);
        return _this;
    }
    return StorefrontsAvailableProductsFailed;
}(errors_1.BaseError));
exports.StorefrontsAvailableProductsFailed = StorefrontsAvailableProductsFailed;
var StorefrontsAvailableProductsMetaFailed = (function (_super) {
    tslib_1.__extends(StorefrontsAvailableProductsMetaFailed, _super);
    function StorefrontsAvailableProductsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for available products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsAvailableProductsMetaFailed';
        Object.setPrototypeOf(_this, StorefrontsAvailableProductsMetaFailed.prototype);
        return _this;
    }
    return StorefrontsAvailableProductsMetaFailed;
}(errors_1.BaseError));
exports.StorefrontsAvailableProductsMetaFailed = StorefrontsAvailableProductsMetaFailed;
//# sourceMappingURL=storefronts.js.map