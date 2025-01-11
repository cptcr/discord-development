// dev/Handlers/CommandHandler.ts

import { readdirSync } from "fs";
import * as path from "path";
import { Collection, REST, Routes } from "discord.js";
import { SlashCommand, PrefixCommand } from "../Interfaces/Command";
import { warn, success, error, debug } from "../utils/logs";
import config from "../../../config.json";

/**
 * Two separate collections:
 * - slashCommands: holds all slash commands (keyed by command name).
 * - prefixCommands: holds all prefix commands (keyed by command name + aliases).
 */
export const slashCommands = new Collection<string, SlashCommand>();
export const prefixCommands = new Collection<string, PrefixCommand>();

/**
 * Scans the /src/slash folder for .ts/.js files, imports them as SlashCommand objects,
 * stores them in slashCommands, then optionally registers them with Discord.
 *
 * @param clientId - Your bot's application/client ID (from Developer Portal)
 * @param guildId  - A test guild/server ID (optional). If provided, registers guild commands (instant).
 * @param token    - Bot token for authenticating with Discord's API (REST).
 */
export async function loadSlashCommands(clientId: string, guildId: string, token: string) {
  if (config["enabled-default-logs"]["command-registry"]) {
    warn(true, "Loading Slash Commands...");
  }

  // 1) Build the path to /src/slash
  const slashPath = path.join(__dirname, "..", "..", "..", "src", "slash");

  // 2) Recurse over subfolders in /src/slash
  const slashFolders = readdirSync(slashPath);
  const commandsData = []; // For registering commands with Discord

  for (const folder of slashFolders) {
    const folderPath = path.join(slashPath, folder);

    // Gather .ts or .js files
    const slashFiles = readdirSync(folderPath).filter(file =>
      file.endsWith(".ts") || file.endsWith(".js")
    );

    for (const file of slashFiles) {
      const filePath = path.join(folderPath, file);

      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const importedCmd: { default: SlashCommand } = require(filePath);
        const cmd = importedCmd.default;

        // Validate
        if (cmd?.data) {
          slashCommands.set(cmd.data.name, cmd);
          commandsData.push(cmd.data.toJSON());
          if (config["enabled-default-logs"]["command-registry"]) success(true, `Loaded Slash Command: ${cmd.data.name}`);
        }        
      } catch (err) {
        error(true, `Failed to import slash command at ${filePath}: ${err}`);
      }
    }
  }

  // 3) Register with Discord via REST
  const rest = new REST({ version: "10" }).setToken(token);
  try {
    if (guildId) {
      // Register slash commands as *Guild* commands (faster updates)
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commandsData,
      });
      if (config["enabled-default-logs"]["command-registry"]) success(true, `Registered ${commandsData.length} guild slash commands (Guild: ${guildId}).`);
    } else {
      // Register as *Global* commands (can take up to an hour to sync)
      await rest.put(Routes.applicationCommands(clientId), {
        body: commandsData,
      });
      if (config["enabled-default-logs"]["command-registry"]) success(true, `Registered ${commandsData.length} global slash commands.`);
    }
  } catch (regErr) {
    error(true, `Error registering slash commands: ${regErr}`);
  }
}

/**
 * Scans the /src/prefix folder for .ts/.js files, imports them as PrefixCommand objects,
 * and stores them in prefixCommands. 
 *
 * This does NOT require REST API calls, since prefix commands are local (message-based).
 */
export function loadPrefixCommands() {
  if (config["enabled-default-logs"]["command-registry"]) warn(true, "Loading Prefix Commands...");

  // 1) Build the path to /src/prefix
  const prefixPath = path.join(__dirname, "..", "..", "..", "src", "prefix");

  // 2) Recurse over subfolders in /src/prefix
  const prefixFolders = readdirSync(prefixPath);

  for (const folder of prefixFolders) {
    const folderPath = path.join(prefixPath, folder);

    // Gather .ts or .js files
    const prefixFiles = readdirSync(folderPath).filter(file =>
      file.endsWith(".ts") || file.endsWith(".js")
    );

    for (const file of prefixFiles) {
      const filePath = path.join(folderPath, file);

      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const importedCmd: { default: PrefixCommand } = require(filePath);
        const cmd = importedCmd.default;

        // Validate
        if (cmd && cmd.name) {
          prefixCommands.set(cmd.name, cmd);
          // If the command has aliases...
          if (cmd.aliases?.length) {
            for (const alias of cmd.aliases) {
              prefixCommands.set(alias, cmd);
            }
          }
          if (config["enabled-default-logs"]["command-registry"]) success(true, `Loaded Prefix Command: ${cmd.name}`);
        }        
      } catch (err) {
        error(true, `Failed to import prefix command at ${filePath}: ${err}`);
      }
    }
  }
}

