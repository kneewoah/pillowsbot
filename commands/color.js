const config = require("../config.json");

exports.run = async (client, message, args) => {

var queryColor = args[0];
var roleName = `${message.author.id}`

function deleteRole() {
  if(message.guild.roles.find(role => role.name === roleName)) {
    message.guild.roles.find(role => role.name === roleName).delete();
  };

};

function makeRole() {
  message.guild.createRole({
    name: roleName,
    color: `0x${queryColor.slice(1)}`,
    hoist: false,
    mentionable: false,
  });
};

function findAddRole() {
  var roleID = message.guild.roles.find(role => role.name === roleName).id;
  message.member.addRole(roleID);
};

if(queryColor.startsWith("#") && queryColor.length === 7) {

  deleteRole();
  setTimeout(function(){
    makeRole();
  }, 400);
  setTimeout(function(){
    findAddRole();
  }, 800);
  message.channel.send("Role color updated!")

} else {
  message.channel.send("Please enter a 6 digit hex code.");

}};


exports.help = {
  description: "Get a custom role color in discord",
  usage: "!color #HEX43F"
};
