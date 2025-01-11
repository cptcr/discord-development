# TypeScript based discord bot
This is a TypeScript based discord bot. It uses discord.js library to interact with the Discord API. This is just the base for building a bot in TypeScript.
The code has many comments to explain what each part does. It also includes a basic command structure to provide a guide to build your own commands.

# Features
*   **Command Structure**: The code includes a basic command structure to provide a guide to build your own commands.
*   **Event Handling**: The code includes event handling for events like MessageCreate or something.
*   **Command Handling**: The code includes command handling to execute commands when they are invoked.
*   **Error Handling**: The code includes error handling to catch and handle errors that may occur during
*   **Prefix Commands**: The code has a handler to handle prefix commands (discord might remove this in the future).
*   **Intent validations**: This base has validators so you will know when your bot is attempting to use an intent that is not enabled in the discord developer portal.
*   **Database Handling**: The code can handle almost any type of database. It supports MongoDB and most SQL based database systems using sequelize.

# Examples
## Database Connection
Handler file: [/dev/database/connnectToDatabase.ts]() <br>
**SQL based databases:** <br>
Creates a connection to any SQL-based database server and returns the connection instance.
Supports MySQL, PostgreSQL, MariaDB, SQLite, and MSSQL.
```ts
import { connectToSQLServer } from "../dev/database/connectToDatabase";

const dbconfig = {
    host: "database.server.com", // The domain or IPv4 the server runs on
    port: 6969, // The port the server runs on
    user: "", // The database username
    password: "", // The database password
    database: "" // The database name
}

const database = connectToSQLServer(dbconfig.host, dbconfig.port, dbconfig.user, dbconfig.password, dbconfig.database, "mysql"); 
```

**MongoDB:** <br>
Creates a connection to a MongoDB server. (Requires a MongoDB URI).
```ts
import { connectToSQLServer } from "../dev/database/connectToDatabase";

const mongodbURI = "mongosrv://blabla stuff";

connectToMongoDB(mongodbURI); // Does not require additional setup as SQL does.
```

# Technologies used
Here is a list of all technologies used to run the project:
*   **discord.js**: The discord.js library is used to interact with the Discord API. [Website](https://discord.js.org)
*   **TypeScript**: The code is written in TypeScript for better type checking and maintainability. [Website](https://www.typescriptlang.org/)
*   **Node.js**: The code is run on a Node.js environment. [Website](https://nodejs.org/en/)
*   **Sequelize**: The code uses Sequelize to interact with SQL-based databases. [Website](https://sequelize.org/)
*   **MongoDB**: The code uses MongoDB to interact with MongoDB databases. [Website](https://www.mongodb.com/)
*   **Chalk**: The code uses Chalk to add color to the console. [NPMJS](https://www.npmjs.com/package/chalk)

# Sponsors
## CPTCR Hosting
Offering robust, reliable server hosting tailored for various online projects, including game servers, websites, and custom applications. Experience industry-leading performance and exceptional customer service.

[Website](https://cptcr.cc) | [Billing Area](https://cptcr.shop) | [Server Area](https://panel.cptcr.cc) | [Status](https://status.cptcr.cc) | [GitHub](https://github.com/CPTCR-Hosting)