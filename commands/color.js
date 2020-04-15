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

async function changeColor(color, who) {
  deleteRole();
  setTimeout(function() {makeRole(color, who.id)}, 400);
  setTimeout(function() {addRole(who.id)}, 1200);
};

async function deleteRole() {
  let role = await message.guild.roles.find(role => role.name === roleName);
  if (role) role.delete();
  message.channel.send("Role deleted");
};

async function makeRole(color, id) {
  message.guild.createRole({
    name: `${id}`,
    color: `0x${color}`,
    hoist: false,
    mentionable: false,
  });
  message.channel.send("Role maked");
};

async function addRole(id) {
  let role = await message.guild.roles.find(role => role.name === roleName);
  message.member.addRole(role.id);
};

};

exports.help = {
  description: "Get a custom role color in discord",
  usage: "!color #HEX43F"
};
