require('dotenv').config()

const lfgRoleMembers = require('../lfgMembers');
const lfgRoleName = process.env.LFG_ROLE_NAME;
const permissionRoleName = process.env.PERMISSION_ROLE_NAME

module.exports = {
    name: 'rm',
    aliases: ['remove'],
    description: `Remove someone else from the ${lfgRoleName} role [requires ${permissionRoleName} role]`,
    usage: `[@user_mention(s)]`,
    usageDescription: `removes the mentioned user(s) from the ${lfgRoleName} role`,
    requirePermissions: true,
    guildOnly: true,
    args: true,
    cooldown: 5,
    execute(message, args) {
        let lfgRole = message.guild.roles.cache.find(role => role.name === lfgRoleName)

        // Ensure the role exists on the server
        if (!lfgRole) {
            return message.channel.send(`Cannot find the role: ${lfgRoleName} on this server`)
        }

        const members = message.mentions.members;
        let removedCount = 0;

        if (members === undefined) {
            return message.reply(`no users were mentioned as arguments.`)
        }

        members.map(function (member) {
            lfgRoleMembers.delete(message.author.id);
            if (member.roles.cache.has(lfgRole.id)) {
                member.roles.remove(lfgRole).catch(console.error);
                removedCount++;
            }
        });
        return message.reply(`${removedCount} users were removed from the ${lfgRoleName} role.`)
    }
};