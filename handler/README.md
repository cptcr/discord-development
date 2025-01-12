# TypeScript based discord bot handler
A simple discord bot handler with advanced features and a high customization. <br>
![GitHub Repo stars](https://img.shields.io/github/stars/cptcr/discord-development?style=flat-square) ![GitHub](https://img.shields.io/github/license/cptcr/discord-development?style=flat-square) ![GitHub forks](https://img.shields.io/github/forks/cptcr/discord-development?style=flat-square) ![GitHub issues](https://img.shields.io/github/issues/cptcr/discord-development?style=flat-square) ![GitHub pull requests](https://img.shields.io/github/issues-pr/cptcr/discord-development?style=flat-square) ![GitHub last commit](https://img.shields.io/github/last-commit/cptcr/discord-development?style=flat-square) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/cptcr/discord-development?style=flat-square) ![GitHub top language](https://img.shields.io/github/languages/top/cptcr/discord-development?style=flat-square) ![Discord](https://img.shields.io/discord/1121353922355929129?style=flat-square)
# Features 
- **Slash Command Handler:** Simple command handler so you can use slash commands.
- **Prefix Command Handler:** Simple command handler so you can use prefix commands.
- **Sharding Agent:** Shard your bot to make it more efficient.
- **Dynamic Database Support:** Supports variuos types of databases. Doesnt matter if you use a SQL based database or a MongoDB database.
- **WebHook Events:** Supports WebHook events so you can get notified when something happens.
- **Event Handler:** Build-in event handler so you can build files to respond to events from discord.
- **Scheduled Tasks:** Automate recurring actions.
- **File Cache System**: Store data in files for faster access.
- **Plugin System:** Load plugins to extend the functionality of your bot.

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

[View Full Documentation Here](https://cptcr.cc/discord-development/docs/handler/)

# Credits
- Node.js: 
For the Node.js runtime environment, which allows us to run JavaScript on the server-side. <br>
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
