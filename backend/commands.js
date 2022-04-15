const process = require("child_process");

////////////////////////////////////////////////////////////////////////////////
// Global Variables

let password = "";
var commands = {};

////////////////////////////////////////////////////////////////////////////////
// Define Class

class Command {
  constructor(command, sudo, print) {
    this.command = command;
    this.sudo = sudo ? true : false;
    this.print = print ? true : false;
  }

  run(parameter, append) {
    return new Promise((resolve, reject) => {
      let command = this.command;
      if (parameter) command = command.replace("${}", parameter);
      if (append) command += append;

      const print = this.print ? command : "";
      if (this.sudo) {
        command = "echo '" + password + "' | sudo -S -k " + command;
      }

      process.exec(command, (error, stdout, stderr) => {
        if (error) {
          if (print) displayOutput(print, stderr);
          reject(stderr);
          return;
        }
        if (print) displayOutput(print, stdout);
        resolve(stdout);
        return;
      });
    });
  }
}

////////////////////////////////////////////////////////////////////////////////
// Define Commands

// Update

commands["apt-update"] = new Command("apt update", true, true);
commands["apt-upgrade"] = new Command("apt upgrade -Vy", true, true);
commands["dnf-update"] = new Command("dnf upgrade --refresh -y", true, true);
commands["pacman-update"] = new Command("pacman -Syyu --noconfirm", true, true);
commands["zypper-update"] = new Command(
  "zypper update --no-confirm",
  true,
  true
);
commands["snap-update"] = new Command("snap refresh", true, true);
commands["flatpak-update"] = new Command("flatpak update -y", false, true);

// Autoremove

commands["apt-autoremove"] = new Command("apt autoremove -y", true, true);
commands["dnf-autoremove"] = new Command("dnf autoremove -y", true, true);
commands["pacman-autoremove"] = new Command(
  "pacman -Qdtq | pacman -Rs - --noconfirm",
  true,
  true
);
commands["zypper-autoremove"] = new Command(
  "zypper remove --clean-deps --no-confirm $(zypper packages --unneeded | awk -F '|' 'NR==0 || NR==1 || NR==2 || NR==3 || NR==4 {next} {print $3}')",
  true,
  true
);
commands["flatpak-autoremove"] = new Command(
  "flatpak remove --unused -y",
  false,
  true
);

// Install

commands["apt-install"] = new Command("apt install ${} -y", true, true);
commands["dnf-install"] = new Command("dnf install ${} -y", true, true);
commands["pacman-install"] = new Command(
  "pacman -S ${} --noconfirm --needed",
  true,
  true
);
commands["zypper-install"] = new Command(
  "zypper install --no-confirm ${}",
  true,
  true
);
commands["snap-install"] = new Command("snap install ${}", true, true);
commands["flatpak-install"] = new Command(
  "flatpak install flathub ${} -y",
  true,
  true
);

// Remove

commands["apt-remove"] = new Command("apt remove ${} -y", true, true);
commands["dnf-remove"] = new Command("dnf remove ${} -y", true, true);
commands["pacman-remove"] = new Command(
  "pacman -Rsun ${} --noconfirm",
  true,
  true
);
commands["zypper-remove"] = new Command(
  "zypper remove --clean-deps --no-confirm ${}",
  true,
  true
);
commands["snap-remove"] = new Command("snap remove ${}", true, true);
commands["flatpak-remove"] = new Command("flatpak remove ${} -y", true, true);

// Get Installed

commands["apt-installed"] = new Command(
  "apt list --installed | awk -F '/' '{print $1}'"
);
commands["dnf-installed"] = new Command(
  "dnf list installed | awk -F '.' '{print $1}'"
);
commands["pacman-installed"] = new Command("pacman -Q | awk '{print $1}'");
commands["zypper-installed"] = new Command(
  "zypper packages --installed-only | awk -F '|' '{print $3}'"
);
commands["snap-installed"] = new Command("snap list | awk '{print $1}'");
commands["flatpak-installed"] = new Command(
  "flatpak list --app | awk -F '\t' '{print $2}'"
);

// MISC

commands["has-command"] = new Command("command -v ${} >/dev/null 2>&1");
commands["get-distro"] = new Command("head -n 1 /etc/os-release");

commands["snap-systemd"] = new Command(
  "systemctl enable --now snapd.socket",
  true
);
commands["snap-link"] = new Command("ln -s /var/lib/snapd/snap /snap", true);

commands["flatpak-remote-add"] = new Command(
  "flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo"
);

////////////////////////////////////////////////////////////////////////////////
// Define Functions

function displayOutput(command, output) {
  const div = document.getElementById("bottom-display");
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

function hasCommand(command) {
  return new Promise((resolve, reject) => {
    process.exec("command -v " + command + "  >/dev/null 2>&1", (error) => {
      if (error) {
        reject();
        return;
      }
      resolve();
      return;
    });
  });
}

function checkPassword(pw) {
  return new Promise((resolve, reject) => {
    process.exec("echo '" + pw + "' | sudo -S -k echo 0", (error) => {
      if (error) {
        reject();
        return;
      }
      password = pw;
      resolve();
      return;
    });
  });
}

////////////////////////////////////////////////////////////////////////////////
// Exports

module.exports.commands = commands;
module.exports.hasCommand = hasCommand;
module.exports.checkPassword = checkPassword;
