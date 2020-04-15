const config = require("../config.json");

exports.run = async (client, message, args) => {

  var query;
  if (args[0].match(/^#(?:[0-9a-fA-F]{6})$/g)) {
    changeColor(args[0], message.author);
  } else if (args[0].match(/^(?:[0-9a-fA-F]{6})$/g)) {
    changeColor(args[0].substring(1), message.author);
  } else {
    message.channel.send("Please enter a 6 digit hex code. You can select a color here: <https://htmlcolorcodes.com/color-picker/>");
  }

function changeColor(color, author) {
  deleteRole(author.id);
  setTimeout(function() {makeRole(color, author.id)}, 400);
  setTimeout(function() {addRole(author)}, 1600);
};

function deleteRole(roleName) {
  if (message.guild.roles.find(role => role.name === roleName)) {
    message.guild.roles.find(role => role.name === roleName).delete();
    message.channel.send("Role deleted");
  }
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

function addRole(user) {
  let roleID = message.guild.roles.find(role => role.name === user.id).id;
  user.addRole(roleID);
};

};

exports.help = {
  description: "Get a custom role color in discord",
  usage: "!color #HEX43F"
};
