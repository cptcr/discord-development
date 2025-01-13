import loadChalk from "./chalk";
import Discord from "discord.js";
import webhookEvents from "./webhookEvents";
import config from "../../../config.json";
import writeLog from "../other/write-logs";

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

  writeLog("console", message)

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

  writeLog("console", message)

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

  writeLog("console", message)

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

  writeLog("console", message)

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

  writeLog("console", message)

  if (config.webhook["webhook-events"].errors.warn) {
    await webhookEvents("warn", message, date);
  }
}

/**
 * Logs a info message with optional date.
 * @param date - Whether to include the date in the log.
 * @param message - The message to log.
 */

async function info(date: boolean, message: string): Promise<void> {
    const chalk = await getChalk();
    if (date) {
        console.log(chalk.bgBlue(`[ ${new Date().toISOString()} | INFO ] `), message);
    } else {
        console.log(chalk.bgBlue("[ INFO ] "), message);
    }

    writeLog("console", message)

    if (config.webhook["webhook-events"].errors.info) {
        await webhookEvents("info", message, date);
    }
}

async function custom(date: boolean, type: string, message: string): Promise<void> {
    const chalk = await getChalk();
    if (date) {
        console.log(chalk.magenta(`[ ${new Date().toISOString()} | ${type.toUpperCase()} ] `), message);
    } else {
        console.log(chalk.magenta(`[ ${type.toUpperCase()} ] `), message);
    }

    writeLog("console", message)

    if (config.webhook["webhook-events"].errors["custom-logs"]) {
        await webhookEvents("custom", message, date);
    }
}

export { debug, success, error, fatal, warn, info, custom };
