// BEFORE LAUNCH
const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});
const config = require('./config.json');
const moment = require('moment');
const fs = require('fs');
const mysql = require('mysql');

// ON READY
client.on('ready', () => {
  const owner = client.users.find(user => user.id === config.ownerID)
});

// CONNECT TO DATABASE
var con = mysql.createConnection({
  host: "process.env.DATABASE_HOST",
  user: "process.env.DATABASE_USER",
  password: "process.env.DATABASE_PASSWORD",
  database: "process.env.DATABASE"
});

con.connect(err => {
  if(err) throw err;
  console.log("Connected to database");
});

// FUNCTIONS
function generateXp() {
  return 20; //update
}


// ON MESSAGE
client.on('message', async message => {
  // XP HANDLER 
  con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
    if(err) throw err;

    let sql;

    if(rows.length < 1) {
      sql = `INSERT INTO xp (id, xp) VALUES ('${message.author.id}', ${generateXp()})`;
    } else {
      let xp = rows[0].xp;
      sql = `UPDATE xp SET xp = ${xp + generateXp()} WHERE id = '${message.author.id}'`;
    }

    con.query(sql, console.log);
  });
  
  var timestamp = moment().format('HH:mm:ss');

  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;

  var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  var command = args.shift().toLowerCase();
  var msgGuild = (!message.guild) ? "Direct Messages" : message.guild.name;

  console.log(`${timestamp}: Attempting to process \'${command}\' sent by user \'${message.author.tag}\' in \'${msgGuild}\'...`)

  try {
    let commandFile = require(`./commands/${command}.js`)

    commandFile.run(client, message, args, con);
    console.log(`${timestamp}: Processed command \'${command}\' succesfully.`);
    message.react('☁');
  } catch (error) {
    console.log(`${timestamp}: Could not process command \'${command}\'.`);
    console.log(error);
  }

});
// USER JOIN

client.on('guildMemberAdd', member => {

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
