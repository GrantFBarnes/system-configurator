function updatePackages() {
  window.electron.updatePackages();
}

function autoremovePackages() {
  window.electron.autoremovePackages();
}

function syncPackages() {
  window.electron.syncPackages();
}

function passwordChange() {
  const passwordInput = document.getElementById("password-input");
  if (!passwordInput) return;
  passwordInput.style.background = "white";

  const passwordButton = document.getElementById("password-button");
  if (!passwordButton) return;

  if (passwordInput.value) {
    passwordButton.style.display = "inline-block";
  } else {
    passwordButton.style.display = "none";
  }
}

function checkPassword() {
  window.electron.checkPassword();
}

function toggleChanges() {
  const consoleDisplay = document.getElementById("console-display");
  if (!consoleDisplay) return;
  consoleDisplay.style.display = "none";

  const changesDisplay = document.getElementById("changes-display");
  if (!changesDisplay) return;

  if (changesDisplay.style.display !== "block") {
    changesDisplay.style.display = "block";
  } else {
    changesDisplay.style.display = "none";
  }
}

function toggleConsole() {
  const changesDisplay = document.getElementById("changes-display");
  if (!changesDisplay) return;
  changesDisplay.style.display = "none";

  const consoleDisplay = document.getElementById("console-display");
  if (!consoleDisplay) return;

  if (consoleDisplay.style.display !== "block") {
    consoleDisplay.style.display = "block";
  } else {
    consoleDisplay.style.display = "none";
  }
}

window.onload = () => {
  const passwordInput = document.getElementById("password-input");
  if (!passwordInput) return;
  passwordInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      checkPassword();
    }
  });
};
