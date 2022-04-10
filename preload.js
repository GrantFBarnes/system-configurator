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
const hasGnome = backendDesktop.hasGnome;
const hasKDE = backendDesktop.hasKDE;
var currentInstalled = {};
var selectedInstalls = {};

////////////////////////////////////////////////////////////////////////////////
// Package Functions

async function installPackage(pkg, method) {
  const package = packages[pkg];
  if (method === "repo") {
    await distribution.install(package.getRepo(distribution));
  } else if (method === "flatpak") {
    try {
      await backendCommands.hasCommand("flatpak");
      await distribution.installFlatpak();
      await backendCommands.execute(
        "flatpak install flathub " + package.flatpak + " -y",
        true
      );
    } catch (err) {}
  } else if (method === "snap") {
    try {
      await backendCommands.hasCommand("snap");
      await distribution.installSnap();
      await backendCommands.sudoExecute(
        "snap install " +
          package.snap +
          (package.snap_classic ? " --classic" : ""),
        true
      );
    } catch (err) {}
  }
}

async function uninstallPackage(pkg, method) {
  const package = packages[pkg];
  if (method === "repo") {
    await distribution.uninstall(package.getRepo(distribution));
  } else if (method === "flatpak") {
    await backendCommands.execute(
      "flatpak remove " + package.flatpak + " -y",
      true
    );
  } else if (method === "snap") {
    await backendCommands.sudoExecute("snap remove " + package.snap, true);
  }
}

async function syncPackages() {
  const contentDiv = document.getElementById("content-div");
  if (contentDiv) contentDiv.className = "blur";
  for (let pkg in selectedInstalls) {
    if (selectedInstalls[pkg] !== currentInstalled[pkg]) {
      if (currentInstalled[pkg]) {
        await uninstallPackage(pkg, currentInstalled[pkg]);
      }
      if (selectedInstalls[pkg]) {
        await installPackage(pkg, selectedInstalls[pkg]);
      }
      currentInstalled[pkg] = selectedInstalls[pkg];
    }
  }
  if (contentDiv) contentDiv.className = "";
  generateHTML();
}

async function updatePackages() {
  const contentDiv = document.getElementById("content-div");
  if (contentDiv) contentDiv.className = "blur";
  try {
    await distribution.update();
    await backendCommands.hasCommand("flatpak");
    await backendCommands.execute("flatpak update -y", true);
    await backendCommands.hasCommand("snap");
    await backendCommands.sudoExecute("snap refresh", true);
  } catch (err) {}
  if (contentDiv) contentDiv.className = "";
}

async function autoremovePackages() {
  const contentDiv = document.getElementById("content-div");
  if (contentDiv) contentDiv.className = "blur";
  try {
    await distribution.autoremove();
    await backendCommands.hasCommand("flatpak");
    await backendCommands.execute("flatpak remove --unused -y", true);
  } catch (err) {}
  if (contentDiv) contentDiv.className = "";
}

function selectPackage(pkg, method) {
  const oldMethod = selectedInstalls[pkg];
  selectedInstalls[pkg] = method;

  const before = document.getElementById("pkg-button-" + oldMethod + "-" + pkg);
  if (before) {
    before.className = getPackageButtonClassName(pkg, oldMethod);
    before.innerHTML = getPackageButtonInnerHTML(pkg, oldMethod);
  }

  const after = document.getElementById("pkg-button-" + method + "-" + pkg);
  if (after) {
    after.className = getPackageButtonClassName(pkg, method);
    after.innerHTML = getPackageButtonInnerHTML(pkg, method);
  }
}

////////////////////////////////////////////////////////////////////////////////
// HTML Functions

function getPackageButtonClassName(pkg, method) {
  let className = "button pkg-button pkg-button-" + method;
  if (method === "snap") {
    if (packages[pkg].snap_official) {
      className += "-official";
    } else {
      className += "-unofficial";
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

function generateHTML() {
  const contentDiv = document.getElementById("content-div");
  contentDiv.innerHTML = "";
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

      const packageRepo = package.getRepo(distribution);
      if (packageRepo && packageRepo.length) hasMethod.add("repo");
      if (package.flatpak) hasMethod.add("flatpak");
      if (package.snap) hasMethod.add("snap");

      if (!hasMethod.size) continue;

      const pkgRow = document.createElement("tr");
      const pkgNameCell = document.createElement("td");
      pkgNameCell.innerHTML = package.name;
      pkgRow.appendChild(pkgNameCell);
      const pkgDescCell = document.createElement("td");
      pkgDescCell.innerHTML = package.desc;
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
}
////////////////////////////////////////////////////////////////////////////////
// Get Installed Functions

function getInstalledFlatpaks() {
  return new Promise((resolve, reject) => {
    backendCommands
      .hasCommand("flatpak")
      .then(() => {
        backendCommands
          .execute("flatpak list --app | awk -F '\t' '{print $2}'", false)
          .then((list) => {
            resolve(list.split("\n"));
          })
          .catch(() => reject());
      })
      .catch(() => reject());
  });
}

function getInstalledSnaps() {
  return new Promise((resolve, reject) => {
    backendCommands
      .hasCommand("snap")
      .then(() => {
        backendCommands
          .execute("snap list | awk '{print $1}'", false)
          .then((list) => {
            resolve(list.split("\n"));
          })
          .catch(() => reject());
      })
      .catch(() => reject());
  });
}

function getInstalledPackages() {
  distribution.getInstalledRepo().then((installedRepo) => {
    getInstalledFlatpaks().then((installedFlatpaks) => {
      getInstalledSnaps().then((installedSnaps) => {
        for (let pkg in packages) {
          currentInstalled[pkg] = "";
          selectedInstalls[pkg] = "";
          const package = packages[pkg];

          const packageRepo = package.getRepo(distribution);
          if (packageRepo) {
            for (let r in packageRepo) {
              if (installedRepo.indexOf(packageRepo[r]) >= 0) {
                currentInstalled[pkg] = "repo";
                selectedInstalls[pkg] = "repo";
                break;
              }
            }
          }
          if (package.flatpak) {
            if (installedFlatpaks.indexOf(package.flatpak) >= 0) {
              currentInstalled[pkg] = "flatpak";
              selectedInstalls[pkg] = "flatpak";
            }
          }
          if (package.snap) {
            if (installedSnaps.indexOf(package.snap) >= 0) {
              currentInstalled[pkg] = "snap";
              selectedInstalls[pkg] = "snap";
            }
          }
        }
        generateHTML();
      });
    });
  });
}

////////////////////////////////////////////////////////////////////////////////
// Init

window.addEventListener("DOMContentLoaded", () => {
  backendDistributions.getDistribution().then((distro) => {
    distribution = distro;
    getInstalledPackages();
  });
});

////////////////////////////////////////////////////////////////////////////////
// Context Bridge
// Used to connect index.html calls to this file

contextBridge.exposeInMainWorld("electron", {
  updatePackages: () => updatePackages(),
  autoremovePackages: () => autoremovePackages(),
  syncPackages: () => syncPackages(),
});
