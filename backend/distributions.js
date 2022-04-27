const backendCommands = require("./commands");

////////////////////////////////////////////////////////////////////////////////
// Define Class

class Distribution {
  constructor(name, repository, packageManager) {
    this.name = name;
    this.repository = repository;
    this.packageManager = packageManager;
  }

  getInstalledRepo() {
    return new Promise((resolve, reject) => {
      switch (this.packageManager) {
        case "apt":
          backendCommands.commands["apt-installed"]
            .run()
            .then((output) => {
              resolve(output.split("\n"));
            })
            .catch(() => reject());
          break;

        case "dnf":
          backendCommands.commands["dnf-installed"]
            .run()
            .then((output) => {
              resolve(output.split("\n"));
            })
            .catch(() => reject());
          break;

        case "pacman":
          backendCommands.commands["pacman-installed"]
            .run()
            .then((output) => {
              resolve(output.split("\n"));
            })
            .catch(() => reject());

          break;

        case "zypper":
          backendCommands.commands["zypper-installed"]
            .run()
            .then((output) => {
              resolve(output.split("\n"));
            })
            .catch(() => reject());
          break;

        default:
          reject();
          break;
      }
    });
  }

  async installFlatpak() {
    backendCommands
      .hasCommand("flatpak")
      .then(() => {
        backendCommands.commands["flatpak-remote-add"].run();
      })
      .catch(() => {
        this.install(["flatpak"]).then(() => {
          backendCommands.commands["flatpak-remote-add"].run();
        });
      });
  }

  async installSnap() {
    backendCommands
      .hasCommand("snap")
      .then(() => {})
      .catch(() => {
        this.install(["snapd"]).then(() => {
          if (this.packageManager === "dnf") {
            backendCommands.commands["snap-systemd"].run();
            backendCommands.commands["snap-link"].run();
          }
        });
      });
  }

  async update() {
    switch (this.packageManager) {
      case "apt":
        await backendCommands.commands["apt-update"].run();
        await backendCommands.commands["apt-upgrade"].run();
        break;

      case "dnf":
        await backendCommands.commands["dnf-update"].run();
        break;

      case "pacman":
        await backendCommands.commands["pacman-update"].run();
        break;

      case "zypper":
        await backendCommands.commands["zypper-update"].run();
        break;

      default:
        break;
    }
  }

  async autoremove() {
    switch (this.packageManager) {
      case "apt":
        await backendCommands.commands["apt-autoremove"].run();
        break;

      case "dnf":
        await backendCommands.commands["dnf-autoremove"].run();
        break;

      case "pacman":
        await backendCommands.commands["pacman-autoremove"].run();
        break;

      case "zypper":
        await backendCommands.commands["zypper-autoremove"].run();
        break;

      default:
        break;
    }
  }

  async install(pkgs) {
    switch (this.packageManager) {
      case "apt":
        for (let pkg in pkgs) {
          await backendCommands.commands["apt-install"].run(pkgs[pkg]);
        }
        break;

      case "dnf":
        for (let pkg in pkgs) {
          await backendCommands.commands["dnf-install"].run(pkgs[pkg]);
        }
        break;

      case "pacman":
        for (let pkg in pkgs) {
          await backendCommands.commands["pacman-install"].run(pkgs[pkg]);
        }
        break;

      case "zypper":
        for (let pkg in pkgs) {
          await backendCommands.commands["zypper-install"].run(pkgs[pkg]);
        }
        break;

      default:
        break;
    }
  }

  async uninstall(pkgs) {
    switch (this.packageManager) {
      case "apt":
        for (let pkg in pkgs) {
          await backendCommands.commands["apt-remove"].run(pkgs[pkg]);
        }
        break;

      case "dnf":
        for (let pkg in pkgs) {
          await backendCommands.commands["dnf-remove"].run(pkgs[pkg]);
        }
        break;

      case "pacman":
        for (let pkg in pkgs) {
          await backendCommands.commands["pacman-remove"].run(pkgs[pkg]);
        }
        break;

      case "zypper":
        for (let pkg in pkgs) {
          await backendCommands.commands["zypper-remove"].run(pkgs[pkg]);
        }
        break;

      default:
        break;
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
// Define Functions

function getDistribution() {
  return new Promise((resolve, reject) => {
    backendCommands.commands["get-distro"]
      .run()
      .then((output) => {
        let distro = "";
        if (output.indexOf("Alma") >= 0) {
          distro = "alma";
        } else if (output.indexOf("Arch") >= 0) {
          distro = "arch";
        } else if (output.indexOf("CentOS") >= 0) {
          distro = "centos";
        } else if (output.indexOf("Debian") >= 0) {
          distro = "debian";
        } else if (output.indexOf("Fedora") >= 0) {
          distro = "fedora";
        } else if (output.indexOf("LMDE") >= 0) {
          distro = "lmde";
        } else if (output.indexOf("Manjaro") >= 0) {
          distro = "manjaro";
        } else if (output.indexOf("Mint") >= 0) {
          distro = "mint";
        } else if (output.indexOf("Pop!_OS") >= 0) {
          distro = "pop";
        } else if (output.indexOf("Rocky") >= 0) {
          distro = "rocky";
        } else if (output.indexOf("SUSE") >= 0) {
          distro = "suse";
        } else if (output.indexOf("Ubuntu") >= 0) {
          distro = "ubuntu";
        } else {
          alert("Distribution Not Recognized");
          reject();
          return;
        }

        let repository = "";
        switch (distro) {
          case "arch":
          case "manjaro":
            repository = "arch";
            break;

          case "debian":
          case "lmde":
            repository = "debian";
            break;

          case "fedora":
            repository = "fedora";
            break;

          case "alma":
          case "centos":
          case "rocky":
            repository = "redhat";
            break;

          case "mint":
          case "pop":
          case "ubuntu":
            repository = "ubuntu";
            break;

          case "suse":
            repository = "suse";
            break;

          default:
            break;
        }

        let packageManager = "";
        switch (distro) {
          case "debian":
          case "lmde":
          case "mint":
          case "pop":
          case "ubuntu":
            packageManager = "apt";
            break;

          case "alma":
          case "centos":
          case "fedora":
          case "rocky":
            packageManager = "dnf";
            break;

          case "arch":
          case "manjaro":
            packageManager = "pacman";
            break;

          case "suse":
            packageManager = "zypper";
            break;

          default:
            break;
        }

        resolve(new Distribution(distro, repository, packageManager));
      })
      .catch(() => {});
  });
}

module.exports.getDistribution = getDistribution;
