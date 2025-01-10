import chalk from 'chalk';

/**
 * Logs a debug message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {void} - Returns a Promise since its an async function
 */
async function debug(date: boolean, message: string): Promise<void> {
    if (date) {
        console.log(chalk.blue(`[ ${new Date().toISOString()} | DEBUG ] `), message);
    } else {
        console.log(chalk.blue("[ DEBUG ] ", message));
    }
}

/**
 * Logs a success message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {void} - Returns a Promise since its an async function
 */
async function success(date: boolean, message: string): Promise<void> {
    if (date) {
        console.log(chalk.green(`[ ${new Date().toISOString()} | SUCCESS ] `), message);
    } else {
        console.log(chalk.green("[ SUCCESS ] ", message));
    }
}

/**
 * Logs an error message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {void} - Returns a Promise since its an async function
 */
async function error(date: boolean, message: string): Promise<void> {
    if (date) {
        console.log(chalk.red(`[ ${new Date().toISOString()} | ERROR ] `), message);
    } else {
        console.log(chalk.red("[ ERROR ] ", message));
    }
}

/**
 * Logs a fatal message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {void} - Returns a Promise since its an async function
 */
async function fatal(date: boolean, message: string): Promise<void> {
    if (date) {
        console.log(chalk.bgRed(`[ ${new Date().toISOString()} | FATAL ] `), message);
    } else {
        console.log(chalk.bgRed("[ FATAL ] ", message));
    }
}

/**
 * Logs a warning message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {void} - Returns a Promise since its an async function
 */
async function warn(date: boolean, message: string): Promise<void> {
    if (date) {
        console.log(chalk.yellow(`[ ${new Date().toISOString()} | WARN ] `), message);
    } else {
        console.log(chalk.yellow("[ WARN ] ", message));
    }
}

export { debug, success, error, fatal, warn };