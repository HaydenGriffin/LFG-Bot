require('dotenv').config()

module.exports = {
    name: 'lfm',
    aliases: ['lf1/2', 'lf1m', 'lf2m', 'lf3m', 'lf1', 'lf2', 'lf3'],
    description: 'Use this to find members to join your group',
    guildOnly: true,
    args: false,
    cooldown: 5 * 60,
    execute(message, args) {
        const lfgRoleName = process.env.LFG_ROLE_NAME;
        let member = message.member;
        let lfgRole = message.guild.roles.cache.find(role => role.name === lfgRoleName)

        // Ensure the role exists on the server
        if (!lfgRole) {
            return message.channel.send(`Cannot find the role: ${lfgRoleName} on this server`)
        }

        return message.channel.send(`${lfgRole}, ${member} is looking for people to join their group!`)
    }
};