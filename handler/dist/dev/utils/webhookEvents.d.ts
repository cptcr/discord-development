/**
 * Log events using a webhook.
 * @param {"fatal" | "success" | "info" | "warn" | "debug" | "error"} type - The type of log.
 * @param {string} message - The log message.
 * @param {boolean} timestamp - Whether to display the timestamp or not.
 * @returns {Promise<void>} - Sends the message to the webhook.
 */
declare function webhookEvents(type: "fatal" | "success" | "info" | "warn" | "debug" | "error", message: string, timestamp?: boolean): Promise<void>;
export default webhookEvents;
