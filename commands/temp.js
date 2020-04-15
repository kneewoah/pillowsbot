// XP System
const config = require("../config.json");

exports.run = async (client, message, args) => {
  var xpData = JSON.parse(fs.readFileSync('../xp.json'));
  var index = xpData.findIndex(entry => entry.id == message.author.id);
  // if (!index) {
  //   var newData = {
  //     id: `${message.author.id}`,
  //     xp: 0,
  //     level: 0,
  //     lastMessage: ""
  //   }
  // }
  console.log(xpData);
  console.log(index);

};

exports.help = {
  description: "ban a user (Admin+).",
  usage: `${config.prefix}ban <user> <reason>`
};
