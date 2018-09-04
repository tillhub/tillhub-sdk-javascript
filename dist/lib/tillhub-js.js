var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import 'core-js/fn/array.find'
// import * as EventEmitter from 'events'
import { AuthTypes } from './v0/Auth';
import { Transactions } from './v0/Transactions';
import { Client } from './Client';
import * as errors from './Errors';
import v0 from './v0';
import v1 from './v1';
export { v0, v1 };
export var defaultOptions = {
    base: 'https://api.tillhub.com'
};
var TillhubClient = /** @class */ (function () {
    function TillhubClient(options) {
        // super()
        if (!options)
            return;
        this.handleOptions(options);
    }
    /**
     * Initialise the SDK instance by authenticating the client
     *
     */
    TillhubClient.prototype.init = function (options) {
        if (options === void 0) { options = defaultOptions; }
        this.handleOptions(options);
        var clientOptions = {
            headers: {}
        };
        this.auth = new v1.Auth({ base: options ? options.base : defaultOptions.base });
        this.http = Client.getInstance(clientOptions).setDefaults(clientOptions);
    };
    TillhubClient.prototype.handleOptions = function (options) {
        this.options = options;
        this.options.base = this.options.base || 'https://api.tillhub.com';
        if (options.credentials) {
            var authOptions = {
                type: AuthTypes.username,
                credentials: options.credentials,
                base: this.options.base
            };
            this.auth = new v1.Auth(authOptions);
        }
    };
    /**
     * Create an authenticated transactions instance
     *
     */
    TillhubClient.prototype.transactions = function () {
        if (!this.options || !this.options.base || !this.http || !this.auth) {
            throw new errors.UninstantiatedClient();
        }
        return new Transactions({ user: this.auth.user, base: this.options.base }, this.http);
    };
    return TillhubClient;
}());
export { TillhubClient };
var Tillhub = /** @class */ (function (_super) {
    __extends(Tillhub, _super);
    function Tillhub(options) {
        return _super.call(this, options) || this;
    }
    Tillhub.getInstance = function (options) {
        if (!Tillhub.instance) {
            Tillhub.instance = new Tillhub(options);
        }
        return Tillhub.instance;
    };
    return Tillhub;
}(TillhubClient));
export { Tillhub };
export default Tillhub.getInstance({ base: defaultOptions.base });
//# sourceMappingURL=tillhub-js.js.map