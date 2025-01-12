import { Client, GuildMember } from 'discord.js';
import  Event  from '../../dev/Interfaces/Event';
import { info } from '../../dev/utils/logs';

export default {
  name: 'guildMemberAdd',
  once: false,
  execute(client: Client, member: GuildMember) {
    info(true, `${member.user.tag} joined ${member.guild.name}`);
    // Additional logic for welcoming the new member, etc.
  },
} as Event;
