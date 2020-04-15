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
};

async function changeColor(color, who) {
  deleteRole();
  setTimeout(function() {makeRole(color, who.id)}, 400);
  setTimeout(function() {addRole(who.id)}, 800);
};

async function deleteRole() {
  let role = await findRole();
  if (role) role.delete();
};

async function findRole(roleName) {
  return message.guild.roles.find(role => role.name === roleName);
};

async function makeRole(color, id) {
  message.guild.createRole({
    name: id,
    color: `0x${color}`,
    hoist: false,
    mentionable: false,
  });
};

async function addRole(id) {
  let role = await findRole(id);
  message.member.addRole(roleID.id);
};

exports.help = {
  description: "Get a custom role color in discord",
  usage: "!color #HEX43F"
};
