/**
 * Connects to the database using the .env arguments.
 * @returns {Promise<any>} - The database object (if SQL database). For MongoDB servers, the function doesn't return anything and just starts a connection to the MongoDB server.
 */
declare function connectToDatabase(): Promise<any>;
export default connectToDatabase;
