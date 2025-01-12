// /src/dev/Handlers/PluginHandler.ts

import Plugin from '../Interfaces/Plugin';
import config from '../../../config.json';
import { Client } from 'discord.js';
import { success, warn, error } from '../utils/logs';
import path from 'path';

export async function loadPlugins(client: Client) {
  const pluginNames: string[] = config.plugins || [];
  if (!pluginNames.length) {
    warn(true, 'No plugins declared in config.json');
    return;
  }

  for (const pluginName of pluginNames) {
    try {
      // 1) Dynamically import
      // Resolve the absolute path to the plugin
      const pluginPath = path.resolve(__dirname, '../../plugins', pluginName);
      
      const imported = await import(pluginPath);
      
      // Support both default and named exports
      const plugin: Plugin = imported.default || imported[pluginName];
      
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
