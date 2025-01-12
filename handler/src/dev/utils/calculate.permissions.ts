/**
 * Enum representing all Discord Permissions with their corresponding bitwise values.
 * Reference: https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
 */
export enum DiscordPermission {
    CREATE_INSTANT_INVITE = 1 << 0,          // 0x00000001
    KICK_MEMBERS = 1 << 1,                   // 0x00000002
    BAN_MEMBERS = 1 << 2,                    // 0x00000004
    ADMINISTRATOR = 1 << 3,                  // 0x00000008
    MANAGE_CHANNELS = 1 << 4,                // 0x00000010
    MANAGE_GUILD = 1 << 5,                   // 0x00000020
    ADD_REACTIONS = 1 << 6,                  // 0x00000040
    VIEW_AUDIT_LOG = 1 << 7,                 // 0x00000080
    PRIORITY_SPEAKER = 1 << 8,               // 0x00000100
    STREAM = 1 << 9,                          // 0x00000200
    VIEW_CHANNEL = 1 << 10,                  // 0x00000400
    SEND_MESSAGES = 1 << 11,                 // 0x00000800
    SEND_TTS_MESSAGES = 1 << 12,             // 0x00001000
    MANAGE_MESSAGES = 1 << 13,               // 0x00002000
    EMBED_LINKS = 1 << 14,                   // 0x00004000
    ATTACH_FILES = 1 << 15,                  // 0x00008000
    READ_MESSAGE_HISTORY = 1 << 16,          // 0x00010000
    MENTION_EVERYONE = 1 << 17,              // 0x00020000
    USE_EXTERNAL_EMOJIS = 1 << 18,           // 0x00040000
    VIEW_GUILD_INSIGHTS = 1 << 19,           // 0x00080000
    CONNECT = 1 << 20,                       // 0x00100000
    SPEAK = 1 << 21,                         // 0x00200000
    MUTE_MEMBERS = 1 << 22,                  // 0x00400000
    DEAFEN_MEMBERS = 1 << 23,                // 0x00800000
    MOVE_MEMBERS = 1 << 24,                  // 0x01000000
    USE_VAD = 1 << 25,                       // 0x02000000
    CHANGE_NICKNAME = 1 << 26,               // 0x04000000
    MANAGE_NICKNAMES = 1 << 27,              // 0x08000000
    MANAGE_ROLES = 1 << 28,                  // 0x10000000
    MANAGE_WEBHOOKS = 1 << 29,               // 0x20000000
    MANAGE_EMOJIS_AND_STICKERS = 1 << 30,    // 0x40000000
    USE_APPLICATION_COMMANDS = 1 << 31,      // 0x80000000
}
  

/**
 * Enum representing all Discord Permission Scopes.
 * These are used to categorize permissions in the UI.
 */
