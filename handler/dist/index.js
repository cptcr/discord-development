"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const logs_1 = require("./dev/utils/logs");
const CommandHandler_1 = require("./dev/Handlers/CommandHandler");
//import * as config from "../config.json";
const config = require("../config.json");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = __importDefault(require("./database"));
(0, database_1.default)();
/************************************************
 * 1) Create Discord Client
 ************************************************/
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.GuildMembers
    ],
    partials: [
        discord_js_1.Partials.Channel,
        discord_js_1.Partials.Message,
        discord_js_1.Partials.Reaction,
        discord_js_1.Partials.User,
        discord_js_1.Partials.GuildMember,
        discord_js_1.Partials.GuildScheduledEvent,
        discord_js_1.Partials.ThreadMember
    ]
});
const DISCORD_TOKEN = `${process.env.DISCORD_TOKEN}`;
const CLIENT_ID = `${process.env.DISCORD_ID}`;
const GUILD_ID = `${process.env.GUILD_ID}`;
/************************************************
 * 2) Load Prefix & Slash Commands
 ************************************************/
// 2a) Load prefix commands from /src/prefix
(0, CommandHandler_1.loadPrefixCommands)();
// 2b) Load slash commands from /src/slash (and register them)
(0, CommandHandler_1.loadSlashCommands)(CLIENT_ID, GUILD_ID, DISCORD_TOKEN)
    .catch(err => (0, logs_1.error)(true, `Failed to load slash commands: ${err}`));
/************************************************
 * 3) Ready Event
 ************************************************/
client.once("ready", (c) => {
    if (config['enabled-default-logs'].startup)
        (0, logs_1.success)(true, `Logged in as ${c.user.tag}!`);
    c.user.setPresence({
        activities: [{ name: "Slash & Prefix Commands", type: 0 }],
        status: "online"
    });
});
/************************************************
 * 4) Handle Slash Command Interactions
 ************************************************/
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    // Only handle slash commands
    if (!interaction.isChatInputCommand())
        return;
    const command = CommandHandler_1.slashCommands.get(interaction.commandName);
    if (!command) {
        if (config["enabled-default-logs"]["command-registry"])
            (0, logs_1.warn)(true, `Slash command not found: ${interaction.commandName}`);
        return;
    }
    try {
        await command.execute(client, interaction);
    }
    catch (err) {
        (0, logs_1.error)(true, `Error executing slash command "${interaction.commandName}": ${err}`);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: "Error executing slash command!", ephemeral: true });
        }
        else {
            await interaction.reply({ content: "Error executing slash command!", ephemeral: true });
        }
    }
});
/************************************************
 * 5) Handle Prefix Command Messages
 ************************************************/
// e.g., using a "!" prefix
const PREFIX = `${process.env.PREFIX}`;
client.on("messageCreate", async (message) => {
    // Avoid responding to bots or non-prefixed messages
    if (message.author.bot)
        return;
    if (!message.content.startsWith(PREFIX))
        return;
    // Extract command & args
    const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
    const commandName = args.shift()?.toLowerCase();
    if (!commandName)
        return;
    // Lookup the prefix command
    const command = CommandHandler_1.prefixCommands.get(commandName);
    if (!command)
        return;
    try {
        await command.execute(client, message, args);
    }
    catch (err) {
        (0, logs_1.error)(true, `Error executing prefix command "${commandName}": ${err}`);
        await message.reply("There was an error executing that command!");
    }
});
/************************************************
 * 6) Log In the Bot
 ************************************************/
client.login(DISCORD_TOKEN).catch(err => (0, logs_1.error)(true, `Failed to log in: ${err}`));
//# sourceMappingURL=index.js.map