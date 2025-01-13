import { Client, Guild } from 'discord.js';
import Event from '../../dev/Interfaces/Event';
import writeLog from '../../dev/other/write-logs';

export default {
  name: 'guildCreate',
  once: false,
  execute(client: Client, guild: Guild) {
    // Log whenever your bot joins a new guild
    writeLog('guilds', `Bot joined guild: ${guild.name} (ID: ${guild.id})`);
  },
} as Event;
