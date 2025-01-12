// Import the Schedule Interface
import { Schedule } from '../dev/Interfaces/Schedule';
// Import Discord Modules (required: Client)
import { Client } from 'discord.js';

export default {
  name: 'dailyReminder', // Name of the schedule
  cron: '0 9 * * *', // runs every day at 9:00 AM server time 
  async run(client: Client) {
    // Handle the logic here
  },
} as Schedule;
