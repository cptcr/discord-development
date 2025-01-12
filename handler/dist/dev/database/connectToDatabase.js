"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongoDB = connectToMongoDB;
exports.connectToSQLServer = connectToSQLServer;
const mongoose_1 = __importDefault(require("mongoose"));
const sequelize_1 = require("sequelize");
const logs_1 = require("../utils/logs");
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const config_json_1 = __importDefault(require("../../../config.json"));
/**
 * Overwrites only database credentials in the .env file located in the root directory.
 */
async function overwriteDatabaseCredentials(dbType, host, user, password, database, port) {
    try {
        const rootPath = path.resolve(__dirname, '../../../'); // Adjust the relative path to point to the root
        const envFilePath = path.join(rootPath, '.env');
        const envContent = await fs_1.default.promises.readFile(envFilePath, 'utf8');
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
        await fs_1.default.promises.writeFile(envFilePath, updatedEnvLines.join('\n'), 'utf8');
        (0, logs_1.success)(true, "Database credentials have been updated.");
    }
    catch (err) {
        (0, logs_1.error)(true, `Failed to update database credentials. \n${err}`);
    }
}
/**
 * Retries the connection by prompting the user for new credentials.
 */
async function retry(dbType) {
    const databaseOptions = [
        'mongoose',
        'mysql',
        'postgres',
        'mariadb',
        'sqlite',
        'mssql',
    ];
    if (dbType === 'mongoose') {
        const mongoCredentials = await inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'uri',
                message: 'Enter the MongoDB connection URI:',
            },
        ]);
        return mongoCredentials.uri;
    }
    else {
        const sqlCredentials = await inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'host',
                message: 'Enter the database server host (IP or domain):',
            },
            {
                type: 'input',
                name: 'port',
                message: 'Enter the database server port:',
                validate: (value) => !isNaN(Number(value)) ? true : 'Please enter a valid port number.',
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
async function connectToMongoDB(uri) {
    if (config_json_1.default['enabled-default-logs']['database-connection']) {
        await (0, logs_1.warn)(true, 'Connecting to MongoDB server...');
    }
    try {
        await mongoose_1.default.connect(uri);
        if (config_json_1.default['enabled-default-logs']['database-connection']) {
            await (0, logs_1.success)(true, 'Successfully connected to MongoDB server!');
        }
        // Overwrite MongoDB credentials in .env
        await overwriteDatabaseCredentials('mongoose', uri, '', '', '', 0);
    }
    catch (err) {
        await (0, logs_1.fatal)(true, `Error connecting to MongoDB server: ${err}`);
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
async function connectToSQLServer(host, port, user, password, database, dialect) {
    if (config_json_1.default['enabled-default-logs']['database-connection']) {
        await (0, logs_1.warn)(true, `Connecting to ${dialect.toUpperCase()} database server...`);
    }
    try {
        const sequelize = new sequelize_1.Sequelize(database, user, password, {
            host,
            port,
            dialect,
        });
        await sequelize.authenticate();
        if (config_json_1.default['enabled-default-logs']['database-connection']) {
            await (0, logs_1.success)(true, `Successfully connected to ${dialect.toUpperCase()} server!`);
        }
        // Overwrite SQL database credentials in .env
        await overwriteDatabaseCredentials(dialect, host, user, password, database, port);
        return sequelize;
    }
    catch (err) {
        await (0, logs_1.fatal)(true, `Error connecting to ${dialect.toUpperCase()} server: ${err}`);
        // Retry connection
        const sqlCredentials = await retry(dialect);
        return await connectToSQLServer(sqlCredentials.host, parseInt(sqlCredentials.port), sqlCredentials.user, sqlCredentials.password, sqlCredentials.database, dialect);
    }
}
//# sourceMappingURL=connectToDatabase.js.map