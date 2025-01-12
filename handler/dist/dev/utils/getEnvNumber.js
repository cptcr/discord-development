"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = __importDefault(require("node:process"));
/**
 * Returns the number value of an ENV Variable to prevent errors.
 * @param varName The name of the variable for example DB_PORT.
 * @returns {number} The number value of the variable.
 */
function getEnvNumber(varName) {
    const value = node_process_1.default.env[varName];
    if (!value) {
        throw new Error(`${varName} is not defined`);
    }
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
        throw new Error(`${varName} is not a valid number`);
    }
    return numberValue;
}
exports.default = getEnvNumber;
//# sourceMappingURL=getEnvNumber.js.map