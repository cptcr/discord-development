import { Interaction, Message } from "discord.js";
import { env } from "node:process";
import { model, Schema } from "mongoose";
import { connectToSQLServer } from "../database/connectToDatabase";
import getEnvNumber from "../utils/getEnvNumber";
import getEnvString from "../utils/getEnvString";
import { loadSlashCommands, loadPrefixCommands } from "../Handlers/CommandHandler";

/**
 * Handles the Legal flow for either an Interaction or a Message.
 * @param input - Could be either an Interaction or a Message
 * @param database - The DB handle/connection, or nothing if you build it inside
 */
export default function legaltool(input: Interaction | Message, database: any) {
  let db: any;
  let userAccepted = false;
  let userId: string | undefined;

  // 1. Figure out if 'input' is an Interaction or a Message
  //    and extract the userId (if not a bot).
  if ("user" in input) {
    // input is an Interaction
    if (input.user.bot) {
      // It's a bot user; return early
      return;
    }
    userId = input.user.id;
  } else {
    // input is a Message
    if (input.author.bot) {
      // It's a bot user; return early
      return;
    }
    userId = input.author.id;
  }

  // If we somehow have no userId, return early
  if (!userId) {
    return;
  }

  // 2. Depending on your DB_TYPE, proceed with Mongoose or SQL-based query
  if (env.DB_TYPE === "mongoose") {
    const schema = new Schema({
      userId: { require: true, type: String, default: userId },
    });

    db = model("Legal_Has_Accepted_Checks", schema);

    (async () => {
      const res = await db.findOne({ userId });
      if (res) {
        userAccepted = true;
      }
    })();

  } else if (
    env.DB_TYPE === "mysql" ||
    env.DB_TYPE === "postgres" ||
    env.DB_TYPE === "mariadb" ||
    env.DB_TYPE === "sqlite" ||
    env.DB_TYPE === "mssql"
  ) {
    const dbType = env.DB_TYPE as
      | "mysql"
      | "postgres"
      | "mssql"
      | "sqlite"
      | "mariadb";

    // Connect to the SQL DB
    db = connectToSQLServer(
      `${env.DB_HOST}`,
      getEnvNumber("DB_PORT"),
      getEnvString("DB_USER"),
      getEnvString("DB_PASS"),
      getEnvString("DB_NAME"),
      dbType,
      false
    );

    (async () => {
      try {
        // Query if the user already exists in the table
        const [rows] = await db.query(
          "SELECT userId FROM Legal_Has_Accepted_Checks WHERE userId = ?",
          [userId]
        );

        if (Array.isArray(rows) && rows.length > 0) {
          userAccepted = true;
          // Do something if user has already accepted
        } else {
          // Insert logic if user hasn't accepted yet
        }
      } catch (err) {
        console.error("Error querying DB:", err);
      }
    })();
  }

  // 3. (Optional) Return something if needed, or handle the logic asynchronously
  return;
}