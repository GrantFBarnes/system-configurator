const { contextBridge } = require("electron");

const backendCommands = require("./backend/commands");
const backendDesktop = require("./backend/desktop");
const backendDistributions = require("./backend/distributions");
const backendPackages = require("./backend/packages");

////////////////////////////////////////////////////////////////////////////////
// Global Variables

var distribution = null;
const packages = backendPackages.packages;
const groups = backendPackages.groups;
var showAllDE = false;
var currentInstalled = {};
var selectedInstalls = {};
var pendingChanges = {};

////////////////////////////////////////////////////////////////////////////////
// Package Functions

function installPackage(pkg, method) {
  return new Promise((resolve, reject) => {
    const package = packages[pkg];
    if (method === "repo") {
      if (!package.repo) {
        reject();
        return;
      }
      distribution
        .install(package.repo.getRepo(distribution))
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    } else if (method === "flatpak") {
      if (!package.flatpak) {
        reject();
        return;
      }
      distribution
        .installFlatpak()
        .then(() => {
          backendCommands.commands["flatpak-install"]
            .run(package.flatpak.name)
            .then(() => {
              resolve();
            })
            .catch(() => {
              reject();
            });
        })
        .catch(() => {});
    } else if (method === "snap") {
      if (!package.snap) {
        reject();
        return;
      }
      distribution
        .installSnap()
        .then(() => {
          backendCommands.commands["snap-install"]
            .run(package.snap.name, package.snap.classic ? " --classic" : "")
            .then(() => {
              resolve();
            })
            .catch(() => {
              reject();
            });
        })
        .catch(() => {});
    }
  });
}

function uninstallPackage(pkg, method) {
  return new Promise((resolve, reject) => {
    const package = packages[pkg];
    if (method === "repo") {
      if (!package.repo) {
        reject();
        return;
      }
      distribution
        .uninstall(package.repo.getRepo(distribution))
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    } else if (method === "flatpak") {
      if (!package.flatpak) {
        reject();
        return;
      }
      backendCommands.commands["flatpak-remove"]
        .run(package.flatpak.name)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    } else if (method === "snap") {
      if (!package.snap) {
        reject();
        return;
      }
      backendCommands.commands["snap-remove"]
        .run(package.snap.name)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    }
  });
}

async function syncPackages() {
  const mainDiv = document.getElementById("main");
  const packages = Object.keys(pendingChanges);
  for (let pkg of packages) {
    if (mainDiv) mainDiv.className = "blur";
    try {
      if (pendingChanges[pkg].uninstall) {
        await uninstallPackage(pkg, pendingChanges[pkg].uninstall);
      }
      if (pendingChanges[pkg].install) {
        await installPackage(pkg, pendingChanges[pkg].install);
      }
      delete pendingChanges[pkg];
      currentInstalled[pkg] = selectedInstalls[pkg];
      handlePackageChangeHTML(pkg);
    } catch (err) {
      alert("Failed to handle " + pkg);
    }
  }
  generateHTML();
}

async function updatePackages() {
  const mainDiv = document.getElementById("main");
  if (mainDiv) mainDiv.className = "blur";
  try {
    await distribution.update();
  } catch (err) {}
  backendCommands
    .hasCommand("flatpak")
    .then(() => {
      backendCommands.commands["flatpak-update"].run();
    })
    .catch(() => {});
  backendCommands
    .hasCommand("snap")
    .then(() => {
      backendCommands.commands["snap-update"].run();
    })
    .catch(() => {});
  if (mainDiv) mainDiv.className = "";
}

async function autoremovePackages() {
  const mainDiv = document.getElementById("main");
  if (mainDiv) mainDiv.className = "blur";
  try {
    await distribution.autoremove();
  } catch (err) {}
  backendCommands
    .hasCommand("flatpak")
    .then(() => {
      backendCommands.commands["flatpak-autoremove"].run();
    })
    .catch(() => {});
  if (mainDiv) mainDiv.className = "";
}

function selectPackage(pkg, method) {
  selectedInstalls[pkg] = method;

  if (selectedInstalls[pkg] === currentInstalled[pkg]) {
    delete pendingChanges[pkg];
  } else {
    pendingChanges[pkg] = {};
    if (currentInstalled[pkg]) {
      pendingChanges[pkg].uninstall = currentInstalled[pkg];
    }
    if (selectedInstalls[pkg]) {
      pendingChanges[pkg].install = selectedInstalls[pkg];
    }
  }

  handlePackageChangeHTML(pkg);
}

////////////////////////////////////////////////////////////////////////////////
// HTML Functions

