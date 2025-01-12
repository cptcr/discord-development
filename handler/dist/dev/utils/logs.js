"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = debug;
exports.success = success;
exports.error = error;
exports.fatal = fatal;
exports.warn = warn;
exports.info = info;
const chalk_1 = __importDefault(require("./chalk"));
const webhookEvents_1 = __importDefault(require("./webhookEvents"));
const config_json_1 = __importDefault(require("../../../config.json"));
/**
 * Dynamically load `chalk` for ESM compatibility.
 * @returns {Promise<any>} - The `chalk` instance.
 */
async function getChalk() {
    return (await (0, chalk_1.default)());
}
/**
 * Logs a debug message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {Promise<void>}
 */
async function debug(date, message) {
    const chalk = await getChalk();
    if (date) {
        console.log(chalk.blue(`[ ${new Date().toISOString()} | DEBUG ] `), message);
    }
    else {
        console.log(chalk.blue("[ DEBUG ] "), message);
    }
    if (config_json_1.default.webhook["webhook-events"].errors.debug) {
        await (0, webhookEvents_1.default)("debug", message, date);
    }
}
/**
 * Logs a success message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {Promise<void>}
 */
async function success(date, message) {
    const chalk = await getChalk();
    if (date) {
        console.log(chalk.green(`[ ${new Date().toISOString()} | SUCCESS ] `), message);
    }
    else {
        console.log(chalk.green("[ SUCCESS ] "), message);
    }
    if (config_json_1.default.webhook["webhook-events"].errors.success) {
        await (0, webhookEvents_1.default)("success", message, date);
    }
}
/**
 * Logs an error message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {Promise<void>}
 */
async function error(date, message) {
    const chalk = await getChalk();
    if (date) {
        console.log(chalk.red(`[ ${new Date().toISOString()} | ERROR ] `), message);
    }
    else {
        console.log(chalk.red("[ ERROR ] "), message);
    }
    if (config_json_1.default.webhook["webhook-events"].errors.error) {
        await (0, webhookEvents_1.default)("error", message, date);
    }
}
/**
 * Logs a fatal message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {Promise<void>}
 */
async function fatal(date, message) {
    const chalk = await getChalk();
    if (date) {
        console.log(chalk.bgRed(`[ ${new Date().toISOString()} | FATAL ] `), message);
    }
    else {
        console.log(chalk.bgRed("[ FATAL ] "), message);
    }
    if (config_json_1.default.webhook["webhook-events"].errors.fatal) {
        await (0, webhookEvents_1.default)("fatal", message, date);
    }
}
/**
 * Logs a warning message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {Promise<void>}
 */
async function warn(date, message) {
    const chalk = await getChalk();
    if (date) {
        console.log(chalk.yellow(`[ ${new Date().toISOString()} | WARN ] `), message);
    }
    else {
        console.log(chalk.yellow("[ WARN ] "), message);
    }
    if (config_json_1.default.webhook["webhook-events"].errors.warn) {
        await (0, webhookEvents_1.default)("warn", message, date);
    }
}
/**
 * Logs a info message with optional date.
 * @param date - Whether to include the date in the log.
 * @param message - The message to log.
 */
async function info(date, message) {
    const chalk = await getChalk();
    if (date) {
        console.log(chalk.bgBlue(`[ ${new Date().toISOString()} | INFO ] `), message);
    }
    else {
        console.log(chalk.bgBlue("[ INFO ] "), message);
    }
    if (config_json_1.default.webhook["webhook-events"].errors.info) {
        await (0, webhookEvents_1.default)("info", message, date);
    }
}
//# sourceMappingURL=logs.js.map