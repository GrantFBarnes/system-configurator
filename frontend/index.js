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

function toggleConsole() {
  const bottomDisplay = document.getElementById("bottom-display");
  if (!bottomDisplay) return;

  if (bottomDisplay.style.display !== "block") {
    bottomDisplay.style.display = "block";
  } else {
    bottomDisplay.style.display = "none";
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
