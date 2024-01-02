"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exports = exports.StaffGroups = exports.Videos = exports.SupportedEvents = exports.WebhookEvents = exports.Webhooks = exports.Warehouses = exports.SafesLogBook = exports.Safes = exports.Tags = exports.LegacySettings = exports.Fiscalization = exports.Favourites = exports.Messages = exports.Print = exports.Notifications = exports.Images = exports.AuditLogs = exports.AuditActions = exports.Staff = exports.Analytics = exports.Orders = exports.StocksBook = exports.Stocks = exports.Invoices = exports.VoucherLogs = exports.Vouchers = exports.Discounts = exports.SuppliersProductsRelation = exports.Suppliers = exports.Customers = exports.ContentTemplates = exports.Contents = exports.Devices = exports.BranchGroups = exports.Branches = exports.Users = exports.InventoryConfiguration = exports.Configurations = exports.PaymentOptions = exports.ExpenseAccounts = exports.Accounts = exports.ProductBranchCustomizations = exports.ProductAddons = exports.ProductAddonGroups = exports.ProductTemplates = exports.ProductGroups = exports.Deliveries = exports.Taxes = exports.Auth = void 0;
exports.ScheduledExports = exports.ShiftPlan = exports.Holidays = exports.Documents = exports.ConsignmentNotes = exports.Services = exports.ServiceCategory = exports.PurchaseOrders = exports.DbBackups = exports.UserPermissionsTemplates = exports.StockTakings = exports.CountingProtocols = exports.Timetracking = exports.Trash = exports.Dependencies = exports.CategoryTrees = exports.Categories = exports.Storefronts = exports.Correspondences = exports.DeviceGroups = exports.Functions = exports.AbocardSystems = exports.VoucherSystems = exports.StaffPermissionsTemplates = exports.Promotions = exports.Processes = exports.Me = exports.Reasons = exports.Data = exports.ProductServiceQuestions = exports.ProductServiceQuestionGroups = void 0;
var auth_1 = require("./auth");
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return auth_1.Auth; } });
var taxes_1 = require("./taxes");
Object.defineProperty(exports, "Taxes", { enumerable: true, get: function () { return taxes_1.Taxes; } });
var deliveries_1 = require("./deliveries");
Object.defineProperty(exports, "Deliveries", { enumerable: true, get: function () { return deliveries_1.Deliveries; } });
var product_groups_1 = require("./product_groups");
Object.defineProperty(exports, "ProductGroups", { enumerable: true, get: function () { return product_groups_1.ProductGroups; } });
var product_templates_1 = require("./product_templates");
Object.defineProperty(exports, "ProductTemplates", { enumerable: true, get: function () { return product_templates_1.ProductTemplates; } });
var product_addon_groups_1 = require("./product_addon_groups");
Object.defineProperty(exports, "ProductAddonGroups", { enumerable: true, get: function () { return product_addon_groups_1.ProductAddonGroups; } });
var product_addons_1 = require("./product_addons");
Object.defineProperty(exports, "ProductAddons", { enumerable: true, get: function () { return product_addons_1.ProductAddons; } });
var product_branch_customizations_1 = require("./product_branch_customizations");
Object.defineProperty(exports, "ProductBranchCustomizations", { enumerable: true, get: function () { return product_branch_customizations_1.ProductBranchCustomizations; } });
var accounts_1 = require("./accounts");
Object.defineProperty(exports, "Accounts", { enumerable: true, get: function () { return accounts_1.Accounts; } });
var expense_accounts_1 = require("./expense_accounts");
Object.defineProperty(exports, "ExpenseAccounts", { enumerable: true, get: function () { return expense_accounts_1.ExpenseAccounts; } });
var payment_options_1 = require("./payment_options");
Object.defineProperty(exports, "PaymentOptions", { enumerable: true, get: function () { return payment_options_1.PaymentOptions; } });
var configurations_1 = require("./configurations");
Object.defineProperty(exports, "Configurations", { enumerable: true, get: function () { return configurations_1.Configurations; } });
var inventory_configuration_1 = require("./inventory_configuration");
Object.defineProperty(exports, "InventoryConfiguration", { enumerable: true, get: function () { return inventory_configuration_1.InventoryConfiguration; } });
var users_1 = require("./users");
Object.defineProperty(exports, "Users", { enumerable: true, get: function () { return users_1.Users; } });
var branches_1 = require("./branches");
Object.defineProperty(exports, "Branches", { enumerable: true, get: function () { return branches_1.Branches; } });
var branch_groups_1 = require("./branch_groups");
Object.defineProperty(exports, "BranchGroups", { enumerable: true, get: function () { return branch_groups_1.BranchGroups; } });
var devices_1 = require("./devices");
Object.defineProperty(exports, "Devices", { enumerable: true, get: function () { return devices_1.Devices; } });
var contents_1 = require("./contents");
Object.defineProperty(exports, "Contents", { enumerable: true, get: function () { return contents_1.Contents; } });
var content_templates_1 = require("./content_templates");
Object.defineProperty(exports, "ContentTemplates", { enumerable: true, get: function () { return content_templates_1.ContentTemplates; } });
var customers_1 = require("./customers");
Object.defineProperty(exports, "Customers", { enumerable: true, get: function () { return customers_1.Customers; } });
var suppliers_1 = require("./suppliers");
Object.defineProperty(exports, "Suppliers", { enumerable: true, get: function () { return suppliers_1.Suppliers; } });
var suppliers_products_relation_1 = require("./suppliers_products_relation");
Object.defineProperty(exports, "SuppliersProductsRelation", { enumerable: true, get: function () { return suppliers_products_relation_1.SuppliersProductsRelation; } });
var vouchers_1 = require("./vouchers");
Object.defineProperty(exports, "Vouchers", { enumerable: true, get: function () { return vouchers_1.Vouchers; } });
Object.defineProperty(exports, "VoucherLogs", { enumerable: true, get: function () { return vouchers_1.VoucherLogs; } });
var invoices_1 = require("./invoices");
Object.defineProperty(exports, "Invoices", { enumerable: true, get: function () { return invoices_1.Invoices; } });
var stocks_1 = require("./stocks");
Object.defineProperty(exports, "Stocks", { enumerable: true, get: function () { return stocks_1.Stocks; } });
Object.defineProperty(exports, "StocksBook", { enumerable: true, get: function () { return stocks_1.StocksBook; } });
var orders_1 = require("./orders");
Object.defineProperty(exports, "Orders", { enumerable: true, get: function () { return orders_1.Orders; } });
var analytics_1 = require("./analytics");
Object.defineProperty(exports, "Analytics", { enumerable: true, get: function () { return analytics_1.Analytics; } });
var staff_1 = require("./staff");
Object.defineProperty(exports, "Staff", { enumerable: true, get: function () { return staff_1.Staff; } });
var audit_actions_1 = require("./audit_actions");
Object.defineProperty(exports, "AuditActions", { enumerable: true, get: function () { return audit_actions_1.AuditActions; } });
var audit_logs_1 = require("./audit_logs");
Object.defineProperty(exports, "AuditLogs", { enumerable: true, get: function () { return audit_logs_1.AuditLogs; } });
var images_1 = require("./images");
Object.defineProperty(exports, "Images", { enumerable: true, get: function () { return images_1.Images; } });
var notifications_1 = require("./notifications");
Object.defineProperty(exports, "Notifications", { enumerable: true, get: function () { return notifications_1.Notifications; } });
var print_1 = require("./print");
Object.defineProperty(exports, "Print", { enumerable: true, get: function () { return print_1.Print; } });
var discounts_1 = require("./discounts");
Object.defineProperty(exports, "Discounts", { enumerable: true, get: function () { return discounts_1.Discounts; } });
var messages_1 = require("./messages");
Object.defineProperty(exports, "Messages", { enumerable: true, get: function () { return messages_1.Messages; } });
var favourites_1 = require("./favourites");
Object.defineProperty(exports, "Favourites", { enumerable: true, get: function () { return favourites_1.Favourites; } });
var fiscalization_1 = require("./fiscalization");
Object.defineProperty(exports, "Fiscalization", { enumerable: true, get: function () { return fiscalization_1.Fiscalization; } });
var settings_old_1 = require("./settings_old");
Object.defineProperty(exports, "LegacySettings", { enumerable: true, get: function () { return settings_old_1.LegacySettings; } });
var tags_1 = require("./tags");
Object.defineProperty(exports, "Tags", { enumerable: true, get: function () { return tags_1.Tags; } });
var safes_1 = require("./safes");
Object.defineProperty(exports, "Safes", { enumerable: true, get: function () { return safes_1.Safes; } });
Object.defineProperty(exports, "SafesLogBook", { enumerable: true, get: function () { return safes_1.SafesLogBook; } });
var warehouses_1 = require("./warehouses");
Object.defineProperty(exports, "Warehouses", { enumerable: true, get: function () { return warehouses_1.Warehouses; } });
var webhooks_1 = require("./webhooks");
Object.defineProperty(exports, "Webhooks", { enumerable: true, get: function () { return webhooks_1.Webhooks; } });
var webhook_events_1 = require("./webhook_events");
Object.defineProperty(exports, "WebhookEvents", { enumerable: true, get: function () { return webhook_events_1.WebhookEvents; } });
var supported_events_1 = require("./supported_events");
Object.defineProperty(exports, "SupportedEvents", { enumerable: true, get: function () { return supported_events_1.SupportedEvents; } });
var videos_1 = require("./videos");
Object.defineProperty(exports, "Videos", { enumerable: true, get: function () { return videos_1.Videos; } });
var staff_groups_1 = require("./staff_groups");
Object.defineProperty(exports, "StaffGroups", { enumerable: true, get: function () { return staff_groups_1.StaffGroups; } });
var exports_1 = require("./exports");
Object.defineProperty(exports, "Exports", { enumerable: true, get: function () { return exports_1.Exports; } });
var data_1 = require("./data");
Object.defineProperty(exports, "Data", { enumerable: true, get: function () { return data_1.Data; } });
var product_service_question_groups_1 = require("./product_service_question_groups");
Object.defineProperty(exports, "ProductServiceQuestionGroups", { enumerable: true, get: function () { return product_service_question_groups_1.ProductServiceQuestionGroups; } });
var product_service_questions_1 = require("./product_service_questions");
Object.defineProperty(exports, "ProductServiceQuestions", { enumerable: true, get: function () { return product_service_questions_1.ProductServiceQuestions; } });
var reasons_1 = require("./reasons");
Object.defineProperty(exports, "Reasons", { enumerable: true, get: function () { return reasons_1.Reasons; } });
var me_1 = require("./me");
Object.defineProperty(exports, "Me", { enumerable: true, get: function () { return me_1.Me; } });
var processes_1 = require("./processes");
Object.defineProperty(exports, "Processes", { enumerable: true, get: function () { return processes_1.Processes; } });
var promotions_1 = require("./promotions");
Object.defineProperty(exports, "Promotions", { enumerable: true, get: function () { return promotions_1.Promotions; } });
var staff_permissions_templates_1 = require("./staff_permissions_templates");
Object.defineProperty(exports, "StaffPermissionsTemplates", { enumerable: true, get: function () { return staff_permissions_templates_1.StaffPermissionsTemplates; } });
var voucher_systems_1 = require("./voucher_systems");
Object.defineProperty(exports, "VoucherSystems", { enumerable: true, get: function () { return voucher_systems_1.VoucherSystems; } });
var abocard_systems_1 = require("./abocard_systems");
Object.defineProperty(exports, "AbocardSystems", { enumerable: true, get: function () { return abocard_systems_1.AbocardSystems; } });
var functions_1 = require("./functions");
Object.defineProperty(exports, "Functions", { enumerable: true, get: function () { return functions_1.Functions; } });
var device_groups_1 = require("./device_groups");
Object.defineProperty(exports, "DeviceGroups", { enumerable: true, get: function () { return device_groups_1.DeviceGroups; } });
var correspondences_1 = require("./correspondences");
Object.defineProperty(exports, "Correspondences", { enumerable: true, get: function () { return correspondences_1.Correspondences; } });
var storefronts_1 = require("./storefronts");
Object.defineProperty(exports, "Storefronts", { enumerable: true, get: function () { return storefronts_1.Storefronts; } });
var categories_1 = require("./categories");
Object.defineProperty(exports, "Categories", { enumerable: true, get: function () { return categories_1.Categories; } });
var category_trees_1 = require("./category_trees");
Object.defineProperty(exports, "CategoryTrees", { enumerable: true, get: function () { return category_trees_1.CategoryTrees; } });
var dependencies_1 = require("./dependencies");
Object.defineProperty(exports, "Dependencies", { enumerable: true, get: function () { return dependencies_1.Dependencies; } });
var trash_1 = require("./trash");
Object.defineProperty(exports, "Trash", { enumerable: true, get: function () { return trash_1.Trash; } });
var timetracking_1 = require("./timetracking");
Object.defineProperty(exports, "Timetracking", { enumerable: true, get: function () { return timetracking_1.Timetracking; } });
var counting_protocols_1 = require("./counting-protocols");
Object.defineProperty(exports, "CountingProtocols", { enumerable: true, get: function () { return counting_protocols_1.CountingProtocols; } });
var stock_takings_1 = require("./stock_takings");
Object.defineProperty(exports, "StockTakings", { enumerable: true, get: function () { return stock_takings_1.StockTakings; } });
var user_permissions_templates_1 = require("./user_permissions_templates");
Object.defineProperty(exports, "UserPermissionsTemplates", { enumerable: true, get: function () { return user_permissions_templates_1.UserPermissionsTemplates; } });
var db_backups_1 = require("./db_backups");
Object.defineProperty(exports, "DbBackups", { enumerable: true, get: function () { return db_backups_1.DbBackups; } });
var purchase_orders_1 = require("./purchase_orders");
Object.defineProperty(exports, "PurchaseOrders", { enumerable: true, get: function () { return purchase_orders_1.PurchaseOrders; } });
var service_category_1 = require("./service_category");
Object.defineProperty(exports, "ServiceCategory", { enumerable: true, get: function () { return service_category_1.ServiceCategory; } });
var services_1 = require("./services");
Object.defineProperty(exports, "Services", { enumerable: true, get: function () { return services_1.Services; } });
var consignment_notes_1 = require("./consignment_notes");
Object.defineProperty(exports, "ConsignmentNotes", { enumerable: true, get: function () { return consignment_notes_1.ConsignmentNotes; } });
var documents_1 = require("./documents");
Object.defineProperty(exports, "Documents", { enumerable: true, get: function () { return documents_1.Documents; } });
var holidays_1 = require("./holidays");
Object.defineProperty(exports, "Holidays", { enumerable: true, get: function () { return holidays_1.Holidays; } });
var shift_plan_1 = require("./shift_plan");
Object.defineProperty(exports, "ShiftPlan", { enumerable: true, get: function () { return shift_plan_1.ShiftPlan; } });
var scheduled_exports_1 = require("./scheduled_exports");
Object.defineProperty(exports, "ScheduledExports", { enumerable: true, get: function () { return scheduled_exports_1.ScheduledExports; } });
//# sourceMappingURL=index.js.map