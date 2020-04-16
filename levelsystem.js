var xpData = JSON.parse(fs.readFileSync('./xp.json'));
var index = xpData.findIndex(entry => entry.id == message.author.id);
var time = new Date().getTime() / 1000;
var xpGiven = Math.round((Math.random() * 11) + 15);
var newData = {
  id: `${message.author.id}`,
  xp: xpGiven,
  level: 0,
  lastMessage: time
}
// console.log(newData);

if (index == -1) {
  xpData.push(newData);
} else if (Math.abs(time - parseInt(xpData[index].lastMessage)) < 60) {
  return;
} else {
  newData.lastMessage = time;
  newData.xp = parseInt(xpData[index].xp) + xpGiven;
  if (newData.xp > 5 * Math.pow(xpData[index].level, 2) + 50 * xpData[index].level + 100) {
    newData.level = parseInt(xpData[index].level) + 1;
    message.channel.send(config.levelUpMessage);
  } else {
    newData.level = parseInt(xpData[index].level);
  }
  xpData[index] = newData;
}

fs.writeFile("./xp,json", JSON.stringify(xpData, null, 2), finished);
function finished(err) {
  if (err) console.log(err);
  else console.log("XP Updated for " + message.author.tag);
}
