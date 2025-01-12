"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const config = __importStar(require("../../../config.json"));
const webhookQueue = [];
let isProcessingQueue = false;
/**
 * Process the webhook queue, ensuring requests are sent sequentially.
 */
async function processQueue() {
    if (isProcessingQueue)
        return;
    isProcessingQueue = true;
    while (webhookQueue.length > 0) {
        const task = webhookQueue.shift(); // Get the next task
        if (task) {
            try {
                await task(); // Execute the task
            }
            catch (error) {
                console.error("Error processing webhook task:", error);
            }
        }
        // Add a delay between requests to avoid rate limits
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
    }
    isProcessingQueue = false;
}
/**
 * Log events using a webhook.
 * @param {"fatal" | "success" | "info" | "warn" | "debug" | "error"} type - The type of log.
 * @param {string} message - The log message.
 * @param {boolean} timestamp - Whether to display the timestamp or not.
 * @returns {Promise<void>} - Sends the message to the webhook.
 */
async function webhookEvents(type, message, timestamp = false) {
    if (config.webhook.config.disabled) {
        return;
    }
    if (!config.webhook.config.url || config.webhook.config.url === "") {
        throw new Error("Webhook URL is required or string is empty. (Check config.json)");
    }
    let ts = "";
    if (timestamp) {
        ts = new Date().toISOString();
    }
    const colors = {
        fatal: "#8B0000", // DarkRed
        success: "#00FF00", // Green
        info: "#0000FF", // Blue
        warn: "#FFFF00", // Yellow
        debug: "#808080", // Grey
        error: "#FF4500", // Red
    };
    const payload = {
        username: "Webhook Logger", // Customize this as needed
        content: config.webhook.config.roleId ? `<@&${config.webhook.config.roleId}>` : undefined,
        embeds: [
            {
                title: `[${type.toUpperCase()}]`,
                description: message,
                color: parseInt(colors[type].replace("#", ""), 16), // Convert hex to integer
                footer: timestamp ? { text: `Log created at: ${ts}` } : undefined,
            },
        ],
    };
    webhookQueue.push(async () => {
        try {
            const response = await fetch(config.webhook.config.url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error(`Failed to send webhook: ${response.status} ${response.statusText}`);
            }
        }
        catch (error) {
            console.error("Error sending webhook:", error);
        }
    });
    processQueue(); // Start processing the queue
}
exports.default = webhookEvents;
//# sourceMappingURL=webhookEvents.js.map