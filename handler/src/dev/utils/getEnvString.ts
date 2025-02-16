import process from "node:process";
import { isStringObject } from "node:util/types";

/**
 * Returns the string value of an ENV Variable to prevent errors.
 * @param varName The string of the variable for example DB_PORT.
 * @returns {string} The string value of the variable.
 */
function getEnvString(varName: string): string {
    const value = process.env[varName];
    if (!value) {
      throw new Error(`${varName} is not defined`);
    }
    return value; // It's already a string (or undefined)
}  

export default getEnvString;