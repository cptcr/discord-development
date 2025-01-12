"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = require("node:process");
const connectToDatabase_1 = require("./dev/database/connectToDatabase");
const logs_1 = require("./dev/utils/logs");
const sql = [
    "mysql",
    "postgres",
    "mssql",
    "sqlite",
    "mariadb"
];
/**
 * Returns the number value of an ENV Variable to prevent errors.
 * @param varName The name of the variable for example DB_PORT.
 * @returns {number} The number value of the variable.
 */
function getEnvNumber(varName) {
    const value = process.env[varName];
    if (!value) {
        throw new Error(`${varName} is not defined`);
    }
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
        throw new Error(`${varName} is not a valid number`);
    }
    return numberValue;
}
/**
 * Connects to the database using the .env arguments.
 * @returns {Promise<any>} - The database object (if SQL database). For MongoDB servers, the function doesn't return anything and just starts a connection to the MongoDB server.
 */
async function connectToDatabase() {
    if (node_process_1.env.DB_TYPE === "mongoose") {
        if (!node_process_1.env.MONGO_HOST) {
            throw new Error("MONGO_HOST is not defined");
        }
        await (0, connectToDatabase_1.connectToMongoDB)(node_process_1.env.MONGO_HOST);
    }
    else if (sql.includes(node_process_1.env.DB_TYPE)) {
        const dbType = node_process_1.env.DB_TYPE;
        const port = getEnvNumber("DB_PORT");
        if (!node_process_1.env.DB_HOST || !node_process_1.env.DB_USER || !node_process_1.env.DB_PASSWORD || !node_process_1.env.DB_NAME) {
            throw new Error("One or more required environment variables (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) are not defined");
        }
        const db = await (0, connectToDatabase_1.connectToSQLServer)(node_process_1.env.DB_HOST, port, node_process_1.env.DB_USER, node_process_1.env.DB_PASSWORD, node_process_1.env.DB_NAME, dbType);
        return db;
    }
    else {
        return (0, logs_1.fatal)(true, "Failed to connect to database: Invalid database type (Supported: mysql, postgres, mssql, sqlite, mariadb, mongoose)");
    }
}
exports.default = connectToDatabase;
//# sourceMappingURL=database.js.map