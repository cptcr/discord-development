import { env } from "node:process";
import { connectToSQLServer, connectToMongoDB } from "../dev/database/connectToDatabase";
import { fatal } from "../dev/utils/logs";

const sql = [
    "mysql",
    "postgres",
    "mssql",
    "sqlite",
    "mariadb"
]

/**
 * Connects to database using the .env arguments
 * @returns {db} - The database object (if SQL database), for mongodb servers, the function wont return anything and just starts a connection to the MongoDB Server.
 */
async function connectToDatabase() {
    if (env.DB_TYPE === "mongoose") {
        await connectToMongoDB(env.MONGO_HOST);
    } else if (sql.includes(`${env.DB_TYPE}`)) {
        /*
        Fix: Argument of type 'string' is not assignable to parameter of type '"mysql" | "postgres" | "mssql" | "sqlite" | "mariadb"'.
        */
        const db = await connectToSQLServer(`${env.DB_HOST}`, env.DB_PORT, `${env.DB_USER}`, `${env.DB_PASSWORD}`,`${env.DB_NAME}`, `${env.DB_TYPE}`);
        return db;
    } else {
        return fatal(true, "Failed to connect to database: Invalid database type (Supported: mysql, postgres, mssql, sqlite, mariadb, mongoose)");
    }
}

export default connectToDatabase;