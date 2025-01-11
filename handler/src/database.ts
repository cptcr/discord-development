import { env } from "node:process";
import { connectToSQLServer, connectToMongoDB } from "../dev/database/connectToDatabase";
import { fatal } from "../dev/utils/logs";

const sql: Array<"mysql" | "postgres" | "mssql" | "sqlite" | "mariadb"> = [
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
function getEnvNumber(varName: string): number {
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
async function connectToDatabase(): Promise<any> {
    if (env.DB_TYPE === "mongoose") {
        if (!env.MONGO_HOST) {
            throw new Error("MONGO_HOST is not defined");
        }
        await connectToMongoDB(env.MONGO_HOST);
    } else if (sql.includes(env.DB_TYPE as "mysql" | "postgres" | "mssql" | "sqlite" | "mariadb")) {
        const dbType = env.DB_TYPE as "mysql" | "postgres" | "mssql" | "sqlite" | "mariadb";
        const port = getEnvNumber("DB_PORT");

        if (!env.DB_HOST || !env.DB_USER || !env.DB_PASSWORD || !env.DB_NAME) {
            throw new Error("One or more required environment variables (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) are not defined");
        }

        const db = await connectToSQLServer(
            env.DB_HOST,
            port,
            env.DB_USER,
            env.DB_PASSWORD,
            env.DB_NAME,
            dbType
        );
        return db;
    } else {
        return fatal(true, "Failed to connect to database: Invalid database type (Supported: mysql, postgres, mssql, sqlite, mariadb, mongoose)");
    }
}

export default connectToDatabase;