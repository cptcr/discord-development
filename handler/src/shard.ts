import setupSharding from "./dev/Handlers/ShardAgent";
import dotenv from "dotenv";
dotenv.config();
import { env } from "node:process";
import validateToken from "./dev/validations/ValidateToken";
validateToken()

// Added backticks so the string is treated as a template literal
const DISCORD_TOKEN = `${env.DISCORD_TOKEN}`;

/*
setupSharding(enabled: boolean, botScript: string, token: string)
enabled:
Set to true (to enable sharding) or false (to disable sharding and run the bot as a single instance)
botScript:
The path to the bot script (the script that contains the bot's startup code, mostly named index.ts)
token:
The token of the bot (the token that you get from the discord developer portal)
*/

setupSharding(false, "src/index.ts", DISCORD_TOKEN);