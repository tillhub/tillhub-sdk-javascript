"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var realtime_1 = tslib_1.__importDefault(require("../../src/realtime"));
dotenv.config();
describe('SDK: client: can instantiate SDK client', function () {
    it('TillhubRealtime instantiable', function () {
        var realtime = new realtime_1.default();
        expect(realtime).toBeInstanceOf(realtime_1.default);
        expect(realtime.isInitialized()).toBe(true);
    });
});
//# sourceMappingURL=index.spec.js.map