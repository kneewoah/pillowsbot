const config = require("../config.json");

exports.run = async (client, message, args) => {

  var author = `${message.author}`;

  var query;
  if (args[0].match(/^#(?:[0-9a-fA-F]{6})$/g)) {
    query = args[0]
    changeColor();
  } else if (args[0].match(/^(?:[0-9a-fA-F]{6})$/g)) {
    query = args[0].substring(1);
    changeColor();
  } else {
    message.channel.send("Please enter a 6 digit hex code. You can select a color here: <https://htmlcolorcodes.com/color-picker/>");
  }

};

function changeColor() {
  deleteRole();
  setTimeout(function() {makeRole(query, author.id)}, 400);
  setTimeout(function() {addRole(author.id)}, 800);
};

function deleteRole() {
  let role = await findRole();
  if (role) role.delete();
};

function findRole(roleName) {
  return message.guild.roles.find(role => role.name === roleName);
};

function makeRole(color, id) {
  message.guild.createRole({
    name: id,
    color: `0x${color}`,
    hoist: false,
    mentionable: false,
  });
};

function addRole(id) {
  let role = await findRole(id);
  message.member.addRole(roleID.id);
};

exports.help = {
  description: "Get a custom role color in discord",
  usage: "!color #HEX43F"
};
