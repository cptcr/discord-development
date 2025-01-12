/**
 * Returns the number value of an ENV Variable to prevent errors.
 * @param varName The name of the variable for example DB_PORT.
 * @returns {number} The number value of the variable.
 */
declare function getEnvNumber(varName: string): number;
export default getEnvNumber;
