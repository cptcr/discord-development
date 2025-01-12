/**
 * Named constants for Discord OAuth2 scopes.
 * 
 * Reference: https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
 */
export enum AuthScopes {
    /**
     * Allows /users/@me without email
     */
    IDENTIFY = "identify",
  
    /**
     * Allows /users/@me with an email
     */
    EMAIL = "email",
  
    /**
     * Allows /users/@me/connections to see connected accounts
     */
    CONNECTIONS = "connections",
  
    /**
     * Allows /users/@me/guilds to see the user’s guilds
     */
    GUILDS = "guilds",
  
    /**
     * Allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild
     */
    GUILDS_JOIN = "guilds.join",
  
    /**
     * Joins a user to a group DM
     */
    GDM_JOIN = "gdm.join",
  
    /**
     * Allows your app to fully control the user’s account (not recommended)
     */
    RPC = "rpc",
  
    /**
     * Allows your app to control a user’s Discord client
     */
    RPC_API = "rpc.api",
  
    /**
     * Allows your app to receive notifications pushed out to the user
     */
    RPC_NOTIFICATIONS_READ = "rpc.notifications.read",
  
    /**
     * Allows creating and managing webhooks
     */
    WEBHOOK_INCOMING = "webhook.incoming",
  
    /**
     * Grants your app the ability to add a bot user
     */
    BOT = "bot",
  
    /**
     * Allows your app to read messages from all client channels (requires Discord approval)
     */
    MESSAGES_READ = "messages.read",
  
    /**
     * Allows your app to upload/update builds for a user’s applications (requires Discord approval)
     */
    APPLICATIONS_BUILDS_UPLOAD = "applications.builds.upload",
  
    /**
     * Allows your app to read build data for a user’s applications
     */
    APPLICATIONS_BUILDS_READ = "applications.builds.read",
  
    /**
     * Allows your app to read and update store data (requires Discord approval)
     */
    APPLICATIONS_STORE_UPDATE = "applications.store.update",
  
    /**
     * Allows your app to read entitlements for a user’s applications
     */
    APPLICATIONS_ENTITLEMENTS = "applications.entitlements",
  
    /**
     * Allows your app to read (via GET) a user’s activity data
     */
    ACTIVITIES_READ = "activities.read",
  
    /**
     * Allows your app to post and update a user’s activity
     */
    ACTIVITIES_WRITE = "activities.write",
  
    /**
     * Allows your app to read the user’s relationships (requires Discord approval)
     */
    RELATIONSHIPS_READ = "relationships.read",
  
    /**
     * Allows your app to update role connection metadata for the user
     */
    ROLE_CONNECTIONS_WRITE = "role_connections.write",
  }
  
  /**
   * Options for constructing the DiscordOAuth2URLGenerator.
   */
  export interface OAuth2GeneratorOptions {
    /**
     * The Client ID from your Discord application.
     */
    clientId: string;
  
    /**
     * The authorized redirect URI for your OAuth2 flow.
     */
    redirectUri: string;
  
    /**
     * A list of OAuth2 scopes your application is requesting.
     * You can use AuthFlags.<scope> for convenience.
     */
    scopes: AuthScopes[];
  
    /**
     * The response type for the OAuth2 flow (default: "code").
     * Typically "code" for Discord OAuth2.
     */
    responseType?: string;
  
    /**
     * The permission integer for the bot invite.
     * Only used if the "bot" scope is included.
     */
    permissions?: number;
  
    /**
     * A specific guild ID to pre-select in the invite dialog (for bot invites).
     */
    guildId?: string;
  
    /**
     * Whether to disable the guild selection drop-down when inviting the bot.
     */
    disableGuildSelect?: boolean;
  
    /**
     * A unique string for state checking in OAuth2 flows (helps prevent CSRF).
     */
    state?: string;
  
    /**
     * Controls how the user is prompted for authorization.
     * Can be "consent" (ask user each time) or "none" (no prompt if previously authorized).
     */
    prompt?: string;
  }
  
  /**
   * A class to generate Discord OAuth2 authorization URLs.
   */
  export class DiscordOAuth2URLGenerator {
    private static BASE_URL = "https://discord.com/oauth2/authorize";
  
    private clientId: string;
    private redirectUri: string;
    private scopes: AuthScopes[];
    private responseType: string;
    private permissions?: number;
    private guildId?: string;
    private disableGuildSelect?: boolean;
    private state?: string;
    private prompt?: string;
  
    constructor(options: OAuth2GeneratorOptions) {
      this.clientId = options.clientId;
      this.redirectUri = options.redirectUri;
      this.scopes = options.scopes;
      this.responseType = options.responseType ?? "code";
      this.permissions = options.permissions;
      this.guildId = options.guildId;
      this.disableGuildSelect = options.disableGuildSelect;
      this.state = options.state;
      this.prompt = options.prompt;
    }
  
    /**
     * Generates the Discord OAuth2 authorization URL with the given parameters.
     *
     * @returns A fully-formed Discord OAuth2 authorization URL.
     */
    public generateURL(): string {
      const params = new URLSearchParams();
  
      params.set("client_id", this.clientId);
      params.set("redirect_uri", this.redirectUri);
      params.set("response_type", this.responseType);
      params.set("scope", this.scopes.join(" "));
  
      // If 'bot' scope is requested, include permissions and possibly guild_id & disable_guild_select
      if (this.scopes.includes(AuthScopes.BOT)) {
        if (typeof this.permissions === "number") {
          params.set("permissions", this.permissions.toString());
        }
        if (this.guildId) {
          params.set("guild_id", this.guildId);
        }
        if (this.disableGuildSelect) {
          params.set("disable_guild_select", "true");
        }
      }
  
      // Add optional state
      if (this.state) {
        params.set("state", this.state);
      }
  
      // Add optional prompt
      if (this.prompt) {
        params.set("prompt", this.prompt);
      }
  
      return `${DiscordOAuth2URLGenerator.BASE_URL}?${params.toString()}`;
    }
}
  
/**
   * Example usage:
   */
// const generator = new DiscordOAuth2URLGenerator({
//   clientId: "YOUR_CLIENT_ID",
//   redirectUri: "https://your-redirect-url.com/callback",
//   scopes: [AuthFlags.IDENTIFY, AuthFlags.GUILDS],
//   permissions: 8, // Administrator permission for the bot
//   state: "some_random_state_here",
//   prompt: "consent",
// });
  
// console.log(generator.generateURL());
  