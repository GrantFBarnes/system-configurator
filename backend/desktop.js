const backendCommands = require("./commands");

////////////////////////////////////////////////////////////////////////////////
// Define Functions

backendCommands
  .hasCommand("gnome-shell")
  .then(() => {
    module.exports.hasGnome = true;
  })
  .catch(() => {
    module.exports.hasGnome = false;
  });

backendCommands
  .hasCommand("plasmashell")
  .then(() => {
    module.exports.hasKDE = true;
  })
  .catch(() => {
    module.exports.hasKDE = false;
  });
