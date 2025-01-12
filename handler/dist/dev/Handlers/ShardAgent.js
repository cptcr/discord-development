"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupSharding;
/**
 * Creates and manages a ShardingManager for a Discord bot.
 * Users can enable or disable sharding through the `enableSharding` parameter.
 *
 * @param {boolean} enableSharding - If true, sharding is enabled. If false, the bot runs without sharding.
 * @param {string} botScript - The path to the bot script file (default: './bot.js').
 * @param {string} token - The bot token used for authentication.
 */
const discord_js_1 = require("discord.js");
const logs_1 = require("../utils/logs");
const config_json_1 = __importDefault(require("../../../config.json"));
async function setupSharding(enableSharding = true, botScript, token) {
    if (!token) {
        (0, logs_1.error)(true, 'Bot token is required to initialize the ShardingManager.');
        (0, logs_1.fatal)(true, "Bot token is missing. At: /dev/Handler/ShardAgent.ts");
    }
    if (!enableSharding) {
        if (config_json_1.default['enabled-default-logs'].startup)
            (0, logs_1.debug)(true, 'Sharding is disabled. The bot will run without sharding.');
        return;
    }
    try {
        const manager = new discord_js_1.ShardingManager(botScript, {
            totalShards: 'auto',
            token: token,
        });
        // Log events from the ShardingManager
        manager.on('shardCreate', (shard) => {
            if (config_json_1.default['enabled-default-logs'].startup)
                (0, logs_1.success)(true, `Shard ${shard.id} created.`);
        });
        if (config_json_1.default['enabled-default-logs'].startup)
            (0, logs_1.debug)(true, 'Spawning shards...');
        await manager.spawn();
        if (config_json_1.default['enabled-default-logs'].startup)
            (0, logs_1.success)(true, 'All shards spawned successfully.');
        return manager;
    }
    catch (err) {
        (0, logs_1.error)(true, 'An error occurred while setting up the ShardingManager.');
        (0, logs_1.fatal)(true, `\n${err}`);
        throw err;
    }
}
//# sourceMappingURL=ShardAgent.js.map