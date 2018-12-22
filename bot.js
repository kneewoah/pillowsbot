// BEFORE LAUNCH
const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});
const config = require("./config.json");
const moment = require('moment')

const timestamp = moment().format('HH:mm:ss');

// ON READY
client.on("ready", () => {
  console.log(`${timestamp} "Pillows Bot" ignition sequence has commenced.`);
});


// ON MESSAGE
client.on("message", async message => {

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(message.author.bot || message.content.indexOf(config.prefix) !== 0) return;

  try {
    let commandFile = require(`./commands/${command}.js`)
    commandFile.run(client, message, args);const timestamp = moment().format('HH:mm:ss');
    console.log(`${timestamp}: Processed command \'${command}\' sent by user \'${message.author.tag}\'.`);
  } catch (e) {
    console.log(e.stack);
  }

});

// TOKEN
client.login(config.token);
