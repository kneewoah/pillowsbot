// BEFORE LAUNCH
const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});
const config = require("./config.json");
const moment = require('moment')
const timestamp = moment().format('HH:mm:ss');

// ON READY
client.on("ready", () => {

  const owner = client.users.find(user => user.id === config.ownerID)
});


// ON MESSAGE
client.on("message", async message => {

  if(message.author.bot || message.content.indexOf(config.prefix) !== 0) return;

  var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  var command = args.shift().toLowerCase();

  var msgGuild;
  if(!message.guild) {
    msgGuild = "Direct Messages";
  } else {
    msgGuild = message.guild.name;
  };

  console.log(`${timestamp}: Attempting to process \'${command}\' sent by user \'${message.author.tag}\' in \'${msgGuild}\'...`)

  try {
    let commandFile = require(`./commands/${command}.js`)

    commandFile.run(client, message, args);
    console.log(`${timestamp}: Processed command \'${command}\' succesfully.`);
    message.react("☁")
  } catch (error) {
    console.log(`${timestamp}: Could not process command \'${command}\'.`);
    console.log(error);
  }

});
// USER JOIN

client.on("guildMemberAdd", member => {

  let roleName = `${member.id}`
  if(member.guild.roles.find(role => role.name === roleName)) {
    let roleID = member.guild.roles.find(role => role.name === roleName).id;
    member.addRole(roleID);
  } else {
    let channel = member.guild.channels.find(ch => ch.id === config.pillowsGeneralID || ch.id === config.testingChannelID);
    if (!channel) return;
    channel.send(`Welcome ${member.displayName}! Type \`!color #HEXCODEHERE\` to chose your role color! You can choose a color here: <https://tr.im/hexwheel>.`);
  };
});

// ERROR

client.on('error', console.error);

// TOKEN
client.login(process.env.TOKEN);
