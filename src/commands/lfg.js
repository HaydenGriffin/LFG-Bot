require('dotenv').config()

const lfgRoleMembers = require('../lfgMembers');
const lfgRoleName = process.env.LFG_ROLE_NAME;

module.exports = {
    name: 'lfg',
    description: 'Use this to signal that you are looking for a group to play with',
    usage: '20',
    usageDescription: `Assigns you to the LFG role for 20 minutes`,
    guildOnly: true,
    defaultDuration: 10,
    args: false,
    cooldown: 10,
    execute(message, args) {
        const now = Date.now();
        const member = message.member;
        let lfgRole = message.guild.roles.cache.find(role => role.name === lfgRoleName)
        let duration = this.defaultDuration;

        // Ensure the role exists on the server
        if (!lfgRole) {
            return message.channel.send(`Cannot find the role: ${lfgRoleName} on this server`)
        }

        // User doesn't have role but is in the collection; remove from collection
        if (!message.member.roles.cache.has(lfgRole.id) && lfgRoleMembers.has(message.author.id)) {
            lfgRoleMembers.delete(message.author.id);
        }

        if (lfgRoleMembers.has(message.author.id)) {
            const expirationTimestamp = lfgRoleMembers.get(message.author.id);
            const expirationTimeRemainingMinutes = (expirationTimestamp - now) / 1000 / 60;
            return message.reply(`you are already in the ${lfgRoleName} role for another ${expirationTimeRemainingMinutes.toFixed(0)} minute(s)!`)
        }

        const parsedDuration = parseInt(args[0])
        if (!isNaN(parsedDuration) && parsedDuration <= 120) {
            duration = parsedDuration;
        }

        const durationInMs = duration * 1000 * 60;
        const expirationTime = now + durationInMs;

        lfgRoleMembers.set(message.author.id, expirationTime);
        member.roles.add(lfgRole).catch(console.error);
        message.reply(`you are now placed in the ${lfgRoleName} role for ${duration} minutes.`)

        setTimeout(function () {
            member.roles.remove(lfgRole).catch(console.error);
            lfgRoleMembers.delete(message.author.id);
        }, (durationInMs));
    },
};