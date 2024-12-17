"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = exports.Orders = exports.Transactions = exports.analytics = void 0;
var tslib_1 = require("tslib");
var analytics_1 = tslib_1.__importDefault(require("./analytics"));
exports.analytics = analytics_1.default;
var transactions_1 = require("./transactions");
Object.defineProperty(exports, "Transactions", { enumerable: true, get: function () { return transactions_1.Transactions; } });
var orders_1 = require("./orders");
Object.defineProperty(exports, "Orders", { enumerable: true, get: function () { return orders_1.Orders; } });
var products_1 = require("./products");
Object.defineProperty(exports, "Products", { enumerable: true, get: function () { return products_1.Products; } });
//# sourceMappingURL=index.js.map