function setChangesDisplayInnerHTML() {
  const changesDisplay = document.getElementById("changes-display");
  if (!changesDisplay) return;
  changesDisplay.innerHTML = "";

  const pendingChangesCount = Object.keys(pendingChanges).length;
  const syncButton = document.getElementById("nav-link-sync-packages");
  if (syncButton) syncButton.hidden = pendingChangesCount === 0;

  if (pendingChangesCount === 0) {
    changesDisplay.innerHTML = "There are no pending changes";
    return;
  }
  changesDisplay.innerHTML = "The following changes are pending:<br />";

  const table = document.createElement("table");
  const headerRow = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.innerHTML = "Package";
  const th2 = document.createElement("th");
  th2.innerHTML = "Install";
  const th3 = document.createElement("th");
  th3.innerHTML = "Uninstall";
  headerRow.appendChild(th1);
  headerRow.appendChild(th2);
  headerRow.appendChild(th3);
  table.appendChild(headerRow);

  for (let pkg in pendingChanges) {
    const pkgRow = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerHTML = pkg;
    const td2 = document.createElement("td");
    if (pendingChanges[pkg].install) {
      td2.innerHTML = pendingChanges[pkg].install;
    }
    const td3 = document.createElement("td");
    if (pendingChanges[pkg].uninstall) {
      td3.innerHTML = pendingChanges[pkg].uninstall;
    }
    pkgRow.appendChild(td1);
    pkgRow.appendChild(td2);
    pkgRow.appendChild(td3);
    table.appendChild(pkgRow);
  }
  changesDisplay.appendChild(table);
}

function getPackageButtonClassName(pkg, method) {
  let className = "button pkg-button pkg-button-" + method;
  if (method === "snap") {
    if (packages[pkg].snap) {
      if (packages[pkg].snap.official) {
        className += " pkg-button-snap-official";
      }
    }
  }
  if (currentInstalled[pkg] !== method && selectedInstalls[pkg] !== method) {
    className += " transparent25";
  } else if (currentInstalled[pkg] !== selectedInstalls[pkg]) {
    className += " transparent75";
  }
  return className;
}

function getPackageButtonInnerHTML(pkg, method) {
  if (currentInstalled[pkg] === method && selectedInstalls[pkg] === method) {
    return "<i class='fa fa-" + (method ? "check" : "times") + "-circle'></i>";
  }
  if (currentInstalled[pkg] === method && selectedInstalls[pkg] !== method) {
    return "<i class='fa fa-times-circle-o'></i>";
  }
  if (currentInstalled[pkg] !== method && selectedInstalls[pkg] === method) {
    return "<i class='fa fa-check-circle-o'></i>";
  }
  return "<i class='fa fa-circle-o'></i>";
}

function handlePackageChangeHTML(pkg) {
  setChangesDisplayInnerHTML();
  for (let method of ["repo", "flatpak", "snap", ""]) {
    const button = document.getElementById("pkg-button-" + method + "-" + pkg);
    if (!button) continue;
    button.className = getPackageButtonClassName(pkg, method);
    button.innerHTML = getPackageButtonInnerHTML(pkg, method);
  }
}

function generateHTML() {
  const mainDiv = document.getElementById("main");
  if (mainDiv) mainDiv.className = "blur";
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  const settingsDiv = document.createElement("div");
  settingsDiv.class = "row";
  const col12div = document.createElement("div");
  col12div.class = "col-12";
  const centerDiv = document.createElement("div");
  centerDiv.class = "center";
  centerDiv.innerHTML = "Show All DE Apps:";
  const deInput = document.createElement("input");
  deInput.type = "checkbox";
  deInput.checked = showAllDE ? true : false;
  deInput.onclick = () => {
    showAllDE = !showAllDE;
    generateHTML();
  };
  centerDiv.appendChild(deInput);
  col12div.appendChild(centerDiv);
  settingsDiv.appendChild(col12div);
  contentDiv.appendChild(settingsDiv);

  const table = document.createElement("table");
  table.className = "center";

  for (let group in groups) {
    const groupRow = document.createElement("tr");
    const groupCell = document.createElement("th");
    groupCell.colSpan = 6;
    groupCell.className = "group-cell";
    const groupHeader = document.createElement("h3");
    groupHeader.innerHTML = group;
    groupCell.appendChild(groupHeader);
    groupRow.appendChild(groupCell);
    table.appendChild(groupRow);

    const labelRow = document.createElement("tr");
    const th1 = document.createElement("th");
    th1.innerHTML = "Package";
    labelRow.appendChild(th1);
    const th2 = document.createElement("th");
    th2.innerHTML = "Description";
    labelRow.appendChild(th2);
    const th3 = document.createElement("th");
    th3.innerHTML = "Repo";
    labelRow.appendChild(th3);
    const th4 = document.createElement("th");
    th4.innerHTML = "Flatpak";
    labelRow.appendChild(th4);
    const th5 = document.createElement("th");
    th5.innerHTML = "Snap";
    labelRow.appendChild(th5);
    const th6 = document.createElement("th");
    th6.innerHTML = "Remove";
    labelRow.appendChild(th6);
    table.appendChild(labelRow);

    for (let p in groups[group]) {
      const pkg = groups[group][p];
      const package = packages[pkg];
      let hasMethod = new Set();

      if (package.repo) {
        if (package.repo.getRepo(distribution).length) hasMethod.add("repo");
      }
      if (package.flatpak) hasMethod.add("flatpak");
      if (package.snap) hasMethod.add("snap");

      if (!hasMethod.size) continue;

      const pkgRow = document.createElement("tr");
      if (package.de == "gnome") {
        pkgRow.style.color = "#004d99";
        if (!backendDesktop.hasGnome && !showAllDE) {
          continue;
        }
      } else if (package.de == "kde") {
        pkgRow.style.color = "#009900";
        if (!backendDesktop.hasKDE && !showAllDE) {
          continue;
        }
      }
      const pkgNameCell = document.createElement("td");
      pkgNameCell.innerHTML = package.name;
      pkgRow.appendChild(pkgNameCell);
      const pkgDescCell = document.createElement("td");
      pkgDescCell.innerHTML = package.description;
      pkgRow.appendChild(pkgDescCell);
      for (let method of ["repo", "flatpak", "snap", ""]) {
        const pkgCell = document.createElement("td");
        if (!method || hasMethod.has(method)) {
          const pkgButton = document.createElement("button");
          pkgButton.id = "pkg-button-" + method + "-" + pkg;
          pkgButton.className = getPackageButtonClassName(pkg, method);
          pkgButton.innerHTML = getPackageButtonInnerHTML(pkg, method);
          pkgButton.onclick = () => selectPackage(pkg, method);
          pkgCell.appendChild(pkgButton);
        }
        pkgRow.appendChild(pkgCell);
      }
      table.appendChild(pkgRow);
    }
  }
  contentDiv.appendChild(table);
  if (mainDiv) mainDiv.className = "";
  setChangesDisplayInnerHTML();
}
////////////////////////////////////////////////////////////////////////////////
// Get Installed Functions

