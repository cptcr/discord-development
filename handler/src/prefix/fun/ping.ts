// src/prefix/fun/ping.ts

import { PrefixCommand } from "../../dev/Interfaces/Command";
import { Client, Message } from "discord.js";

const pingCommand: PrefixCommand = {
  name: "ping",
  aliases: ["p"],
  description: "Replies with Pong!",
  async execute(client: Client, message: Message, args: string[]) {
    await message.reply("Pong! 🏓");
  }
};

export default pingCommand;