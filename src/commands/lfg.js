module.exports = {
    name: 'lfg',
    description: 'Use this to signal that you are looking for a group to play with',
    guildOnly: false,
    args: false,
    cooldown: 5,
    execute(message, args) {
        message.channel.send('Pong.');
    },
};