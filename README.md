# LFG-Bot
A discord bot to help people to find groups to play games with. The app is deployed on Heroku and used in production on a few servers. By Hade

## About
This bot was created using node.js and discord.js.

## Environment variables
A .env file is required in order to run the bot. A .env.template file has been included to show the variables that are required.

### PREFIX
The character that is entered to trigger the bots commands.

### LFG_ROLE_NAME
The name of the 'LFG' role on the server that the bot will be running on.

### PERMISSION_ROLE_NAME
the name of the 'permissioned' role that allows the use of the 'rm' command.

### TOKEN
The key for the discord bot.

## Commands
### lfg
Assigns the user to the role **LFG_ROLE_NAME** as configured in the .env file. Optional second argument can be used to specify the duration that the user wishes to be placed in the 'LFG' role for.

### lfm
Sends a message to the text channel that the command is executed in, tagging the 'LFG' role and all users within the role. Aliases include: lf1/2, lf1m, lf2m, lf3m, lf1, lf2, lf3

### rm
A permissioned command that allows the removal of multiple users from the 'LFG' role. Only executable by a 'PERMISSION_ROLE_NAME' user. Requires at least one additional argument, in the form of a mentioned user [@user]. Aliases include remove.

### stop
Removes the user from the 'LFG' role. Aliases include exit and quit.

### info
Provides info about the bot, and where to provide feedback / report bugs. 

### help
Direct messages the user and provides information about all the commands that the bot can do. Direct messaging the bot !help [command name] provides specific information pertaining to the specified command.

## Launching the application
1. `npm install`
2. `nodemon .\src\index.js`
