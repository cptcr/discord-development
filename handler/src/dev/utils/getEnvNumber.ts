import process from "node:process";

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

export default getEnvNumber;