function getInstalledFlatpaks() {
  return new Promise((resolve) => {
    backendCommands
      .hasCommand("flatpak")
      .then(() => {
        backendCommands.commands["flatpak-installed"]
          .run()
          .then((list) => {
            resolve(list.split("\n"));
          })
          .catch(() => resolve([]));
      })
      .catch(() => resolve([]));
  });
}

function getInstalledSnaps() {
  return new Promise((resolve) => {
    backendCommands
      .hasCommand("snap")
      .then(() => {
        backendCommands.commands["snap-installed"]
          .run()
          .then((list) => {
            resolve(list.split("\n"));
          })
          .catch(() => resolve([]));
      })
      .catch(() => resolve([]));
  });
}

function getInstalledPackages() {
  distribution
    .getInstalledRepo()
    .then((installedRepo) => {
      getInstalledFlatpaks()
        .then((installedFlatpaks) => {
          getInstalledSnaps()
            .then((installedSnaps) => {
              for (let pkg in packages) {
                currentInstalled[pkg] = "";
                selectedInstalls[pkg] = "";
                const package = packages[pkg];

                if (package.repo) {
                  const packageRepo = package.repo.getRepo(distribution);
                  for (let r in packageRepo) {
                    if (installedRepo.indexOf(packageRepo[r]) >= 0) {
                      currentInstalled[pkg] = "repo";
                      selectedInstalls[pkg] = "repo";
                      break;
                    }
                  }
                }
                if (package.flatpak) {
                  if (installedFlatpaks.indexOf(package.flatpak.name) >= 0) {
                    currentInstalled[pkg] = "flatpak";
                    selectedInstalls[pkg] = "flatpak";
                  }
                }
                if (package.snap) {
                  if (installedSnaps.indexOf(package.snap.name) >= 0) {
                    currentInstalled[pkg] = "snap";
                    selectedInstalls[pkg] = "snap";
                  }
                }
              }
              generateHTML();
            })
            .catch(() => {});
        })
        .catch(() => {});
    })
    .catch(() => {});
}

////////////////////////////////////////////////////////////////////////////////
// Init

function checkPassword() {
  const mainDiv = document.getElementById("main");
  if (mainDiv) mainDiv.className = "blur";
  const passwordInput = document.getElementById("password-input");
  if (!passwordInput) return;
  backendCommands
    .checkPassword(passwordInput.value)
    .then(() => {
      backendDistributions
        .getDistribution()
        .then((distro) => {
          distribution = distro;
          getInstalledPackages();
        })
        .catch(() => {});
    })
    .catch(() => {
      passwordInput.style.background = "red";
      alert("Password is not valid!");
      if (mainDiv) mainDiv.className = "";
    });
}

////////////////////////////////////////////////////////////////////////////////
// Context Bridge
// Used to connect index.html calls to this file

contextBridge.exposeInMainWorld("electron", {
  updatePackages: () => updatePackages(),
  autoremovePackages: () => autoremovePackages(),
  syncPackages: () => syncPackages(),
  checkPassword: () => checkPassword(),
});
