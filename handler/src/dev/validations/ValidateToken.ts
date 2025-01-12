import { env } from "node:process";
import { warn, debug, info, success, fatal } from "../utils/logs";

export default async function validateToken () {
    info(true, "Validating token...");
    const token = `${env.DISCORD_TOKEN}`;
    const id = `${env.DISCORD_ID}`; 
    info(true, "Encoding discord bot id...");

    const idBuffer = Buffer.from(id, 'utf-8'); 

    const encodedId = idBuffer.toString('base64'); 

    if (!token.startsWith(encodedId)) {
        return fatal(true, "Token is either invalid or doesn't belong to the Discord bot's ID.");
    }
      
    success(true, "Token is valid");
}