import { Client } from 'discord.js';

/**
 * Represents a scheduled task.
 */
export interface Schedule {
  /**
   * A unique name for the schedule (used for logs and identification).
   */
  name: string;

  /**
   * A valid cron expression (e.g., '0 9 * * *' for 9 AM daily).
   */
  cron: string;

  /**
   * The function to run at each scheduled interval.
   * @param client - The Discord.js client.
   */
  run: (client: Client) => Promise<void> | void;
}
