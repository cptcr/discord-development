/**
 * Logs a debug message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {Promise<void>}
 */
declare function debug(date: boolean, message: string): Promise<void>;
/**
 * Logs a success message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {Promise<void>}
 */
declare function success(date: boolean, message: string): Promise<void>;
/**
 * Logs an error message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {Promise<void>}
 */
declare function error(date: boolean, message: string): Promise<void>;
/**
 * Logs a fatal message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {Promise<void>}
 */
declare function fatal(date: boolean, message: string): Promise<void>;
/**
 * Logs a warning message with optional date.
 * @param {boolean} date - Whether to include the date in the log.
 * @param {string} message - The message to log.
 * @returns {Promise<void>}
 */
declare function warn(date: boolean, message: string): Promise<void>;
/**
 * Logs a info message with optional date.
 * @param date - Whether to include the date in the log.
 * @param message - The message to log.
 */
declare function info(date: boolean, message: string): Promise<void>;
export { debug, success, error, fatal, warn, info };
