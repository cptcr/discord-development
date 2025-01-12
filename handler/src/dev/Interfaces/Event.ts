import { Client } from 'discord.js';

export default interface Event {
  name: string;
  once?: boolean;
  execute: (client: Client, ...args: any[]) => void;
}