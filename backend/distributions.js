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
          backendCommands
            .execute("apt list --installed | awk -F '/' '{print $1}'", false)
            .then((output) => {
              resolve(output.split("\n"));
            })
            .catch(() => reject());
          break;

        case "dnf":
          backendCommands
            .execute("dnf list installed | awk -F '.' '{print $1}'", false)
            .then((output) => {
              resolve(output.split("\n"));
            })
            .catch(() => reject());
          break;

        case "pacman":
          backendCommands
            .execute("pacman -Q | awk '{print $1}'", false)
            .then((output) => {
              resolve(output.split("\n"));
            })
            .catch(() => reject());

          break;

        case "zypper":
          backendCommands
            .execute(
              "zypper packages --installed-only | awk -F '|' '{print $3}'",
              false
            )
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

  async setupFlatpak() {
    try {
      await backendCommands.hasCommand("flatpak");
      await backendCommands.execute(
        "flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo",
        false
      );
      if (this.name === "debian" || this.packageManager === "dnf") {
        const adwaitaDark = "org.gtk.Gtk3theme.Adwaita-dark";
        const hasAD = await backendCommands.execute(
          "flatpak list --columns=application | grep '" + adwaitaDark + "'",
          false
        );

        if (!hasAD) {
          await backendCommands.execute(
            "flatpak install flathub " + adwaitaDark + " -y",
            false
          );
        }
      }
    } catch (err) {}
  }

  async installFlatpak() {
    await this.install(["flatpak"]);
    await this.setupFlatpak();
  }

  async installSnap() {
    await this.install(["snapd"]);
    if (this.packageManager === "dnf") {
      await backendCommands.sudoExecute(
        "systemctl enable --now snapd.socket",
        false
      );
      await backendCommands.sudoExecute(
        "ln -s /var/lib/snapd/snap /snap",
        false
      );
    }
  }

  async update() {
    switch (this.packageManager) {
      case "apt":
        await backendCommands.sudoExecute(
          "apt update && apt upgrade -Vy",
          true
        );
        break;

      case "dnf":
        await backendCommands.sudoExecute("dnf upgrade --refresh -y", true);
        break;

      case "pacman":
        await backendCommands.sudoExecute("pacman -Syyu --noconfirm", true);
        break;

      case "zypper":
        await backendCommands.sudoExecute("zypper update --no-confirm", true);
        break;

      default:
        break;
    }
  }

  async autoremove() {
    switch (this.packageManager) {
      case "apt":
        await backendCommands.sudoExecute("apt autoremove -y", true);
        break;

      case "dnf":
        await backendCommands.sudoExecute("dnf autoremove -y", true);
        break;

      case "pacman":
        await backendCommands.sudoExecute(
          "pacman -Qdtq | pacman -Rs - --noconfirm",
          true
        );
        break;

      case "zypper":
        await backendCommands.sudoExecute(
          "zypper remove --clean-deps --no-confirm $(zypper packages --unneeded | awk -F '|' 'NR==0 || NR==1 || NR==2 || NR==3 || NR==4 {next} {print $3}')",
          true
        );
        break;

      default:
        break;
    }
  }

  async install(pkgs) {
    switch (this.packageManager) {
      case "apt":
        for (let pkg in pkgs) {
          await backendCommands.sudoExecute(
            "apt install " + pkgs[pkg] + " -y",
            true
          );
        }
        break;

      case "dnf":
        for (let pkg in pkgs) {
          await backendCommands.sudoExecute(
            "dnf install " + pkgs[pkg] + " -y",
            true
          );
        }
        break;

      case "pacman":
        for (let pkg in pkgs) {
          await backendCommands.sudoExecute(
            "pacman -S " + pkgs[pkg] + " --noconfirm --needed",
            true
          );
        }
        break;

      case "zypper":
        for (let pkg in pkgs) {
          await backendCommands.sudoExecute(
            "zypper install --no-confirm " + pkgs[pkg],
            true
          );
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
          await backendCommands.sudoExecute(
            "apt remove " + pkgs[pkg] + " -y",
            true
          );
        }
        break;

      case "dnf":
        for (let pkg in pkgs) {
          await backendCommands.sudoExecute(
            "dnf remove " + pkgs[pkg] + " -y",
            true
          );
        }
        break;

      case "pacman":
        for (let pkg in pkgs) {
          await backendCommands.sudoExecute(
            "pacman -Rsun " + pkgs[pkg] + " --noconfirm",
            true
          );
        }
        break;

      case "zypper":
        for (let pkg in pkgs) {
          await backendCommands.sudoExecute(
            "zypper remove --clean-deps --no-confirm " + pkgs[pkg],
            true
          );
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
    backendCommands
      .execute("head -n 1 /etc/os-release", false)
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
      });
  });
}

module.exports.getDistribution = getDistribution;
