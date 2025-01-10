Below is an **enhanced and more detailed** `README.md` for your **Discord.js + TypeScript** project, supporting both **prefix** and **slash commands**. It includes comprehensive explanations, best practices, and links to relevant documentation.

---

# Discord Bot — Prefix & Slash Command Hybrid

A **TypeScript**-based Discord bot that supports **prefix commands** (e.g., `!ping`) **and** **slash commands** (e.g., `/ping`). Connects to **SQL** (MySQL, MSSQL, etc.) and **MongoDB** databases, with a **scalable** file/folder structure.  

---

## Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Prerequisites](#prerequisites)  
4. [Project Structure](#project-structure)  
5. [Installation](#installation)  
6. [Configuration](#configuration)  
   1. [Environment Variables](#environment-variables)  
   2. [Database Connections](#database-connections)  
7. [Running the Bot](#running-the-bot)  
   1. [Development](#development)  
   2. [Production Build](#production-build)  
8. [Commands](#commands)  
   1. [Prefix Commands](#prefix-commands)  
   2. [Slash Commands](#slash-commands)  
9. [Adding New Commands](#adding-new-commands)  
   1. [Adding a Prefix Command](#adding-a-prefix-command)  
   2. [Adding a Slash Command](#adding-a-slash-command)  
10. [Linting & Formatting](#linting--formatting)  
11. [License](#license)  
12. [References & Further Reading](#references--further-reading)  

---

## Overview

This repository demonstrates how to build a **Discord bot** in TypeScript with:

- **Prefix commands** (classic approach, triggered by `!commandName`)  
- **Slash commands** (modern approach, triggered by `/commandName`)  
- **SQL** (MySQL/MSSQL/etc.) and **MongoDB** connectivity  
- A dynamic **command loader** architecture, making it easy to add or remove commands.  
- A strongly typed environment, ensuring fewer bugs and better developer tooling.

Whether you’re writing a small custom bot for personal use or a large bot for multiple guilds, this structure can **scale** with your needs.

---

## Features

1. **Prefix Command Support**  
   - Users type `!ping` (or another prefix you define) in text channels to invoke commands.  
   - The prefix-based logic parses raw messages in the `messageCreate` event.

2. **Slash Command Support**  
   - Users type `/ping`, select from an auto-complete list, and see usage hints built into Discord’s UI.  
   - Commands are registered with Discord’s API using `REST` for either guild-level (instant) or global (up to 1 hour to propagate) usage.

3. **Database Connectivity**  
   - Example placeholders for **SQL** (MySQL, MSSQL) using a `connectToSQLServer` function.  
   - Example placeholders for **MongoDB** (e.g., `connectToMongoDB`) which you can adapt for [Mongoose](https://mongoosejs.com/) or another library.

4. **TypeScript**  
   - Strict mode, typed interfaces for commands, improved safety over vanilla JavaScript.

5. **Logging**  
   - Custom log utilities (`debug`, `warn`, `error`, etc.) to keep track of your bot’s actions.

---

## Prerequisites

- **Node.js** (v16.x or higher recommended, since discord.js v14+ requires Node 16.9+).  
- **npm** (6.x or higher) or **Yarn** (1.x or 2.x).  
- **TypeScript** globally (`npm i -g typescript`) is optional but helpful.  
- A **Discord Bot** application token from the [Discord Developer Portal](https://discord.com/developers/applications).

---

## Project Structure

A suggested layout:

```
my-discord-bot/
├─ dev/
│   ├─ database/
│   │   └─ connectToDatabase.ts     // (SQL & MongoDB connection helpers)
│   ├─ Handlers/
│   │   └─ CommandHandler.ts        // (Loads slash & prefix commands dynamically)
│   ├─ Interfaces/
│   │   └─ Command.ts               // (Defines SlashCommand & PrefixCommand interfaces)
│   └─ utils/
│       └─ logs.ts                  // (Custom logging functions)
├─ src/
│   ├─ prefix/
│   │   ├─ fun/
│   │   │   └─ ping.ts              // (Example prefix command)
│   │   └─ moderation/
│   │       └─ ban.ts              // (Another prefix command)
│   ├─ slash/
│   │   ├─ fun/
│   │   │   └─ ping.ts              // (Example slash command)
│   │   └─ admin/
│   │       └─ ban.ts              // (Another slash command)
│   └─ index.ts                     // (Main entry file)
├─ package.json
├─ tsconfig.json
└─ README.md
```

### Notable Folders

- **`dev/`**: Contains your `database` connectors, command loaders (`CommandHandler.ts`), shared `Interfaces/Command.ts`, and utilities like `logs.ts`.  
- **`src/`**: Actual bot code, separated into `prefix` commands and `slash` commands. The main bot logic (`index.ts`) is here.

---

## Installation

1. **Clone** or **download** this repository to your local machine.
2. Navigate to the root folder of the project, then install dependencies:

   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

---

## Configuration

### Environment Variables

- **Discord Bot Token**: Keep your token private, typically in an `.env` file or an environment variable `DISCORD_TOKEN`.  

  ```bash
  # .env (example)
  DISCORD_TOKEN="YOUR-BOT-TOKEN"
  ```

- **Database Credentials** (if using SQL or MongoDB):  

  ```bash
  DB_HOST="localhost"
  DB_USER="root"
  DB_PASS="mysecret"
  DB_NAME="mydb"
  MONGO_URI="mongodb://localhost:27017/myMongoDB"
  ```

Use [dotenv](https://www.npmjs.com/package/dotenv) to load them at runtime if desired.

### Database Connections

In `dev/database/connectToDatabase.ts`, you can adapt:

```ts
export function connectToSQLServer(
  host: string,
  port: number,
  user: string,
  password: string,
  database: string,
  type: string
) {
  // Use mysql2, mssql, etc. to connect
}

export function connectToMongoDB(uri: string) {
  // Use mongodb or mongoose
}
```

Update or replace with your preferred libraries.  

---

## Running the Bot

### Development

1. **Compile & watch**:
   ```bash
   npx tsc --watch
   ```
2. In another terminal, **run** the compiled output:
   ```bash
   node dist/src/index.js
   ```
   Or use [nodemon](https://www.npmjs.com/package/nodemon) to auto-restart:
   ```bash
   nodemon dist/src/index.js
   ```

*(If you have an npm script, e.g. `"dev": "tsc --watch"`, you can do `npm run dev`.)*

### Production Build

1. **Compile** TypeScript into JavaScript:
   ```bash
   npx tsc
   ```
   This generates the `dist/` folder by default (based on `tsconfig.json`).
2. **Run** the compiled output:
   ```bash
   node dist/src/index.js
   ```

---

## Commands

### Prefix Commands

- Located in `src/prefix/<category>/<file>.ts`.  
- Triggered by a message starting with your prefix (e.g. `!ping`).  
- The `messageCreate` event checks for the prefix, parses the command name + arguments, then executes if found in `prefixCommands`.

### Slash Commands

- Located in `src/slash/<category>/<file>.ts`.  
- Registered via [Discord’s Application Command API](https://discordjs.guide/interactions/slash-commands.html#registering-slash-commands).  
- Once registered, users can see them by typing `/` in Discord.  
- The `interactionCreate` event handles them.

---

## Adding New Commands

### Adding a Prefix Command

1. Create a file, e.g. `src/prefix/fun/foo.ts`:
   ```ts
   import { PrefixCommand } from "../../../dev/Interfaces/Command";
   import { Client, Message } from "discord.js";

   const fooCommand: PrefixCommand = {
     name: "foo",
     aliases: ["f"],
     description: "Responds with 'Bar!'",
     async execute(client: Client, message: Message, args: string[]) {
       await message.channel.send("Bar!");
     },
   };

   export default fooCommand;
   ```
2. The command is automatically loaded by the `loadPrefixCommands()` function in `CommandHandler.ts` on startup.

### Adding a Slash Command

1. Create a file, e.g. `src/slash/fun/foo.ts`:
   ```ts
   import { SlashCommandBuilder, ChatInputCommandInteraction, Client } from "discord.js";
   import { SlashCommand } from "../../../dev/Interfaces/Command";

   const fooSlashCommand: SlashCommand = {
     data: new SlashCommandBuilder()
       .setName("foo")
       .setDescription("Replies with 'Bar!'"),

     async execute(client: Client, interaction: ChatInputCommandInteraction) {
       await interaction.reply("Bar!");
     },
   };

   export default fooSlashCommand;
   ```
2. The `loadSlashCommands()` function registers this command with Discord on startup (either guild-based or globally, as configured).

---

## Linting & Formatting

If you use **ESLint** and/or **Prettier**:

1. **ESLint**:  
   ```bash
   npm run lint
   ```
   or
   ```bash
   npx eslint .
   ```
2. **Prettier**:  
   ```bash
   npm run format
   ```
   or
   ```bash
   npx prettier --write .
   ```

*(Adjust scripts in your `package.json` to your preferences.)*

---

## License

This project is released under the [MIT License](LICENSE). You are free to use, modify, and distribute it for personal or commercial use. See the [LICENSE](LICENSE) file for more details.

---

## References & Further Reading

- **Discord.js** Docs:  
  <https://discord.js.org/#/docs/main/stable/general/welcome>  

- **Discord.js Guide** (Community Resource):  
  <https://discordjs.guide/>

- **TypeScript**:  
  <https://www.typescriptlang.org/docs/>

- **Discord Developer Portal** (for creating/managing bots):  
  <https://discord.com/developers/applications>

- **Node.js** Docs:  
  <https://nodejs.org/en/docs/>

- **Databases**:  
  - **MySQL2**: <https://www.npmjs.com/package/mysql2>  
  - **Mongoose** (MongoDB ODM): <https://mongoosejs.com/>  
  - **MSSQL**: <https://www.npmjs.com/package/mssql>

---

**Happy Coding!** If you encounter any issues or have improvements to suggest, feel free to open an issue or create a pull request.
