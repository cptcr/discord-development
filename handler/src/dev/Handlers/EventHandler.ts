import { Client } from 'discord.js';
import { readdirSync, statSync } from 'fs';
import path from 'path';
import  Event  from '../Interfaces/Event';
import { warn, success, error, debug, info } from '../utils/logs';
import config from "../../../config.json";

/**
 * Recursively get all .ts or .js files from a directory (including subfolders).
 */
function getAllEventFiles(dir: string): string[] {
  let results: string[] = [];
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      // Recursively read sub-directories
      results = results.concat(getAllEventFiles(fullPath));
    } else if (item.endsWith('.ts') || item.endsWith('.js')) {
      results.push(fullPath);
    }
  }

  return results;
}

export default async function loadEvents(client: Client): Promise<void> {
  try {
    // Adjust this path if your Events folder is located elsewhere
    const eventsPath = path.join(__dirname, '..', 'Events');
    const eventFiles = getAllEventFiles(eventsPath);

    for (const filePath of eventFiles) {
      // Dynamically import the event
      const { default: event } = (await import(filePath)) as { default: Event };

      // Basic validation
      if (!event?.name || typeof event.execute !== 'function') {
        warn(true, `Skipping invalid event file: ${filePath}`);
        continue;
      }

      if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
        if (config['enabled-default-logs'].startup) debug(true, `Loaded one-time event: ${event.name}`);
      } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
        if (config['enabled-default-logs'].startup) debug(true, `Loaded event: ${event.name}`);
      }
    }

    if (config['enabled-default-logs'].startup) success(true, `Successfully loaded ${eventFiles.length} events (including subfolders)`);
  } catch (err) {
    error(true, `Failed to load events: ${String(err)}`);
  }
}
