import fs from 'fs';
import path from 'path';

/**
 * Ensures the /logs directory exists.
 */
function ensureLogsDir() {
  const logsDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
}

/**
 * Writes a log message to the appropriate log file.
 * @param {"console" | "guilds" | "interaction"} type - The type of log. Either "console", "guilds", or "interaction".
 * @param {string} message - The log message to write.
 */
function writeLog(type: "console" | "guilds" | "interaction", message: string) {
  ensureLogsDir();

  // Decide which log file to write to
  let logFileName;
  if (type === 'console' || type === 'guilds') {
    logFileName = 'console.log';
  } else if (type === 'interaction') {
    logFileName = 'interaction.log';
  } else {
    // If you want to handle unknown types, you could default somewhere or throw an error
    logFileName = 'console.log';
  }

  // Construct the full path of the log file
  const logFilePath = path.join(process.cwd(), 'logs', logFileName);

  // Prep the message with a timestamp for easier debugging
  const timeStamp = new Date().toISOString();
  const logEntry = `[${timeStamp}] [${type.toUpperCase()}] ${message}\n`;

  // Append the log entry to the file
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error(`Error while writing to ${logFileName}: `, err);
    }
  });
}

// Export the function as default
export default writeLog;
