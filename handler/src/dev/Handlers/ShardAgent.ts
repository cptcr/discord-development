/**
 * Creates and manages a ShardingManager for a Discord bot.
 * Users can enable or disable sharding through the `enableSharding` parameter.
 *
 * @param {boolean} enableSharding - If true, sharding is enabled. If false, the bot runs without sharding.
 * @param {string} botScript - The path to the bot script file (default: './bot.js').
 * @param {string} token - The bot token used for authentication.
 * @param {"auto" | number | undefined} shards - The number of shards to use. If set to "auto", the number of shards is automatically calculated. If set to a number, the number of shards is set to that number. If set to undefined, the number of shards is not set.
 * @returns {ShardingManager} - The created ShardingManager instance.
 */
import { ShardingManager } from 'discord.js';
import { warn, error, debug, success, fatal, info } from '../utils/logs';
import config from "../../../config.json";

export default async function setupSharding(enableSharding: boolean, botScript: string | "../../src/index.ts", token: string, shards: "auto" | number | undefined) {
    if (!token) {
        error(true, 'Bot token is required to initialize the ShardingManager.');
        fatal(true, "Bot token is missing. At: /dev/Handler/ShardAgent.ts");
    }

    if (!enableSharding) {
        if (config['enabled-default-logs'].startup) debug(true, 'Sharding is disabled. The bot will run without sharding.');
        require("../../index");
        return;
    }

    try {
        const manager = new ShardingManager(botScript, {
            totalShards: shards,
            token: token,
        });

        // Log events from the ShardingManager
        manager.on('shardCreate', (shard) => {
            if (config['enabled-default-logs'].startup) success(true, `Shard ${shard.id} created.`);
        });

        if (config['enabled-default-logs'].startup) debug(true, 'Spawning shards...');
        await manager.spawn();
        if (config['enabled-default-logs'].startup) success(true, 'All shards spawned successfully.');

        return manager;
    } catch (err) {
        error(true, 'An error occurred while setting up the ShardingManager.');
        fatal(true, `\n${err}`);
        throw err;
    }
}
