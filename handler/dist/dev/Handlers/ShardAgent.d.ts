/**
 * Creates and manages a ShardingManager for a Discord bot.
 * Users can enable or disable sharding through the `enableSharding` parameter.
 *
 * @param {boolean} enableSharding - If true, sharding is enabled. If false, the bot runs without sharding.
 * @param {string} botScript - The path to the bot script file (default: './bot.js').
 * @param {string} token - The bot token used for authentication.
 */
import { ShardingManager } from 'discord.js';
export default function setupSharding(enableSharding: boolean | undefined, botScript: string | "./src/index.ts", token: string): Promise<ShardingManager | undefined>;
