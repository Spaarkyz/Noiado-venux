const Discord = require('discord.js');
const bot = new Discord.Client();

const config = require('./config.json');
var prefix = config.prefix
const links = require('./links.json')


bot.on('ready', () => {
    console.log('logado');
});

bot.on('message', message => {
    responseObject = links;
    if(responseObject[message.content]){
        message.channel.send(responseObject[message.content]);
    }

    if(message.content.startsWith(config.prefix + '!ping')){
        message.reply('pong');
        message.channel.send('pong2');
    }

});

bot.login('NDczOTk3NDgwMDI4MDEyNTU0.DkKgHQ.D7axPzKwpDleESP5HpXt18WI_wY');

bot.on("message", (message) => {

    if (message.channel.type == "dm") return;
    if (message.author.bot) return;
    if (message.content.startsWith(!prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);

    let args = message.content.split(" ").slice(1);

    try {
        let commandFile = require(`./comandos/${command}.js`);
        commandFile.run(bot, message, args);
    } catch (err) {

        if (err.code == "MODULE_NOT_FOUND") return;
        console.error(err);
        bot.user.setActivity("💯 dm!ajuda 💯 no Tando Land!",{url:"Bot em desenvolvimento By:Spaarkyz"})

    }

});
