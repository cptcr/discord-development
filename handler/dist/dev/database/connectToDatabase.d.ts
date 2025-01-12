import { Sequelize } from 'sequelize';
/**
 * Creates a connection to a MongoDB server.
 * @param {string} uri - The MongoDB connection string.
 */
declare function connectToMongoDB(uri: string): Promise<void>;
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
declare function connectToSQLServer(host: string, port: number, user: string, password: string, database: string, dialect: 'mysql' | 'postgres' | 'mariadb' | 'sqlite' | 'mssql'): Promise<Sequelize>;
export { connectToMongoDB, connectToSQLServer };
