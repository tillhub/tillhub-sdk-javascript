"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
dotenv.config();
var errors = tslib_1.__importStar(require("../src/errors"));
var vouchers_1 = require("../src/v0/vouchers");
describe('SDK: errors', function () {
    it('can instantiate error', function () {
        expect(new vouchers_1.VoucherFetchFailed()).toBeDefined();
        expect(new errors.BaseError('some new eror')).toBeDefined();
    });
    it('can instantiate error with message', function () {
        var err = new vouchers_1.VoucherFetchFailed();
        expect(err).toHaveProperty('name');
        expect(typeof err.name).toBe('string');
        expect(err).toHaveProperty('message');
        expect(typeof err.message).toBe('string');
        expect(err.name).toBe('VoucherFetchFailed');
        var err2 = new vouchers_1.VoucherFetchFailed('something');
        expect(err2).toHaveProperty('name');
        expect(typeof err2.name).toBe('string');
        expect(err2).toHaveProperty('message');
        expect(typeof err2.message).toBe('string');
        expect(err2.message).toBe('something');
        expect(err2.name).toBe(err.name);
        expect(err2.message).not.toBe(err.message);
    });
    it('can instantiate error with injected properties', function () {
        var props = { some: 'property' };
        var err = new vouchers_1.VoucherFetchFailed(undefined, props);
        expect(err.properties).toBeDefined();
        expect(err.properties).toEqual(props);
    });
});
//# sourceMappingURL=errors.test.js.map