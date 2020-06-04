require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.TOKEN;

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.content === '!ping') {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('Pongs.');
    }
});

client.login(token);