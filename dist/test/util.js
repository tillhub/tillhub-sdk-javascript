"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.initThInstance = exports.LocalStorageMock = void 0;
var tslib_1 = require("tslib");
var tillhub_js_1 = require("../src/tillhub-js");
var LocalStorageMock = /** @class */ (function () {
    function LocalStorageMock() {
        this.store = {};
    }
    LocalStorageMock.prototype.clear = function () {
        this.store = {};
    };
    LocalStorageMock.prototype.getItem = function (key) {
        return this.store[key] || null;
    };
    LocalStorageMock.prototype.setItem = function (key, value) {
        this.store[key] = value;
    };
    LocalStorageMock.prototype.removeItem = function (key) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete this.store[key];
    };
    return LocalStorageMock;
}());
exports.LocalStorageMock = LocalStorageMock;
/**
 * Instantiate TillhubClient in the tests - reduce boilerplate
 */
exports.initThInstance = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var instance;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                instance = new tillhub_js_1.TillhubClient();
                instance.init(options);
                return [4 /*yield*/, instance.auth.loginUsername({
                        username: user.username,
                        password: user.password
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, instance];
        }
    });
}); };
var user = {
    username: 'test@example.com',
    password: '12345678',
    clientAccount: 'someuuid',
    apiKey: '12345678'
};
if (process.env.SYSTEM_TEST) {
    user.username = (_a = process.env.SYSTEM_TEST_USERNAME) !== null && _a !== void 0 ? _a : user.username;
    user.password = (_b = process.env.SYSTEM_TEST_PASSWORD) !== null && _b !== void 0 ? _b : user.password;
    user.clientAccount = (_c = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID) !== null && _c !== void 0 ? _c : user.clientAccount;
    user.apiKey = (_d = process.env.SYSTEM_TEST_API_KEY) !== null && _d !== void 0 ? _d : user.apiKey;
}
var options = {
    credentials: {
        username: user.username,
        password: user.password
    },
    base: process.env.TILLHUB_BASE
};
//# sourceMappingURL=util.js.map