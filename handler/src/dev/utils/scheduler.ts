import nodeCron from 'node-cron';
import { readdirSync, statSync } from 'fs';
import path from 'path';
import { Client } from 'discord.js';
import { Schedule } from '../Interfaces/Schedule';
import { warn, success, error, debug, info } from './logs';
import config from "../../../config.json";

/**
 * Recursively collects all .ts or .js files in the given directory.
 */
function getAllScheduleFiles(dir: string): string[] {
  let results: string[] = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      // Recurse into subdirectories
      results = results.concat(getAllScheduleFiles(fullPath));
    } else if (entry.endsWith('.ts') || entry.endsWith('.js')) {
      results.push(fullPath);
    }
  }

  return results;
}

/**
 * Initialize and register all schedules located in /src/schedules.
 * @param client - The Discord.js client.
 */
export async function initScheduler(client: Client): Promise<void> {
  try {
    // Full path to the /src/schedules directory
    const schedulesDir = path.join(__dirname, '../../schedules');
    const scheduleFiles = getAllScheduleFiles(schedulesDir);

    // If no schedule files are found, just log a warning (optional)
    if (scheduleFiles.length === 0) {
      if (config['enabled-default-logs'].startup) warn(true, 'No schedule files found in /src/schedules');
    }

    for (const filePath of scheduleFiles) {
      // Dynamically import each schedule file
      const { default: schedule } = (await import(filePath)) as { default: Schedule };

      // Validate the schedule object
      if (!schedule || !schedule.name || !schedule.cron || typeof schedule.run !== 'function') {
        warn(true, `Skipping invalid schedule file: ${filePath}`);
        continue;
      }

      // Register the cron job
      nodeCron.schedule(schedule.cron, async () => {
        try {
          debug(true, `Running schedule: ${schedule.name}`);
          await schedule.run(client);
        } catch (err) {
          error(true, `Error in schedule '${schedule.name}': ${String(err)}`);
        }
      });

      // Log that we successfully loaded the schedule
      if (config['enabled-default-logs'].startup) info(true, `Loaded schedule: ${schedule.name}`);
    }

    if (config['enabled-default-logs'].startup) success(true, `Successfully initialized ${scheduleFiles.length} schedules.`);
  } catch (err) {
    error(true, `Failed to initialize schedules: ${String(err)}`);
  }
}
