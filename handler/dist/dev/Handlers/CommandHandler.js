"use strict";
// dev/Handlers/CommandHandler.ts
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefixCommands = exports.slashCommands = void 0;
exports.loadSlashCommands = loadSlashCommands;
exports.loadPrefixCommands = loadPrefixCommands;
const fs_1 = require("fs");
const path = __importStar(require("path"));
const discord_js_1 = require("discord.js");
const logs_1 = require("../utils/logs");
const config_json_1 = __importDefault(require("../../../config.json"));
/**
 * Two separate collections:
 * - slashCommands: holds all slash commands (keyed by command name).
 * - prefixCommands: holds all prefix commands (keyed by command name + aliases).
 */
exports.slashCommands = new discord_js_1.Collection();
exports.prefixCommands = new discord_js_1.Collection();
/**
 * Scans the /src/slash folder for .ts/.js files, imports them as SlashCommand objects,
 * stores them in slashCommands, then optionally registers them with Discord.
 *
 * @param clientId - Your bot's application/client ID (from Developer Portal)
 * @param guildId  - A test guild/server ID (optional). If provided, registers guild commands (instant).
 * @param token    - Bot token for authenticating with Discord's API (REST).
 */
async function loadSlashCommands(clientId, guildId, token) {
    if (config_json_1.default["enabled-default-logs"]["command-registry"]) {
        (0, logs_1.warn)(true, "Loading Slash Commands...");
    }
    // 1) Build the path to /src/slash
    const slashPath = path.join(__dirname, "..", "..", "..", "src", "slash");
    // 2) Recurse over subfolders in /src/slash
    const slashFolders = (0, fs_1.readdirSync)(slashPath);
    const commandsData = []; // For registering commands with Discord
    for (const folder of slashFolders) {
        const folderPath = path.join(slashPath, folder);
        // Gather .ts or .js files
        const slashFiles = (0, fs_1.readdirSync)(folderPath).filter(file => file.endsWith(".ts") || file.endsWith(".js"));
        for (const file of slashFiles) {
            const filePath = path.join(folderPath, file);
            try {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const importedCmd = require(filePath);
                const cmd = importedCmd.default;
                // Validate
                if (cmd?.data) {
                    exports.slashCommands.set(cmd.data.name, cmd);
                    commandsData.push(cmd.data.toJSON());
                    if (config_json_1.default["enabled-default-logs"]["command-registry"])
                        (0, logs_1.success)(true, `Loaded Slash Command: ${cmd.data.name}`);
                }
            }
            catch (err) {
                (0, logs_1.error)(true, `Failed to import slash command at ${filePath}: ${err}`);
            }
        }
    }
    // 3) Register with Discord via REST
    const rest = new discord_js_1.REST({ version: "10" }).setToken(token);
    try {
        if (guildId) {
            // Register slash commands as *Guild* commands (faster updates)
            await rest.put(discord_js_1.Routes.applicationGuildCommands(clientId, guildId), {
                body: commandsData,
            });
            if (config_json_1.default["enabled-default-logs"]["command-registry"])
                (0, logs_1.success)(true, `Registered ${commandsData.length} guild slash commands (Guild: ${guildId}).`);
        }
        else {
            // Register as *Global* commands (can take up to an hour to sync)
            await rest.put(discord_js_1.Routes.applicationCommands(clientId), {
                body: commandsData,
            });
            if (config_json_1.default["enabled-default-logs"]["command-registry"])
                (0, logs_1.success)(true, `Registered ${commandsData.length} global slash commands.`);
        }
    }
    catch (regErr) {
        (0, logs_1.error)(true, `Error registering slash commands: ${regErr}`);
    }
}
/**
 * Scans the /src/prefix folder for .ts/.js files, imports them as PrefixCommand objects,
 * and stores them in prefixCommands.
 *
 * This does NOT require REST API calls, since prefix commands are local (message-based).
 */
function loadPrefixCommands() {
    if (config_json_1.default["enabled-default-logs"]["command-registry"])
        (0, logs_1.warn)(true, "Loading Prefix Commands...");
    // 1) Build the path to /src/prefix
    const prefixPath = path.join(__dirname, "..", "..", "..", "src", "prefix");
    // 2) Recurse over subfolders in /src/prefix
    const prefixFolders = (0, fs_1.readdirSync)(prefixPath);
    for (const folder of prefixFolders) {
        const folderPath = path.join(prefixPath, folder);
        // Gather .ts or .js files
        const prefixFiles = (0, fs_1.readdirSync)(folderPath).filter(file => file.endsWith(".ts") || file.endsWith(".js"));
        for (const file of prefixFiles) {
            const filePath = path.join(folderPath, file);
            try {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const importedCmd = require(filePath);
                const cmd = importedCmd.default;
                // Validate
                if (cmd && cmd.name) {
                    exports.prefixCommands.set(cmd.name, cmd);
                    // If the command has aliases...
                    if (cmd.aliases?.length) {
                        for (const alias of cmd.aliases) {
                            exports.prefixCommands.set(alias, cmd);
                        }
                    }
                    if (config_json_1.default["enabled-default-logs"]["command-registry"])
                        (0, logs_1.success)(true, `Loaded Prefix Command: ${cmd.name}`);
                }
            }
            catch (err) {
                (0, logs_1.error)(true, `Failed to import prefix command at ${filePath}: ${err}`);
            }
        }
    }
}
//# sourceMappingURL=CommandHandler.js.map