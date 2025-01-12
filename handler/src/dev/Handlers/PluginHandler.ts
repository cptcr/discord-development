import Plugin from '../Interfaces/Plugin';
import config from '../../../config.json';
import { Client } from 'discord.js';
import { success, warn, error } from '../utils/logs';

export async function loadPlugins(client: Client) {
  const pluginNames: string[] = config.plugins || [];
  if (!pluginNames.length) {
    warn(true, 'No plugins declared in config.json');
    return;
  }

  for (const pluginName of pluginNames) {
    try {
      // 1) Dynamically import
      //    This requires that the plugin is installed in node_modules
      const imported = await import(pluginName);
      const plugin: Plugin = imported.default;

      // 2) Validate
      if (!plugin || typeof plugin.onLoad !== 'function') {
        error(true, `Plugin "${pluginName}" is invalid or missing an onLoad() method.`);
        continue;
      }

      // 3) Run onLoad
      await plugin.onLoad(client, config);

      success(true, `Plugin loaded: ${plugin.name} (v${plugin.version || '?.?.?'})`);

    } catch (err) {
      error(true, `Failed to load plugin "${pluginName}": ${String(err)}`);
    }
  }
}
