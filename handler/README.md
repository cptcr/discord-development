# TypeScript based discord bot handler
A simple discord bot handler with advanced features and a high customization. <br>
![GitHub Repo stars](https://img.shields.io/github/stars/cptcr/discord-development?style=flat-square) ![GitHub](https://img.shields.io/github/license/cptcr/discord-development?style=flat-square) ![GitHub forks](https://img.shields.io/github/forks/cptcr/discord-development?style=flat-square) ![GitHub issues](https://img.shields.io/github/issues/cptcr/discord-development?style=flat-square) ![GitHub pull requests](https://img.shields.io/github/issues-pr/cptcr/discord-development?style=flat-square) ![GitHub last commit](https://img.shields.io/github/last-commit/cptcr/discord-development?style=flat-square) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/cptcr/discord-development?style=flat-square) ![GitHub top language](https://img.shields.io/github/languages/top/cptcr/discord-development?style=flat-square) ![Discord](https://img.shields.io/discord/1121353922355929129?style=flat-square)
# Features 
- **Slash Command Handler:** Simple command handler so you can use slash commands.
- **Prefix Command Handler:** Simple command handler so you can use prefix commands.
- **Sharding Agent:** Shard your bot to make it more efficient.
- **Dynamic Database Support:** Supports variuos types of databases. Doesnt matter if you use a SQL based database or a MongoDB database.
- **WebHook Events:** Supports WebHook events so you can get notified when something happens.

# Installation
1. Clone the repository.
```bash
git clone https://github.com/cptcr/discord-development/tree/main/handler.git
```

2. Install the required packages and dependencies.
```bash
npm i
```

3. Configure the code so it knows how to work. (Read more below)
4. Run the bot.
```bash
npx ts-node src/shard.ts
```
or:
```bash
npm run start
```

# Configuration
## Events and Logs
File: config.json
```json
{
    "enabled-default-logs": {
        "command-registry": true, // Enable command registry logs
        "startup": true, // Enable startup logs
        "database-connection": true , // Enable database connection logs
    },
    "webhook": {
        "config": {
            "disabled": false, // Disable webhook events
            "url": "https://discord.com/api/webhooks/", // Your webhook url
            "roleId": null , // Role ID to ping when a event happens (nullable)
        },
        "webhook-events": {
            "command-registry": true, // Enable command registry webhook events
            "startup": true, // Enable startup webhook events
            "database-connection": true, // Enable database connection webhook events
            "errors": {
                "fatal": true, // Enable fatal error webhook events
                "debug": true, // Enable debug error webhook events
                "error": true, // Enable error webhook events
                "success": true, // Enable success webhook events
                "warn": true, // Enable warn webhook events
                "info": true // Enable info webhook events
            }
        }
    }
    
}
```
## Bot Configuration and Database Configuration
File: .env
```python
#=============================
#        DISCORD BOT
#=============================
# Discord bot credentials and settings
export DISCORD_TOKEN = "";   
# Your Discord bot token (required to authenticate with the Discord API)
export DISCORD_ID = "";      
# Bot ID (unique identifier for your bot)
export PREFIX = "";          
# Prefix for text-based bot commands (e.g., "!", "?")
export GUILD_ID = ;          
# Guild (server) ID for faster slash command updates

#=============================
#    DATABASE CONFIGURATION
#=============================
# Type of database to connect to. Supported values:
#  - mysql
#  - postgres
#  - mariadb
#  - sqlite
#  - mssql
#  - mongoose (for MongoDB)
export DB_TYPE = "mongoose";  
# Specify the database type here (e.g., mysql, mongoose)

#=============================
#       SQL DATABASE
#=============================
# SQL database connection details (only required if DB_TYPE is a SQL-based database)
export DB_HOST = "";         
# Database server hostname (IP or domain)
export DB_USER = "";         
# Database username
export DB_PASS = "";         
# Database password
export DB_NAME = "";         
# Database name to connect to
export DB_PORT = "";         
# Port number for the database server (default ports vary by DB type)

#=============================
#      MONGODB DATABASE
#=============================
# MongoDB connection details (only required if DB_TYPE is "mongoose")
export MONGO_HOST = "";      
# MongoDB connection string (e.g., mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>) Warning: This may or may not be different if you use a self hosted MongoDB server
```

# Documentation
## Deploying commands (slash)
Directory: src/slash (Create files in subfolders e.g. src/slash/fun/yourcommand.js)

Example code:
```ts
// src/slash/fun/ping.ts

// Import required modules from discord.js
import { SlashCommandBuilder, ChatInputCommandInteraction, Client } from "discord.js";
// Import SlashCommand Interface to build a command (required)
import { SlashCommand } from "../../dev/Interfaces/Command.js";

// Define the command
const pingCommand: SlashCommand = {
  // Command Data (required)
  data: new SlashCommandBuilder() // Discord.js SlashCommandBuilder to build a command and return json data for the discord api
  .setName("ping") // The command name
  .setDescription("Replies with Pong!"), // The command description

  // Execute function (required)
  async execute(client: Client, interaction: ChatInputCommandInteraction) {
    // Handle the command logic
    await interaction.reply("Pong! 🏓");
  },
};

// MUST BE EXPORTED AS DEFAULT
export default pingCommand;
```
## Deploying commands (prefix)
Directory: src/prefix (Create files in subfolders e.g. src/prefix/fun/)
```ts
// src/prefix/fun/ping.ts

// Import PrefixCommand Interface to build a command (required)
import { PrefixCommand } from "../../dev/Interfaces/Command";
// Import required modules from discord.js
import { Client, Message } from "discord.js";

// Define the command
const pingCommand: PrefixCommand = {
  name: "ping", // The command name (required)
  aliases: ["p"], // The command aliases (?ping and ?p will work and return the same result) (required)
  description: "Replies with Pong!", // The command description (required)

  // Execute function (required)
  async execute(client: Client, message: Message, args: string[]) {

    // Handle the command logic
    await message.reply("Pong! 🏓");
  }
};

// MUST BE EXPORTED AS DEFAULT
export default pingCommand;
```

## Database Configuration
Directory: src
File: index.ts
Line: 17-18

If you use mongodb:
```ts
import database from "database";
database();
```
The database will now load. No additional configuration is required. <br>
If you use a sql based database:
```ts
import database from "database";
const db = database();
```
This will return the database object which is declared as the variable "db" to be used in your code.

# Credits
- Node.js: 
For the Node.js runtime environment, which allows us to run JavaScript on the server-side.
https://nodejs.org/
- Discord.js: 
For handling the Discord API easyli. <br>
https://discord.js.org
- Mongoose: 
For handling the MongoDB database. <br>
https://mongoosejs.com/
- Sequelize: 
For handling the support of multiple databases. <br>
https://sequelize.org/
- TypeScript:
For the type checking and the compilation of the code. <br>
https://www.typescriptlang.org/
- Chalk:
For the colorful console output. <br>
https://github.com/chalk/chalk
- Inquirer:
For the user input. <br>
https://github.com/SBoudrias/Inquirer.js
- Dotenv:
For the environment variables. <br>
https://github.com/motdotcom/dotenv
- Pterodactyl Eggs:
For building an egg which will install this repository on your server. <br>
https://github.com/pterodactyl/panel/tree/1.0-develop/database/Seeders/eggs 

# License
This project is licensed under the Apache 2.0 License which is a permissive free software license written by the Apache Software Foundation. <br>
The license allows users to freely use, modify, and distribute the software. <br>
https://www.apache.org/licenses/LICENSE-2.0