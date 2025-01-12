// src/index.ts

import { Client, GatewayIntentBits, Partials, Events } from "discord.js";
import { warn, success, error } from "./dev/utils/logs";
import {
  loadSlashCommands,
  loadPrefixCommands,
  slashCommands,
  prefixCommands
} from "./dev/Handlers/CommandHandler";
//import * as config from "../config.json";
const config = require("../config.json");

import env from "dotenv";
env.config();

import database from "./database";
const db = database();

/************************************************
 * 1) Create Discord Client
 ************************************************/
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.Reaction,
    Partials.User,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.ThreadMember
  ]
});

const DISCORD_TOKEN = `${process.env.DISCORD_TOKEN}`;
const CLIENT_ID = `${process.env.DISCORD_ID}`;
const GUILD_ID = `${process.env.GUILD_ID}`; 

/************************************************
 * 2) Load Prefix & Slash Commands
 ************************************************/
// 2a) Load prefix commands from /src/prefix
loadPrefixCommands();

// 2b) Load slash commands from /src/slash (and register them)
loadSlashCommands(CLIENT_ID, GUILD_ID, DISCORD_TOKEN)
  .catch(err => error(true, `Failed to load slash commands: ${err}`));

/************************************************
 * 3) Ready Event
 ************************************************/
client.once("ready", (c) => {
  if (config['enabled-default-logs'].startup) success(true, `Logged in as ${c.user.tag}!`);
  c.user.setPresence({
    activities: [{ name: "Slash & Prefix Commands", type: 0 }],
    status: "online"
  });
});

/************************************************
 * 4) Handle Slash Command Interactions
 ************************************************/
client.on(Events.InteractionCreate, async (interaction) => {
  // Only handle slash commands
  if (!interaction.isChatInputCommand()) return;
  
  const command = slashCommands.get(interaction.commandName);
  if (!command) {
    if (config["enabled-default-logs"]["command-registry"]) warn(true, `Slash command not found: ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(client, interaction);
  } catch (err) {
    error(true, `Error executing slash command "${interaction.commandName}": ${err}`);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: "Error executing slash command!", ephemeral: true });
    } else {
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
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  // Extract command & args
  const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const commandName = args.shift()?.toLowerCase();
  if (!commandName) return;

  // Lookup the prefix command
  const command = prefixCommands.get(commandName);
  if (!command) return;

  try {
    await command.execute(client, message, args);
  } catch (err) {
    error(true, `Error executing prefix command "${commandName}": ${err}`);
    await message.reply("There was an error executing that command!");
  }
});

/************************************************
 * 6) Log In the Bot
 ************************************************/
client.login(DISCORD_TOKEN).catch(err =>
    error(true, `Failed to log in: ${err}`)
);