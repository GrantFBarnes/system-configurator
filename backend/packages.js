////////////////////////////////////////////////////////////////////////////////
// Define Classes

class Package {
  constructor(name, description, group, repo, flatpak, snap, de) {
    this.name = name;
    this.description = description;
    this.group = group;
    this.repo = repo;
    this.flatpak = flatpak;
    this.snap = snap;
    this.de = de;
  }
}

class Repo {
  constructor(repo, repo_other) {
    this.repo = repo;
    this.repo_other = repo_other;
  }

  getRepo(distro) {
    if (this.repo_other[distro.name]) {
      return this.repo_other[distro.name];
    }

    if (this.repo_other[distro.repository]) {
      return this.repo_other[distro.repository];
    }

    if (this.repo_other[distro.packageManager]) {
      return this.repo_other[distro.packageManager];
    }

    return this.repo;
  }
}

class Flatpak {
  constructor(name) {
    this.name = name;
  }
}

class Snap {
  constructor(name, official, classic) {
    this.name = name;
    this.official = official ? true : false;
    this.classic = classic ? true : false;
  }
}

////////////////////////////////////////////////////////////////////////////////
// Define Packages

var packages = {};

// Applications Group
packages["bitwarden"] = new Package(
  "Bitwarden", // Name
  "Password Manager", // Description
  "Applications", // Group
  null, // Repo
  null, // Flatpak
  new Snap("bitwarden", true, false), // Snap
  "" // DE
);
packages["cheese"] = new Package(
  "Cheese", // Name
  "Webcam", // Description
  "Applications", // Group
  new Repo(["cheese"], {}), // Repo
  new Flatpak("org.gnome.Cheese"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["deja-dup"] = new Package(
  "Deja-Dup", // Name
  "Backup", // Description
  "Applications", // Group
  new Repo(["deja-dup"], { redhat: [] }), // Repo
  new Flatpak("org.gnome.DejaDup"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["eog"] = new Package(
  "Eye of Gnome", // Name
  "Image Viewer", // Description
  "Applications", // Group
  new Repo(["eog"], {}), // Repo
  new Flatpak("org.gnome.eog"), // Flatpak
  new Snap("eog", true, false), // Snap
  "gnome" // DE
);
packages["evince"] = new Package(
  "Evince", // Name
  "Document Viewer", // Description
  "Applications", // Group
  new Repo(["evince"], {}), // Repo
  new Flatpak("org.gnome.Evince"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["fedora-media-writer"] = new Package(
  "Fedora Media Writer", // Name
  "ISO Writer", // Description
  "Applications", // Group
  new Repo([], { fedora: ["mediawriter"] }), // Repo
  new Flatpak("org.fedoraproject.MediaWriter"), // Flatpak
  null, // Snap
  "" // DE
);
packages["gnome-books"] = new Package(
  "Gnome Books", // Name
  "eBook Reader", // Description
  "Applications", // Group
  new Repo(["gnome-books"], { redhat: [] }), // Repo
  new Flatpak("org.gnome.Books"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["gnome-boxes"] = new Package(
  "Gnome Boxes", // Name
  "Virtual Machine Manager", // Description
  "Applications", // Group
  new Repo(["gnome-boxes"], {}), // Repo
  new Flatpak("org.gnome.Boxes"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["gnome-calculator"] = new Package(
  "Gnome Calculator", // Name
  "Calculator", // Description
  "Applications", // Group
  new Repo(["gnome-calculator"], {}), // Repo
  new Flatpak("org.gnome.Calculator"), // Flatpak
  new Snap("gnome-calculator", true, false), // Snap
  "gnome" // DE
);
packages["gnome-calendar"] = new Package(
  "Gnome Calendar", // Name
  "Calendar", // Description
  "Applications", // Group
  new Repo(["gnome-calendar"], { redhat: [] }), // Repo
  new Flatpak("org.gnome.Calendar"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["gnome-clocks"] = new Package(
  "Gnome Clocks", // Name
  "World Clocks", // Description
  "Applications", // Group
  new Repo(["gnome-clocks"], { redhat: [] }), // Repo
  new Flatpak("org.gnome.clocks"), // Flatpak
  new Snap("gnome-clocks", true, false), // Snap
  "gnome" // DE
);
packages["gnome-connections"] = new Package(
  "Gnome Connections", // Name
  "Network Connection Manager", // Description
  "Applications", // Group
  new Repo(["gnome-connections"], { debian: [], redhat: [] }), // Repo
  new Flatpak("org.gnome.Connections"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["gnome-maps"] = new Package(
  "Gnome Maps", // Name
  "Maps", // Description
  "Applications", // Group
  new Repo(["gnome-maps"], { redhat: [] }), // Repo
  new Flatpak("org.gnome.Maps"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["gnome-passwordsafe"] = new Package(
  "Gnome Password Safe", // Name
  "Password Manager", // Description
  "Applications", // Group
  new Repo(["gnome-passwordsafe"], { redhat: [] }), // Repo
  new Flatpak("org.gnome.PasswordSafe"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["gnome-weather"] = new Package(
  "Gnome Weather", // Name
  "Weather", // Description
  "Applications", // Group
  new Repo(["gnome-weather"], { redhat: [] }), // Repo
  new Flatpak("org.gnome.Weather"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["gnucash"] = new Package(
  "GNU Cash", // Name
  "Accounting Application", // Description
  "Applications", // Group
  new Repo(["gnucash"], { redhat: [] }), // Repo
  new Flatpak("org.gnucash.GnuCash"), // Flatpak
  null, // Snap
  "" // DE
);
packages["gwenview"] = new Package(
  "Gwenview", // Name
  "KDE Image Viewer", // Description
  "Applications", // Group
  new Repo(["gwenview"], { redhat: [] }), // Repo
  new Flatpak("org.kde.gwenview"), // Flatpak
  new Snap("gwenview", true, false), // Snap
  "kde" // DE
);
packages["kcalc"] = new Package(
  "KCalc", // Name
  "Calculator", // Description
  "Applications", // Group
  new Repo(["kcalc"], { redhat: [] }), // Repo
  new Flatpak("org.kde.kcalc"), // Flatpak
  new Snap("kcalc", true, false), // Snap
  "kde" // DE
);
packages["okular"] = new Package(
  "Okular", // Name
  "KDE Document Viewer", // Description
  "Applications", // Group
  new Repo(["okular"], { redhat: [] }), // Repo
  new Flatpak("org.kde.okular"), // Flatpak
  new Snap("okular", true, false), // Snap
  "kde" // DE
);
packages["transmission-gtk"] = new Package(
  "Transmission (GTK)", // Name
  "Torrent", // Description
  "Applications", // Group
  new Repo(["transmission-gtk"], {}), // Repo
  null, // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["transmission-qt"] = new Package(
  "Transmission (QT)", // Name
  "Torrent", // Description
  "Applications", // Group
  new Repo(["transmission-qt"], { redhat: [] }), // Repo
  null, // Flatpak
  null, // Snap
  "kde" // DE
);
packages["virt-manager"] = new Package(
  "Virt Manager", // Name
  "Virtual Machine Manager", // Description
  "Applications", // Group
  new Repo(["virt-manager"], {}), // Repo
  null, // Flatpak
  null, // Snap
  "" // DE
);

// Browsers Group
packages["brave"] = new Package(
  "Brave", // Name
  "Privary Browser", // Description
  "Browsers", // Group
  null, // Repo
  new Flatpak("com.brave.Browser"), // Flatpak
  new Snap("brave", false, false), // Snap
  "" // DE
);
packages["chromium"] = new Package(
  "Chromium", // Name
  "Google Base Browser", // Description
  "Browsers", // Group
  new Repo(["chromium"], { ubuntu: [], redhat: [] }), // Repo
  new Flatpak("org.chromium.Chromium"), // Flatpak
  new Snap("chromium", true, false), // Snap
  "" // DE
);
packages["epiphany"] = new Package(
  "Epiphany", // Name
  "Gnome Browser", // Description
  "Browsers", // Group
  new Repo(["epiphany"], { redhat: [], apt: ["epiphany-browser"] }), // Repo
  new Flatpak("org.gnome.Epiphany"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["icecat"] = new Package(
  "Icecat", // Name
  "GNU Browser", // Description
  "Browsers", // Group
  new Repo([], { fedora: ["icecat"] }), // Repo
  null, // Flatpak
  null, // Snap
  "" // DE
);
packages["firefox"] = new Package(
  "Firefox", // Name
  "Mozilla Browser", // Description
  "Browsers", // Group
  new Repo(["firefox"], { redhat: [], apt: [] }), // Repo
  new Flatpak("org.mozilla.firefox"), // Flatpak
  new Snap("firefox", true, false), // Snap
  "" // DE
);
packages["firefox-esr"] = new Package(
  "Firefox ESR", // Name
  "Mozilla Extended Support Release", // Description
  "Browsers", // Group
  new Repo([], { redhat: ["firefox"], debian: ["firefox-esr"] }), // Repo
  null, // Flatpak
  null, // Snap
  "" // DE
);
packages["torbrowser"] = new Package(
  "TOR", // Name
  "The Onion Router", // Description
  "Browsers", // Group
  "", // Repo
  new Flatpak("com.github.micahflee.torbrowser-launcher"), // Flatpak
  null, // Snap
  "" // DE
);

// Communication Group
packages["discord"] = new Package(
  "Discord", // Name
  "Gaming Chat", // Description
  "Communication", // Group
  null, // Repo
  new Flatpak("com.discordapp.Discord"), // Flatpak
  new Snap("discord", false, false), // Snap
  "" // DE
);
packages["thunderbird"] = new Package(
  "Thunderbird", // Name
  "Email", // Description
  "Communication", // Group
  new Repo(["thunderbird"], {}), // Repo
  new Flatpak("org.mozilla.Thunderbird"), // Flatpak
  new Snap("thunderbird", true, false), // Snap
  "" // DE
);

// Games Group
packages["0ad"] = new Package(
  "0 A.D.", // Name
  "Ancient Warfare", // Description
  "Games", // Group
  new Repo(["0ad"], { redhat: [] }), // Repo
  new Flatpak("com.play0ad.zeroad"), // Flatpak
  new Snap("0ad", true, false), // Snap
  "" // DE
);
packages["aisleriot"] = new Package(
  "Aisleriot", // Name
  "Solitare", // Description
  "Games", // Group
  new Repo(["aisleriot"], { redhat: [] }), // Repo
  new Flatpak("org.gnome.Aisleriot"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["gnome-2048"] = new Package(
  "Gnome 2048", // Name
  "2048", // Description
  "Games", // Group
  new Repo(["gnome-2048"], { redhat: [] }), // Repo
  new Flatpak("org.gnome.TwentyFortyEight"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["gnome-chess"] = new Package(
  "Gnome Chess", // Name
  "Chess", // Description
  "Games", // Group
  new Repo(["gnome-chess"], { redhat: [] }), // Repo
  new Flatpak("org.gnome.Chess"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["gnome-mines"] = new Package(
  "Gnome Mines", // Name
  "Mines", // Description
  "Games", // Group
  new Repo(["gnome-mines"], { redhat: [] }), // Repo
  new Flatpak("org.gnome.Mines"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["gnome-sudoku"] = new Package(
  "Gnome Sudoku", // Name
  "Sudoku", // Description
  "Games", // Group
  new Repo(["gnome-sudoku"], { redhat: [] }), // Repo
  new Flatpak("org.gnome.Sudoku"), // Flatpak
  new Snap("gnome-sudoku", true, false), // Snap
  "gnome" // DE
);
packages["kmines"] = new Package(
  "KMines", // Name
  "Mines", // Description
  "Games", // Group
  new Repo(["kmines"], { redhat: [] }), // Repo
  null, // Flatpak
  new Snap("kmines", true, false), // Snap
  "kde" // DE
);
packages["knights"] = new Package(
  "KNights", // Name
  "Chess", // Description
  "Games", // Group
  new Repo(["knights"], { redhat: [] }), // Repo
  null, // Flatpak
  new Snap("knights", true, false), // Snap
  "kde" // DE
);
packages["ksudoku"] = new Package(
  "KSudoku", // Name
  "Sudoku", // Description
  "Games", // Group
  new Repo(["ksudoku"], { redhat: [] }), // Repo
  new Flatpak("org.kde.ksudoku"), // Flatpak
  new Snap("ksudoku", true, false), // Snap
  "kde" // DE
);
packages["quadrapassel"] = new Package(
  "Quadrapassel", // Name
  "Tetris", // Description
  "Games", // Group
  new Repo(["quadrapassel"], { redhat: [] }), // Repo
  new Flatpak("org.gnome.Quadrapassel"), // Flatpak
  new Snap("quadrapassel", true, false), // Snap
  "gnome" // DE
);
packages["steam"] = new Package(
  "Steam", // Name
  "Steam Client", // Description
  "Games", // Group
  null, // Repo
  new Flatpak("com.valvesoftware.Steam"), // Flatpak
  null, // Snap
  "" // DE
);
packages["supertuxkart"] = new Package(
  "Super Tux Kart", // Name
  "Racing Game", // Description
  "Games", // Group
  new Repo(["supertuxkart"], { redhat: [] }), // Repo
  new Flatpak("net.supertuxkart.SuperTuxKart"), // Flatpak
  new Snap("supertuxkart", false, false), // Snap
  "" // DE
);
packages["xonotic"] = new Package(
  "Xonotic", // Name
  "FPS", // Description
  "Games", // Group
  new Repo([], { fedora: ["xonotic"] }), // Repo
  new Flatpak("org.xonotic.Xonotic"), // Flatpak
  new Snap("xonotic", false, false), // Snap
  "" // DE
);

// Multi Media Group
packages["blender"] = new Package(
  "Blender", // Name
  "3D Modeler/Video Editor", // Description
  "Multi Media", // Group
  new Repo(["blender"], { redhat: [] }), // Repo
  new Flatpak("org.blender.Blender"), // Flatpak
  new Snap("blender", true, true), // Snap
  "" // DE
);
packages["elisa"] = new Package(
  "Elisa", // Name
  "Music Player", // Description
  "Multi Media", // Group
  new Repo(["elisa"], { redhat: [] }), // Repo
  new Flatpak("org.kde.elisa"), // Flatpak
  null, // Snap
  "kde" // DE
);
packages["gimp"] = new Package(
  "GIMP", // Name
  "GNU Image Manipulation Program", // Description
  "Multi Media", // Group
  new Repo(["gimp"], {}), // Repo
  new Flatpak("org.gimp.GIMP"), // Flatpak
  new Snap("gimp", false, false), // Snap
  "" // DE
);
packages["gnome-music"] = new Package(
  "Gnome Music", // Name
  "Music Player", // Description
  "Multi Media", // Group
  new Repo(["gnome-music"], { redhat: [] }), // Repo
  new Flatpak("org.gnome.Music"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["gnome-photos"] = new Package(
  "Gnome Photos", // Name
  "Photo Viewer", // Description
  "Multi Media", // Group
  new Repo(["gnome-photos"], {}), // Repo
  new Flatpak("org.gnome.Photos"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["gnome-sound-recorder"] = new Package(
  "Gnome Sound Recorder", // Name
  "Sound Recorder", // Description
  "Multi Media", // Group
  new Repo(["gnome-sound-recorder"], { redhat: [] }), // Repo
  new Flatpak("org.gnome.SoundRecorder"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["kdenlive"] = new Package(
  "KdenLive", // Name
  "KDE Video Editor", // Description
  "Multi Media", // Group
  new Repo(["kdenlive"], { redhat: [] }), // Repo
  new Flatpak("org.kde.kdenlive"), // Flatpak
  new Snap("kdenlive", true, false), // Snap
  "kde" // DE
);
packages["rhythmbox"] = new Package(
  "RhythmBox", // Name
  "Music Player", // Description
  "Multi Media", // Group
  new Repo(["rhythmbox"], {}), // Repo
  new Flatpak("org.gnome.Rhythmbox3"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["shotwell"] = new Package(
  "Shotwell", // Name
  "Photo Viewer", // Description
  "Multi Media", // Group
  new Repo(["shotwell"], { redhat: [] }), // Repo
  new Flatpak("org.gnome.Shotwell"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["spotify"] = new Package(
  "Spotify", // Name
  "Music Streaming", // Description
  "Multi Media", // Group
  null, // Repo
  null, // Flatpak
  new Snap("spotify", true, false), // Snap
  "kde" // DE
);
packages["totem"] = new Package(
  "Totem", // Name
  "Video Player", // Description
  "Multi Media", // Group
  new Repo(["totem"], {}), // Repo
  new Flatpak("org.gnome.Totem"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["vlc"] = new Package(
  "VLC", // Name
  "Media Player", // Description
  "Multi Media", // Group
  new Repo(["vlc"], {}), // Repo
  new Flatpak("org.videolan.VLC"), // Flatpak
  new Snap("vlc", true, false), // Snap
  "" // DE
);

// Editors Group
packages["code"] = new Package(
  "VS Code", // Name
  "Visual Studio Code", // Description
  "Editors", // Group
  null, // Repo
  null, // Flatpak
  new Snap("code", true, true), // Snap
  "" // DE
);
packages["codium"] = new Package(
  "Codium", // Name
  "FOSS Visual Studio Code", // Description
  "Editors", // Group
  new Repo([], { pacman: ["code"] }), // Repo
  new Flatpak("com.vscodium.codium"), // Flatpak
  new Snap("codium", false, true), // Snap
  "" // DE
);
packages["gedit"] = new Package(
  "gedit", // Name
  "Text Editor", // Description
  "Editors", // Group
  new Repo(["gedit"], {}), // Repo
  new Flatpak("org.gnome.gedit"), // Flatpak
  new Snap("gedit", true, false), // Snap
  "gnome" // DE
);
packages["gnome-builder"] = new Package(
  "Gnome Builder", // Name
  "Gnome IDE", // Description
  "Editors", // Group
  null, // Repo
  new Flatpak("org.gnome.Builder"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["gnome-text-editor"] = new Package(
  "Gnome Text Editor", // Name
  "Text Editor", // Description
  "Editors", // Group
  new Repo(["gnome-text-editor"], { debian: [], redhat: [] }), // Repo
  new Flatpak("org.gnome.TextEditor"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["intellij"] = new Package(
  "Intellij Idea", // Name
  "JetBrains Jave/Generic Editor", // Description
  "Editors", // Group
  null, // Repo
  null, // Flatpak
  new Snap("intellij-idea-community", true, true), // Snap
  "" // DE
);
packages["kate"] = new Package(
  "Kate", // Name
  "KDE Advanced Text Editor", // Description
  "Editors", // Group
  new Repo(["kate"], { redhat: [] }), // Repo
  null, // Flatpak
  new Snap("kate", true, true), // Snap
  "kde" // DE
);
packages["kwrite"] = new Package(
  "KWrite", // Name
  "Text Editor", // Description
  "Editors", // Group
  new Repo(["kwrite"], { redhat: [] }), // Repo
  new Flatpak("org.kde.kwrite"), // Flatpak
  null, // Snap
  "kde" // DE
);
packages["kdevelop"] = new Package(
  "KDevelop", // Name
  "KDE IDE", // Description
  "Editors", // Group
  new Repo(["kdevelop"], { redhat: [] }), // Repo
  new Flatpak("org.kde.kdevelop"), // Flatpak
  new Snap("kdevelop", true, true), // Snap
  "kde" // DE
);
packages["kile"] = new Package(
  "Kile", // Name
  "LaTex Editor", // Description
  "Editors", // Group
  new Repo(["kile"], { redhat: [] }), // Repo
  null, // Flatpak
  null, // Snap
  "kde" // DE
);
packages["libreoffice"] = new Package(
  "LibreOffice", // Name
  "Office Suite", // Description
  "Editors", // Group
  new Repo(
    [
      "libreoffice-writer",
      "libreoffice-calc",
      "libreoffice-impress",
      "libreoffice-draw",
      "libreoffice-base",
    ],
    { pacman: ["libreoffice-fresh"] }
  ), // Repo
  new Flatpak("org.libreoffice.LibreOffice"), // Flatpak
  new Snap("libreoffice", true, false), // Snap
  "" // DE
);
packages["pycharm"] = new Package(
  "PyCharm", // Name
  "JetBrains Python Editor", // Description
  "Editors", // Group
  null, // Repo
  null, // Flatpak
  new Snap("pycharm-community", true, true), // Snap
  "" // DE
);

// Software Group
packages["gnome-software"] = new Package(
  "Gnome Software", // Name
  "App Store", // Description
  "Software", // Group
  new Repo(["gnome-software"], { pop: [] }), // Repo
  null, // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["plasma-discover"] = new Package(
  "Plasma Discover", // Name
  "App Store", // Description
  "Software", // Group
  new Repo(["plasma-discover"], { pacman: ["discover"], redhat: [] }), // Repo
  null, // Flatpak
  null, // Snap
  "kde" // DE
);
packages["snap-store"] = new Package(
  "Snap Store", // Name
  "App Store", // Description
  "Software", // Group
  null, // Repo
  null, // Flatpak
  new Snap("snap-store", true, false), // Snap
  "" // DE
);
packages["synaptic"] = new Package(
  "Synaptic", // Name
  "Apt Software Manager", // Description
  "Software", // Group
  new Repo([], { apt: ["synaptic"] }), // Repo
  null, // Flatpak
  null, // Snap
  "" // DE
);

// Utilities Group
packages["ark"] = new Package(
  "Ark", // Name
  "KDE Archiving Tool", // Description
  "Utilities", // Group
  new Repo(["ark"], { redhat: [] }), // Repo
  new Flatpak("org.kde.ark"), // Flatpak
  new Snap("ark", true, false), // Snap
  "kde" // DE
);
packages["baobab"] = new Package(
  "Baobab", // Name
  "Gnome Disk Usage", // Description
  "Utilities", // Group
  new Repo(["baobab"], {}), // Repo
  new Flatpak("org.gnome.baobab"), // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["dconf-editor"] = new Package(
  "dconf editor", // Name
  "Gnome Environment Variables", // Description
  "Utilities", // Group
  new Repo(["dconf-editor"], {}), // Repo
  null, // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["filelight"] = new Package(
  "FileLight", // Name
  "KDE Disk Usage", // Description
  "Utilities", // Group
  new Repo(["filelight"], {}), // Repo
  null, // Flatpak
  null, // Snap
  "kde" // DE
);
packages["gnome-disk-utility"] = new Package(
  "Gnome Disk Utility", // Name
  "Disk Utility", // Description
  "Utilities", // Group
  new Repo(["gnome-disk-utility"], {}), // Repo
  null, // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["gnome-shell-extensions"] = new Package(
  "Gnome Extensions", // Name
  "System Settings", // Description
  "Utilities", // Group
  new Repo(["gnome-shell-extensions"], {}), // Repo
  null, // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["gnome-system-monitor"] = new Package(
  "Gnome System Monitor", // Name
  "System Monitor", // Description
  "Utilities", // Group
  new Repo(["gnome-system-monitor"], {}), // Repo
  null, // Flatpak
  new Snap("gnome-system-monitor", true, false), // Snap
  "gnome" // DE
);
packages["gnome-tweaks"] = new Package(
  "Gnome Tweaks", // Name
  "System Settings", // Description
  "Utilities", // Group
  new Repo(["gnome-tweaks"], {}), // Repo
  null, // Flatpak
  null, // Snap
  "gnome" // DE
);
packages["ksysguard"] = new Package(
  "KSysGuard", // Name
  "KDE System Monitor", // Description
  "Utilities", // Group
  new Repo(["ksysguard"], { redhat: [] }), // Repo
  null, // Flatpak
  null, // Snap
  "kde" // DE
);
packages["plasma-systemmonitor"] = new Package(
  "Plasma System Monitor", // Name
  "KDE System Monitor", // Description
  "Utilities", // Group
  new Repo(["plasma-systemmonitor"], { redhat: [] }), // Repo
  null, // Flatpak
  null, // Snap
  "kde" // DE
);
packages["simple-scan"] = new Package(
  "Simple Scan", // Name
  "Scan Application", // Description
  "Utilities", // Group
  new Repo(["simple-scan"], {}), // Repo
  null, // Flatpak
  null, // Snap
  "" // DE
);
packages["spectacle"] = new Package(
  "Spectacle", // Name
  "KDE Screenshot", // Description
  "Utilities", // Group
  new Repo(["spectacle"], { redhat: [] }), // Repo
  null, // Flatpak
  new Snap("spectacle", true, false), // Snap
  "kde" // DE
);

module.exports.packages = packages;

////////////////////////////////////////////////////////////////////////////////
// Define Groups

var groups = {};

for (let pkg in packages) {
  const package = packages[pkg];
  if (!groups[package.group]) {
    groups[package.group] = [];
  }
  groups[package.group].push(pkg);
}

module.exports.groups = groups;
