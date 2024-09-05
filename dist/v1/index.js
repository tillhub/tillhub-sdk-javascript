"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentReminders = exports.Promotions = exports.NotificationsUnsubscribe = exports.NotificationsMsu = exports.Configurations = exports.Branches = exports.AuditLogs = exports.analytics = exports.StocksBook = exports.ExportsV1 = exports.SafesLogBook = exports.Tags = exports.Carts = exports.Customers = exports.Vouchers = exports.Balances = exports.Registers = exports.TransactionsLegacy = exports.Transactions = exports.Templates = exports.Products = exports.Pricebooks = exports.Auth = void 0;
var tslib_1 = require("tslib");
var auth_1 = require("./auth");
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return auth_1.Auth; } });
var pricebooks_1 = require("./pricebooks");
Object.defineProperty(exports, "Pricebooks", { enumerable: true, get: function () { return pricebooks_1.Pricebooks; } });
var products_1 = require("./products");
Object.defineProperty(exports, "Products", { enumerable: true, get: function () { return products_1.Products; } });
var templates_1 = require("./templates");
Object.defineProperty(exports, "Templates", { enumerable: true, get: function () { return templates_1.Templates; } });
var transactions_1 = require("./transactions");
Object.defineProperty(exports, "Transactions", { enumerable: true, get: function () { return transactions_1.Transactions; } });
Object.defineProperty(exports, "TransactionsLegacy", { enumerable: true, get: function () { return transactions_1.TransactionsLegacy; } });
var registers_1 = require("./registers");
Object.defineProperty(exports, "Registers", { enumerable: true, get: function () { return registers_1.Registers; } });
var balances_1 = require("./balances");
Object.defineProperty(exports, "Balances", { enumerable: true, get: function () { return balances_1.Balances; } });
var vouchers_1 = require("./vouchers");
Object.defineProperty(exports, "Vouchers", { enumerable: true, get: function () { return vouchers_1.Vouchers; } });
var customers_1 = require("./customers");
Object.defineProperty(exports, "Customers", { enumerable: true, get: function () { return customers_1.Customers; } });
var carts_1 = require("./carts");
Object.defineProperty(exports, "Carts", { enumerable: true, get: function () { return carts_1.Carts; } });
var safes_1 = require("./safes");
Object.defineProperty(exports, "SafesLogBook", { enumerable: true, get: function () { return safes_1.SafesLogBook; } });
var exports_1 = require("./exports");
Object.defineProperty(exports, "ExportsV1", { enumerable: true, get: function () { return exports_1.ExportsV1; } });
var stocks_1 = require("./stocks");
Object.defineProperty(exports, "StocksBook", { enumerable: true, get: function () { return stocks_1.StocksBook; } });
var branches_1 = require("./branches");
Object.defineProperty(exports, "Branches", { enumerable: true, get: function () { return branches_1.Branches; } });
var tags_1 = require("./tags");
Object.defineProperty(exports, "Tags", { enumerable: true, get: function () { return tags_1.Tags; } });
var analytics_1 = tslib_1.__importDefault(require("./analytics"));
exports.analytics = analytics_1.default;
var audit_logs_1 = require("./audit_logs");
Object.defineProperty(exports, "AuditLogs", { enumerable: true, get: function () { return audit_logs_1.AuditLogs; } });
var configurations_1 = require("./configurations");
Object.defineProperty(exports, "Configurations", { enumerable: true, get: function () { return configurations_1.Configurations; } });
var notifications_msu_1 = require("./notifications-msu");
Object.defineProperty(exports, "NotificationsMsu", { enumerable: true, get: function () { return notifications_msu_1.NotificationsMsu; } });
var notifications_unsubscribe_1 = require("./notifications-unsubscribe");
Object.defineProperty(exports, "NotificationsUnsubscribe", { enumerable: true, get: function () { return notifications_unsubscribe_1.NotificationsUnsubscribe; } });
var promotions_1 = require("./promotions");
Object.defineProperty(exports, "Promotions", { enumerable: true, get: function () { return promotions_1.Promotions; } });
var appointment_reminders_1 = require("./appointment_reminders");
Object.defineProperty(exports, "AppointmentReminders", { enumerable: true, get: function () { return appointment_reminders_1.AppointmentReminders; } });
//# sourceMappingURL=index.js.map