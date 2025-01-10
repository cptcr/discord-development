import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import { warn, debug, success, error, fatal } from '../utils/logs';

/**
 * Creates a connection to a MongoDB server.
 * @param {string} uri - The MongoDB connection string.
*/
async function connectToMongoDB(uri: string): Promise<void> {
    await warn(true, 'Connecting to MongoDB server...'); // Logs a message to let the user know that a connection is attempted to make
    try {
        // Create a new Mongoose connection
        await mongoose.connect(uri); // Creates a connection to the mongoose server
        await success(true, 'Successfully connected to MongoDB server!');
    } catch (err) {
        // Returns a fatal error if the connection fails
        await fatal(true, `Error connecting to MongoDB server: ${err}`);
        process.exit(1); // Kills the current running process if the connection couldnt be established
    }
}

/**
 * Creates a connection to any SQL-based database server and returns the connection instance.
 * Supports MySQL, PostgreSQL, MariaDB, SQLite, and MSSQL.
 * @param {string} host - The database server host (IP or domain).
 * @param {number} port - The database server port.
 * @param {string} user - The database user.
 * @param {string} password - The database user's password.
 * @param {string} database - The name of the database to connect to.
 * @param {string} dialect - The SQL database dialect (mysql, postgres, mariadb, sqlite, mssql).
 * @returns {Promise<Sequelize>} - The Sequelize database connection instance.
*/
async function connectToSQLServer(
    host: string,
    port: any,
    user: string,
    password: string,
    database: string,
    dialect: 'mysql' | 'postgres' | 'mariadb' | 'sqlite' | 'mssql' // Supported Database Types
): Promise<Sequelize> {
    await warn(true, `Connecting to ${dialect.toUpperCase()} database server...`);
    try {
        // Create the connection to the SQL database server
        const sequelize = new Sequelize(database, user, password, {
            host,
            port,
            dialect,
        }); // Creates a connection to the SQL Server with the given arguments.

        // Test the connection
        await sequelize.authenticate();
        await success(true, `Successfully connected to ${dialect.toUpperCase()} server!`);

        return sequelize;
    } catch (err) {
        // Return a fatal error if the connection fails
        await fatal(true, `Error connecting to ${dialect.toUpperCase()} server: ${err}`);
        process.exit(1); // Kills the current running process if the connection couldnt be established
    }
}

export { connectToMongoDB, connectToSQLServer };