export enum PermissionScope {
    GENERAL = "General Permissions",
    TEXT = "Text Permissions",
    VOICE = "Voice Permissions",
    ADMINISTRATIVE = "Administrative Permissions",
    MANAGEMENT = "Management Permissions",
    STICKERS = "Stickers Permissions",
    APPLICATION_COMMANDS = "Application Commands Permissions",
    INSIGHTS = "Guild Insights Permissions",
    ADMIN = "Admin Permissions",
    // Add more scopes if Discord introduces new categories
}
  
  
  /**
   * Interface representing a single permission.
   */
  export interface Permission {
    id: DiscordPermission;
    name: string;
    auto: boolean; // Indicates if the permission is automatically granted by a higher permission
    active: boolean;
  }
  
  /**
   * Interface representing a scope of permissions.
   */
  export interface PermissionGroup {
    scope: PermissionScope;
    permissions: Permission[];
    active: boolean; // Indicates if the entire scope is active (selecting non-administrative)
  }
  
  /**
   * Class to calculate Discord permissions.
   */
  export class DiscordPermissionsCalculator {
    private permissionGroups: PermissionGroup[];
  
    constructor(permissionGroups?: PermissionGroup[]) {
      this.permissionGroups = permissionGroups || this.initializeDefaultPermissions();
    }
  
    /**
     * Initializes default permission groups with all permissions.
     */
    private initializeDefaultPermissions(): PermissionGroup[] {
      return [
        {
          scope: PermissionScope.GENERAL,
          active: false,
          permissions: [
            { id: DiscordPermission.CREATE_INSTANT_INVITE, name: "Create Instant Invite", auto: false, active: false },
            { id: DiscordPermission.KICK_MEMBERS, name: "Kick Members", auto: false, active: false },
            { id: DiscordPermission.BAN_MEMBERS, name: "Ban Members", auto: false, active: false },
            { id: DiscordPermission.ADMINISTRATOR, name: "Administrator", auto: true, active: false },
            { id: DiscordPermission.MANAGE_CHANNELS, name: "Manage Channels", auto: false, active: false },
            { id: DiscordPermission.MANAGE_GUILD, name: "Manage Server", auto: false, active: false },
          ],
        },
        {
          scope: PermissionScope.TEXT,
          active: false,
          permissions: [
            { id: DiscordPermission.ADD_REACTIONS, name: "Add Reactions", auto: false, active: false },
            { id: DiscordPermission.VIEW_AUDIT_LOG, name: "View Audit Log", auto: false, active: false },
            { id: DiscordPermission.VIEW_CHANNEL, name: "View Channel", auto: false, active: false },
            { id: DiscordPermission.SEND_MESSAGES, name: "Send Messages", auto: false, active: false },
            { id: DiscordPermission.SEND_TTS_MESSAGES, name: "Send TTS Messages", auto: false, active: false },
            { id: DiscordPermission.MANAGE_MESSAGES, name: "Manage Messages", auto: false, active: false },
            { id: DiscordPermission.EMBED_LINKS, name: "Embed Links", auto: false, active: false },
            { id: DiscordPermission.ATTACH_FILES, name: "Attach Files", auto: false, active: false },
            { id: DiscordPermission.READ_MESSAGE_HISTORY, name: "Read Message History", auto: false, active: false },
            { id: DiscordPermission.MENTION_EVERYONE, name: "Mention Everyone", auto: false, active: false },
            { id: DiscordPermission.USE_EXTERNAL_EMOJIS, name: "Use External Emojis", auto: false, active: false },
          ],
        },
        {
          scope: PermissionScope.VOICE,
          active: false,
          permissions: [
            { id: DiscordPermission.CONNECT, name: "Connect", auto: false, active: false },
            { id: DiscordPermission.SPEAK, name: "Speak", auto: false, active: false },
            { id: DiscordPermission.MUTE_MEMBERS, name: "Mute Members", auto: false, active: false },
            { id: DiscordPermission.DEAFEN_MEMBERS, name: "Deafen Members", auto: false, active: false },
            { id: DiscordPermission.MOVE_MEMBERS, name: "Move Members", auto: false, active: false },
            { id: DiscordPermission.USE_VAD, name: "Use Voice Activity", auto: false, active: false },
          ],
        },
        {
          scope: PermissionScope.ADMIN,
          active: false,
          permissions: [
            { id: DiscordPermission.MANAGE_ROLES, name: "Manage Roles", auto: false, active: false },
            { id: DiscordPermission.MANAGE_WEBHOOKS, name: "Manage Webhooks", auto: false, active: false },
            { id: DiscordPermission.MANAGE_EMOJIS_AND_STICKERS, name: "Manage Emojis and Stickers", auto: false, active: false },
          ],
        },
        {
          scope: PermissionScope.MANAGEMENT,
          active: false,
          permissions: [
            { id: DiscordPermission.USE_APPLICATION_COMMANDS, name: "Use Application Commands", auto: false, active: false },
            { id: DiscordPermission.VIEW_GUILD_INSIGHTS, name: "View Guild Insights", auto: false, active: false },
            // Add more management-related permissions as needed
          ],
        },
        {
          scope: PermissionScope.STICKERS,
          active: false,
          permissions: [
            { id: DiscordPermission.MANAGE_EMOJIS_AND_STICKERS, name: "Manage Emojis and Stickers", auto: false, active: false },
            // Add more sticker-related permissions as needed
          ],
        },
        {
          scope: PermissionScope.APPLICATION_COMMANDS,
          active: false,
          permissions: [
            { id: DiscordPermission.USE_APPLICATION_COMMANDS, name: "Use Application Commands", auto: false, active: false },
            // Add more application commands-related permissions as needed
          ],
        },
        // Add more scopes and permissions as Discord introduces new categories
      ];
    }
  
    /**
     * Toggles the active state of an entire permission group.
     * @param group The permission group to toggle.
     */
    public toggleGroup(group: PermissionGroup): void {
      group.active = !group.active;
      group.permissions.forEach((perm) => {
        perm.active = group.active;
      });
    }
  
    /**
     * Toggles the active state of a single permission.
     * If a permission is set to active, ensures that the parent group is also active.
     * @param group The permission group containing the permission.
     * @param permission The permission to toggle.
     */
    public togglePermission(group: PermissionGroup, permission: DiscordPermission): void {
      const perm = group.permissions.find((p) => p.id === permission);
      if (perm) {
        perm.active = !perm.active;
        if (perm.active) {
          group.active = true;
        } else {
          // If no permissions in the group are active, set the group to inactive
          group.active = group.permissions.some((p) => p.active);
        }
      }
    }
  
    /**
     * Calculates the total permissions integer based on active permissions.
     * @returns The total permissions as a number.
     */
    public calculatePermissions(): number {
      let total = 0;
      this.permissionGroups.forEach((group) => {
        group.permissions.forEach((perm) => {
          if (perm.active) {
            total |= perm.id;
          }
        });
      });
      return total;
    }
  
    /**
     * Provides a detailed explanation of the active permissions.
     * @returns A string explaining which permissions are active.
     */
    public calculateExplanation(): string {
      const activePermissions: string[] = [];
      this.permissionGroups.forEach((group) => {
        group.permissions.forEach((perm) => {
          if (perm.active) {
            activePermissions.push(perm.name);
          }
        });
      });
      return activePermissions.join(", ") || "No permissions selected.";
    }
  
    /**
     * Retrieves the current permission groups.
     * @returns An array of permission groups.
     */
    public getPermissionGroups(): PermissionGroup[] {
      return this.permissionGroups;
    }
  
    /**
     * Sets the permission groups.
     * Useful if you need to customize the permission groups dynamically.
     * @param permissionGroups The new permission groups.
     */
    public setPermissionGroups(permissionGroups: PermissionGroup[]): void {
      this.permissionGroups = permissionGroups;
    }
  
    /**
     * Resets all permissions to inactive.
     */
    public resetPermissions(): void {
      this.permissionGroups.forEach((group) => {
        group.active = false;
        group.permissions.forEach((perm) => {
          perm.active = false;
        });
      });
    }
  
    /**
     * Adds a new permission to a specific scope.
     * @param scope The permission scope to add the permission to.
     * @param permission The permission to add.
     */
    public addPermissionToScope(scope: PermissionScope, permission: Permission): void {
      const group = this.permissionGroups.find((g) => g.scope === scope);
      if (group) {
        group.permissions.push(permission);
      } else {
        // If the scope doesn't exist, create a new group
        this.permissionGroups.push({
          scope: scope,
          active: false,
          permissions: [permission],
        });
      }
    }
  
    /**
     * Removes a permission from a specific scope.
     * @param scope The permission scope to remove the permission from.
     * @param permissionId The ID of the permission to remove.
     */
    public removePermissionFromScope(scope: PermissionScope, permissionId: DiscordPermission): void {
      const group = this.permissionGroups.find((g) => g.scope === scope);
      if (group) {
        group.permissions = group.permissions.filter((perm) => perm.id !== permissionId);
        // If the group has no more permissions, you might want to remove the group entirely
        if (group.permissions.length === 0) {
          this.permissionGroups = this.permissionGroups.filter((g) => g.scope !== scope);
        }
      }
    }
  }
  