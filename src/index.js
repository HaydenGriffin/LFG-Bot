require('dotenv').config()

const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection;

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
    client.user.setPresence({
            activity: {
                name: ': !help !lfg !lfm',
                type: 'LISTENING',
            },
            status: 'idle'
        })
        .catch(console.error);
    console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    const permissionRoleName = process.env.PERMISSION_ROLE_NAME;
    const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.requirePermissions && !message.member.roles.cache.some(role => role.name === `${permissionRoleName}`)) {
        return message.reply(`this command requires the ${permissionRoleName} role, which you don't have.`)
    }

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply(`this command can only be executed in a server text channel!`)
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`
        if (command.usage) {
            reply += `/nThe proper usage is: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply)
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTimestamp = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTimestamp) {
            const timeLeft = (expirationTimestamp - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args)
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

client.login(process.env.TOKEN);