import * as config from "../../../config.json";

const webhookQueue: (() => Promise<void>)[] = [];
let isProcessingQueue = false;

/**
 * Process the webhook queue, ensuring requests are sent sequentially.
 */
async function processQueue() {
    if (isProcessingQueue) return;
    isProcessingQueue = true;

    while (webhookQueue.length > 0) {
        const task = webhookQueue.shift(); // Get the next task
        if (task) {
            try {
                await task(); // Execute the task
            } catch (error) {
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
async function webhookEvents(
    type: "fatal" | "success" | "info" | "warn" | "debug" | "error",
    message: string,
    timestamp: boolean = false
): Promise<void> {
    if (config.webhook.config.disabled) {
        return;
    }

    if (!config.webhook.config.url || config.webhook.config.url === "") {
        throw new Error("Webhook URL is required or string is empty. (Check config.json)");
    }

    let ts: string = "";
    if (timestamp) {
        ts = new Date().toISOString();
    }

    const colors: Record<string, string> = {
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
        } catch (error) {
            console.error("Error sending webhook:", error);
        }
    });

    processQueue(); // Start processing the queue
}

export default webhookEvents;
