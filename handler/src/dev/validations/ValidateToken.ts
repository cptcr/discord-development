// src/validation/validateToken.ts

import { Client, GatewayIntentBits } from 'discord.js';
import { env } from "node:process";
import { warn, debug, info, success, fatal } from "../utils/logs";

export default async function validateToken (): Promise<boolean> {
    info(true, "Starting token validation...");

    const token = env.DISCORD_TOKEN?.trim();
    const expectedId = env.DISCORD_ID?.trim(); 

    if (!token || !expectedId) {
        fatal(true, "DISCORD_TOKEN or DISCORD_ID environment variable is missing.");
        return false;
    }

    // Initialize a temporary Discord client
    const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // Minimal intents

    return new Promise((resolve) => {
        client.once('ready', () => {
            const user = client.user;
            if (user) {
                info(true, `Logged in as ${user.tag} (ID: ${user.id})`);

                if (user.id !== expectedId) {
                    fatal(true, "Token does not belong to the provided Discord bot's ID.");
                    client.destroy();
                    resolve(false);
                } else {
                    success(true, "Token is valid and belongs to the Discord bot's ID.");
                    client.destroy();
                    resolve(true);
                }
            } else {
                fatal(true, "Unable to retrieve user information.");
                client.destroy();
                resolve(false);
            }
        });

        client.on('error', (err) => {
            fatal(true, `Failed to login with token: ${err}`);
            resolve(false);
        });

        client.login(token).catch((err) => {
            fatal(true, `Failed to login: ${err}`);
            resolve(false);
        });
    });
}
