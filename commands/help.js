const config = require("../config.json");
const fs = require("fs");

exports.run = (client, message, args) => {

  fs.readdir("./commands", (err, files) => {
      if(err) console.error(err);

      let cmdArray = files.filter(f => f.split(".").pop() === "js").sort().map(function(cmd) {return cmd.charAt(0).toUpperCase() + cmd.slice(1, cmd.length - 3)}).map(x => [x]);

      cmdArray.forEach(function(subArray) {
        var name = subArray[0];
        var cmdFile = require(`./${name}.js`);
        subArray.push(cmdFile.help.description, cmdFile.help.usage);
      });

      if(args[0]) {

        var cmdNameLower = args[0].toLowerCase()
        if (args[0].indexOf(config.prefix) === 0) {
          cmdNameLower = args[0].slice(1, args[0].length).toLowerCase();
        };
        var cmdName = cmdNameLower.charAt(0).toUpperCase() + cmdNameLower.slice(1, args[0].length);

        try {

          var cmdFile2 = require(`./${cmdNameLower}.js`)
          var cmdDesc = cmdFile2.help.description;
          var cmdUsage = cmdFile2.help.usage;

          message.author.send(`\`Newo Bot Commands\`\n__Command__: **${cmdName}**\n__Description__: ${cmdDesc}\n__Usage__: ${cmdUsage}`)

        } catch (e) {
          message.channel.send(`\'${cmdName}\' is not a valid command`);
        };

      } else {

          message.author.send(`\`Newo Bot Commands\` \n${cmdArray.map(subArray2 => `**${subArray2[0]}** \n__Description__: ${subArray2[1]} \n__Usage__: ${subArray2[2]}`).join('\n\n')}`);
      }



    });

};

exports.help = {
  description: "This command.",
  usage: `${config.prefix}help`
};
