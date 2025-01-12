"use strict";
// src/prefix/fun/ping.ts
Object.defineProperty(exports, "__esModule", { value: true });
const pingCommand = {
    name: "ping",
    aliases: ["p"],
    description: "Replies with Pong!",
    async execute(client, message, args) {
        await message.reply("Pong! 🏓");
    }
};
exports.default = pingCommand;
//# sourceMappingURL=ping.js.map