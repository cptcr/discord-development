import { Collection } from "discord.js";
import { SlashCommand, PrefixCommand } from "../Interfaces/Command";
/**
 * Two separate collections:
 * - slashCommands: holds all slash commands (keyed by command name).
 * - prefixCommands: holds all prefix commands (keyed by command name + aliases).
 */
export declare const slashCommands: Collection<string, SlashCommand>;
export declare const prefixCommands: Collection<string, PrefixCommand>;
/**
 * Scans the /src/slash folder for .ts/.js files, imports them as SlashCommand objects,
 * stores them in slashCommands, then optionally registers them with Discord.
 *
 * @param clientId - Your bot's application/client ID (from Developer Portal)
 * @param guildId  - A test guild/server ID (optional). If provided, registers guild commands (instant).
 * @param token    - Bot token for authenticating with Discord's API (REST).
 */
export declare function loadSlashCommands(clientId: string, guildId: string, token: string): Promise<void>;
/**
 * Scans the /src/prefix folder for .ts/.js files, imports them as PrefixCommand objects,
 * and stores them in prefixCommands.
 *
 * This does NOT require REST API calls, since prefix commands are local (message-based).
 */
export declare function loadPrefixCommands(): void;
