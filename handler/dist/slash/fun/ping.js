"use strict";
// src/slash/fun/ping.ts
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const pingCommand = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(client, interaction) {
        await interaction.reply("Pong! 🏓");
    },
};
exports.default = pingCommand;
//# sourceMappingURL=ping.js.map