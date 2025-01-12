// /src/dev/Interfaces/Plugin.ts
import { Client } from 'discord.js';
import config from '../../../config.json';

/**
 * The shape of a plugin. 
 * Each plugin must export an object conforming to this.
 */
export default interface Plugin {
  /** Plugin name (usually matches the package name). */
  name: string;

  /** Plugin version (optional, but nice to have). */
  version?: string;

  /** The author of the plugin */
  author?: string

  /** The GitHub URL to the plugin*/
  github?: string

  /**
   * Runs when the plugin is loaded.
   * Ideal place to register commands, events, or do plugin-specific logic.
   */
  onLoad: (client: Client, botConfig: typeof config) => Promise<void> | void;

  /**
   * Runs if you want to gracefully unload or clean up resources 
   * (optional).
   */
  onUnload?: () => Promise<void> | void;
}