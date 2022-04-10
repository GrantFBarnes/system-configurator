function updatePackages() {
  window.electron.updatePackages();
}

function autoremovePackages() {
  window.electron.autoremovePackages();
}

function syncPackages() {
  window.electron.syncPackages();
}

function toggleConsole() {
  const commandOutput = document.getElementById("command-output");
  if (commandOutput) {
    if (commandOutput.style.display !== "block") {
      commandOutput.style.display = "block";
    } else {
      commandOutput.style.display = "none";
    }
  }
}
