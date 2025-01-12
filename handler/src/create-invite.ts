import { DiscordOAuth2URLGenerator, AuthScopes } from "./dev/utils/oauth2.url.generator"
import { env } from "node:process";
import { DiscordPermissionsCalculator, PermissionGroup, PermissionScope, DiscordPermission } from "./dev/utils/calculate.permissions";

const clientID = `${env.DISCORD_ID}`;
const calc = new DiscordPermissionsCalculator();
const permissionGroups: PermissionGroup[] = calc.getPermissionGroups();

const generalGroup = permissionGroups.find(group => group.scope === PermissionScope.GENERAL);
if (generalGroup) {
    const adminPermission = generalGroup.permissions.find(perm => perm.id === DiscordPermission.ADMINISTRATOR);

    if (adminPermission) {
        calc.togglePermission(generalGroup, adminPermission.id);
    }
}

const textGroup = permissionGroups.find(group => group.scope === PermissionScope.TEXT);
if (textGroup) {
  calc.togglePermission(textGroup, DiscordPermission.SEND_MESSAGES);
  calc.togglePermission(textGroup, DiscordPermission.READ_MESSAGE_HISTORY);
}

const res = calc.calculatePermissions();

const gen = new DiscordOAuth2URLGenerator({
    clientId: clientID,
    redirectUri: "http://localhost:3000/callback",
    scopes: [
        AuthScopes.BOT,
        AuthScopes.IDENTIFY
    ],
    permissions: res,

});

console.log(gen.generateURL());