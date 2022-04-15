const backendCommands = require("./commands");

////////////////////////////////////////////////////////////////////////////////
// Define Functions

var hasGnome = false;
var hasKDE = false;

backendCommands
  .hasCommand("gnome-shell")
  .then(() => {
    hasGnome = true;
  })
  .catch(() => {});
backendCommands
  .hasCommand("kwriteconfig5")
  .then(() => {
    hasKDE = true;
  })
  .catch(() => {});

module.exports.hasGnome = hasGnome;
module.exports.hasKDE = hasKDE;
