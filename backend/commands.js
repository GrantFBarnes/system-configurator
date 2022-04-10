const process = require("child_process");
const sudo = require("sudo-prompt");

////////////////////////////////////////////////////////////////////////////////
// Define Functions

function displayOutput(command, output) {
  const div = document.getElementById("command-output");
  if (!div) return;

  const outputLines = output.split("\n");
  let divLines = div.innerHTML.split("\n");

  divLines.push("############################################################");
  divLines.push("$ " + command);
  divLines.push("############################################################");
  divLines = divLines.concat(outputLines);
  while (divLines.length > 10000) {
    divLines.shift();
  }
  div.innerHTML = divLines.join("<br />");
  div.scrollTop = div.scrollHeight;
}

function execute(command, print) {
  return new Promise((resolve, reject) => {
    process.exec(command, (error, stdout, stderr) => {
      if (error) {
        if (print) displayOutput(command, stderr);
        reject(stderr);
        return;
      }
      if (print) displayOutput(command, stdout);
      resolve(stdout);
      return;
    });
  });
}

function sudoExecute(command, print) {
  return new Promise((resolve, reject) => {
    sudo.exec(
      command,
      { name: "System Configurator" },
      (error, stdout, stderr) => {
        if (error) {
          if (print) displayOutput(command, stderr);
          reject(stderr);
          return;
        }
        if (print) displayOutput(command, stdout);
        resolve(stdout);
        return;
      }
    );
  });
}

function hasCommand(command) {
  return new Promise((resolve, reject) => {
    execute("command -v " + command + "  >/dev/null 2>&1", false)
      .then(() => {
        // has command
        resolve();
      })
      .catch(() => {
        // does not have command
        reject();
      });
  });
}

module.exports.execute = execute;
module.exports.sudoExecute = sudoExecute;
module.exports.hasCommand = hasCommand;
