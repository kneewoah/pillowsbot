const config = require("../config.json");

exports.run = async (client, message, args) => {

  var author = `${message.author}`;

  var query;
  if (args[0].match(/^#(?:[0-9a-fA-F]{6})$/g)) {
    query = args[0]
    changeColor(query, author);
  } else if (args[0].match(/^(?:[0-9a-fA-F]{6})$/g)) {
    query = args[0].substring(1);
    changeColor(query, author);
  } else {
    message.channel.send("Please enter a 6 digit hex code. You can select a color here: <https://htmlcolorcodes.com/color-picker/>");
  }

function changeColor(color, who) {
  deleteRole(who.id);
  setTimeout(function() {makeRole(color, who.id)}, 400);
  setTimeout(function() {addRole(who.id)}, 1600);
};

function deleteRole(roleName) {
  if (message.guild.roles.find(role => role.name === roleName)) message.guild.roles.find(role => role.name === roleName).delete();
  message.channel.send("Role deleted");
};

function makeRole(color, id) {
  message.guild.createRole({
    name: `${id}`,
    color: `0x${color}`,
    hoist: false,
    mentionable: false,
  });
  message.channel.send("Role maked");
};

function addRole(roleName) {
  let roleID = message.guild.roles.find(role => role.name === roleName).id;
  message.member.addRole(roleID);
};

};

exports.help = {
  description: "Get a custom role color in discord",
  usage: "!color #HEX43F"
};
