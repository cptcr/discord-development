// src/slash/fun/ping.ts

import { SlashCommandBuilder, ChatInputCommandInteraction, Client } from "discord.js";
import { SlashCommand } from "../../dev/Interfaces/Command.js";

const pingCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),

  async execute(client: Client, interaction: ChatInputCommandInteraction) {
    await interaction.reply("Pong! 🏓");
  },
};

export default pingCommand;