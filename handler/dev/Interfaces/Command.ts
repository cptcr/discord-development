// dev/Interfaces/Command.ts

import {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder,
    Message
  } from "discord.js";
  
  /**
   * For Slash Commands:
   * - `data` must be a SlashCommandBuilder defining the command name, description, etc.
   * - `execute(...)` runs your command logic when a user invokes it via `/command`.
   */
  export interface SlashCommand {
    data: SlashCommandBuilder;
    execute: (client: Client, interaction: ChatInputCommandInteraction) => Promise<void>;
  }
  
  /**
   * For Prefix Commands:
   * - `name` is the keyword typed after the prefix (e.g., !ping).
   * - `aliases` are optional alternative keywords.
   * - `execute(...)` runs when someone types the prefix + this command name in chat.
   */
  export interface PrefixCommand {
    name: string;
    description?: string;
    aliases?: string[];
    execute: (client: Client, message: Message, args: string[]) => Promise<void>;
}
  