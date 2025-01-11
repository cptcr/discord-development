import loadChalk from "./chalk";
import Discord from "discord.js";
import webhookEvents from "./webhookEvents";
import config from "../../../config.json";

/**
 * Dynamically load `chalk` for ESM compatibility.
 * @returns {Promise<any>} - The `chalk` instance.
 */
async function getChalk(): Promise<any> {
  return (await loadChalk());
}

/**
 * Logs a debug message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {Promise<void>}
 */
async function debug(date: boolean, message: string): Promise<void> {
  const chalk = await getChalk();
  if (date) {
    console.log(chalk.blue(`[ ${new Date().toISOString()} | DEBUG ] `), message);
  } else {
    console.log(chalk.blue("[ DEBUG ] "), message);
  }

  if (config.webhook["webhook-events"].errors.debug) {
    await webhookEvents("debug", message, date);
  }
}

/**
 * Logs a success message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {Promise<void>}
 */
async function success(date: boolean, message: string): Promise<void> {
  const chalk = await getChalk();
  if (date) {
    console.log(chalk.green(`[ ${new Date().toISOString()} | SUCCESS ] `), message);
  } else {
    console.log(chalk.green("[ SUCCESS ] "), message);
  }

  if (config.webhook["webhook-events"].errors.success) {
    await webhookEvents("success", message, date);
  }
}

/**
 * Logs an error message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {Promise<void>}
 */
async function error(date: boolean, message: string): Promise<void> {
  const chalk = await getChalk();
  if (date) {
    console.log(chalk.red(`[ ${new Date().toISOString()} | ERROR ] `), message);
  } else {
    console.log(chalk.red("[ ERROR ] "), message);
  }

  if (config.webhook["webhook-events"].errors.error) {
    await webhookEvents("error", message, date);
  }
}

/**
 * Logs a fatal message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {Promise<void>}
 */
async function fatal(date: boolean, message: string): Promise<void> {
  const chalk = await getChalk();
  if (date) {
    console.log(chalk.bgRed(`[ ${new Date().toISOString()} | FATAL ] `), message);
  } else {
    console.log(chalk.bgRed("[ FATAL ] "), message);
  }

  if (config.webhook["webhook-events"].errors.fatal) {
    await webhookEvents("fatal", message, date);
  }
}

/**
 * Logs a warning message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {Promise<void>}
 */
async function warn(date: boolean, message: string): Promise<void> {
  const chalk = await getChalk();
  if (date) {
    console.log(chalk.yellow(`[ ${new Date().toISOString()} | WARN ] `), message);
  } else {
    console.log(chalk.yellow("[ WARN ] "), message);
  }

  if (config.webhook["webhook-events"].errors.warn) {
    await webhookEvents("warn", message, date);
  }
}

export { debug, success, error, fatal, warn };
