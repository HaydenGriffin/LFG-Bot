require('dotenv').config()

module.exports = {
    name: 'lfg',
    description: 'Use this to signal that you are looking for a group to play with',
    guildOnly: true,
    defaultDuration: 10,
    args: false,
    cooldown: 5,
    execute(message, args) {
        const lfgRoleName = process.env.LFG_ROLE_NAME;
        let member = message.member;
        let lfgRole = message.guild.roles.cache.find(role => role.name === lfgRoleName)
        let duration = this.defaultDuration;

        if (!lfgRole) {
            return message.channel.send(`Cannot find the role: ${lfgRoleName} on this server`)
        }

        if (message.member.roles.cache.has(lfgRole.id)) {
            return message.reply(`you are already in the ${lfgRoleName} role!`)
        }

        const parsedDuration = parseInt(args[0])
        if (!isNaN(parsedDuration) && parsedDuration <= 300) {
            duration = parsedDuration;
        }

        member.roles.add(lfgRole).catch(console.error);
        message.reply(`you are now placed in the ${process.env.LFG_ROLE_NAME} role for ${duration} minutes.`)

        setTimeout(() => member.roles.remove(lfgRole).catch(console.error), (duration * 1000 * 60));

    },
};