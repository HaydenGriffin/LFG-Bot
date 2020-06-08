require('dotenv').config()

const lfgRoleMembers = require('../lfgMembers');
const lfgRoleName = process.env.LFG_ROLE_NAME;

module.exports = {
    name: 'stop',
    aliases: ['exit', 'quit'],
    description: `Remove yourself from the ${lfgRoleName} role`,
    guildOnly: true,
    args: false,
    cooldown: 10,
    execute(message, args) {
        const member = message.member;
        let lfgRole = message.guild.roles.cache.find(role => role.name === lfgRoleName)

        lfgRoleMembers.delete(message.author.id);

        if (!message.member.roles.cache.has(lfgRole.id)) {
            return message.reply(`you're not currently in the ${lfgRoleName} role!`)
        }

        member.roles.remove(lfgRole).catch(console.error);
        return message.reply(`you have been removed from the ${lfgRoleName} role!`)
    }
};