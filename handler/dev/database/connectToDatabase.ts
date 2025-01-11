import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import { warn, debug, success, error, fatal } from '../utils/logs';
import inquirer from 'inquirer';
import fs from 'fs';
import * as path from 'path';

/**
 * Overwrites only database credentials in the .env file located in the root directory.
 */
async function overwriteDatabaseCredentials(
    dbType: string,
    host: string,
    user: string,
    password: string,
    database: string,
    port: number
): Promise<void> {
    try {
        const rootPath = path.resolve(__dirname, '../../'); // Adjust the relative path to point to the root
        const envFilePath = path.join(rootPath, '.env');

        const envContent = await fs.promises.readFile(envFilePath, 'utf8');
        const envLines = envContent.split('\n');

        const updatedEnvLines = envLines.map((line) => {
            if (line.startsWith('export DB_TYPE')) {
                return `export DB_TYPE = "${dbType}"`;
            }
            if (line.startsWith('export DB_HOST')) {
                return `export DB_HOST = "${host}"`;
            }
            if (line.startsWith('export DB_USER')) {
                return `export DB_USER = "${user}"`;
            }
            if (line.startsWith('export DB_PASS')) {
                return `export DB_PASS = "${password}"`;
            }
            if (line.startsWith('export DB_NAME')) {
                return `export DB_NAME = "${database}"`;
            }
            if (line.startsWith('export DB_PORT')) {
                return `export DB_PORT = "${port}"`;
            }
            if (line.startsWith('export MONGO_HOST')) {
                return `export MONGO_HOST = "${host}"`;
            }
            return line;
        });

        await fs.promises.writeFile(envFilePath, updatedEnvLines.join('\n'), 'utf8');
        console.log('Database credentials successfully updated in the .env file!');
    } catch (err) {
        console.error('Error updating .env file:', err);
    }
}

/**
 * Retries the connection by prompting the user for new credentials.
 */
async function retry(dbType: string): Promise<any> {
    const databaseOptions = [
        'mongoose',
        'mysql',
        'postgres',
        'mariadb',
        'sqlite',
        'mssql',
    ];

    if (dbType === 'mongoose') {
        const mongoCredentials = await inquirer.prompt([
            {
                type: 'input',
                name: 'uri',
                message: 'Enter the MongoDB connection URI:',
            },
        ]);
        return mongoCredentials.uri;
    } else {
        const sqlCredentials = await inquirer.prompt([
            {
                type: 'input',
                name: 'host',
                message: 'Enter the database server host (IP or domain):',
            },
            {
                type: 'input',
                name: 'port',
                message: 'Enter the database server port:',
                validate: (value) =>
                    !isNaN(Number(value)) ? true : 'Please enter a valid port number.',
            },
            {
                type: 'input',
                name: 'user',
                message: 'Enter the database user:',
            },
            {
                type: 'password',
                name: 'password',
                message: 'Enter the database user password:',
            },
            {
                type: 'input',
                name: 'database',
                message: 'Enter the name of the database:',
            },
        ]);

        return sqlCredentials;
    }
}

/**
 * Creates a connection to a MongoDB server.
 * @param {string} uri - The MongoDB connection string.
 */
async function connectToMongoDB(uri: string): Promise<void> {
    await warn(true, 'Connecting to MongoDB server...');
    try {
        await mongoose.connect(uri);
        await success(true, 'Successfully connected to MongoDB server!');

        // Overwrite MongoDB credentials in .env
        await overwriteDatabaseCredentials('mongoose', uri, '', '', '', 0);
    } catch (err) {
        await fatal(true, `Error connecting to MongoDB server: ${err}`);

        // Retry connection
        const retryUri = await retry('mongoose');
        await connectToMongoDB(retryUri);
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
    port: number,
    user: string,
    password: string,
    database: string,
    dialect: 'mysql' | 'postgres' | 'mariadb' | 'sqlite' | 'mssql'
): Promise<Sequelize> {
    await warn(true, `Connecting to ${dialect.toUpperCase()} database server...`);
    try {
        const sequelize = new Sequelize(database, user, password, {
            host,
            port,
            dialect,
        });

        await sequelize.authenticate();
        await success(true, `Successfully connected to ${dialect.toUpperCase()} server!`);

        // Overwrite SQL database credentials in .env
        await overwriteDatabaseCredentials(dialect, host, user, password, database, port);

        return sequelize;
    } catch (err) {
        await fatal(true, `Error connecting to ${dialect.toUpperCase()} server: ${err}`);

        // Retry connection
        const sqlCredentials = await retry(dialect);
        return await connectToSQLServer(
            sqlCredentials.host,
            parseInt(sqlCredentials.port),
            sqlCredentials.user,
            sqlCredentials.password,
            sqlCredentials.database,
            dialect
        );
    }
}

export { connectToMongoDB, connectToSQLServer };
