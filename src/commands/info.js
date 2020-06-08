module.exports = {
    name: 'info',
    aliases: ['information', 'about', 'suggestions', 'improvements'],
    description: `This bot was created by Hade. If you have any feedback / suggestions, please send a message to @Hade`,
    execute(message, args) {
        return message.reply(`I am a bot that helps people find groups to play with. Use !help to find out more info. If you have find any bugs / have any feedback or suggestions, please send @Hade a message`)
    }
};