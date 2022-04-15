////////////////////////////////////////////////////////////////////////////////
// Define Class

class Package {
  constructor(
    name,
    desc,
    group,
    repo,
    flatpak,
    snap,
    repo_other,
    snap_official,
    snap_classic,
    de
  ) {
    this.name = name;
    this.desc = desc;
    this.group = group;
    this.repo = repo;
    this.flatpak = flatpak;
    this.snap = snap;
    this.repo_other = repo_other;
    this.snap_official = snap_official;
    this.snap_classic = snap_classic;
    this.de = de;
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

////////////////////////////////////////////////////////////////////////////////
// Define Packages

var packages = {};

// Applications Group
packages["cheese"] = new Package(
  "Cheese", // Name
  "Webcam", // Description
  "Applications", // Group
  ["cheese"], // Repo
  "org.gnome.Cheese", // Flatpak
  "", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["deja-dup"] = new Package(
  "Deja-Dup", // Name
  "Backup", // Description
  "Applications", // Group
  ["deja-dup"], // Repo
  "org.gnome.DejaDup", // Flatpak
  "deja-dup", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  true, // Snap Classic
  "" // DE
);
packages["calibre"] = new Package(
  "Calibre", // Name
  "E Book Reader/Editor", // Description
  "Applications", // Group
  ["calibre"], // Repo
  "", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["eog"] = new Package(
  "Eye of Gnome", // Name
  "Gnome Image Viewer", // Description
  "Applications", // Group
  ["eog"], // Repo
  "org.gnome.eog", // Flatpak
  "eog", // Snap
  {}, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["evince"] = new Package(
  "Evince", // Name
  "Gnome Document Viewer", // Description
  "Applications", // Group
  ["evince"], // Repo
  "org.gnome.Evince", // Flatpak
  "evince", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["foliate"] = new Package(
  "Foliate", // Name
  "E Book Reader", // Description
  "Applications", // Group
  [], // Repo
  "com.github.johnfactotum.Foliate", // Flatpak
  "foliate", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["fedora-media-writer"] = new Package(
  "Fedora Media Writer", // Name
  "ISO Writer", // Description
  "Applications", // Group
  [], // Repo
  "org.fedoraproject.MediaWriter", // Flatpak
  "", // Snap
  { fedora: ["mediawriter"] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["gnome-books"] = new Package(
  "Gnome Books", // Name
  "", // Description
  "Applications", // Group
  ["gnome-books"], // Repo
  "org.gnome.Books", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnome-boxes"] = new Package(
  "Gnome Boxes", // Name
  "Virtual Machine Manager", // Description
  "Applications", // Group
  ["gnome-boxes"], // Repo
  "org.gnome.Boxes", // Flatpak
  "", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnome-calculator"] = new Package(
  "Gnome Calculator", // Name
  "", // Description
  "Applications", // Group
  ["gnome-calculator"], // Repo
  "org.gnome.Calculator", // Flatpak
  "gnome-calculator", // Snap
  {}, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnome-calendar"] = new Package(
  "Gnome Calendar", // Name
  "", // Description
  "Applications", // Group
  ["gnome-calendar"], // Repo
  "org.gnome.Calendar", // Flatpak
  "gnome-calendar", // Snap
  { redhat: [] }, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnome-clocks"] = new Package(
  "Gnome Clocks", // Name
  "", // Description
  "Applications", // Group
  ["gnome-clocks"], // Repo
  "org.gnome.clocks", // Flatpak
  "gnome-clocks", // Snap
  { redhat: [] }, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnome-connections"] = new Package(
  "Gnome Connections", // Name
  "Network Connection Manager", // Description
  "Applications", // Group
  ["gnome-connections"], // Repo
  "org.gnome.Connections", // Flatpak
  "", // Snap
  { debian: [], redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnome-dialect"] = new Package(
  "Gnome Dialect", // Name
  "", // Description
  "Applications", // Group
  [], // Repo
  "com.github.gi_lom.dialect", // Flatpak
  "", // Snap
  { fedora: ["dialect"] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnome-maps"] = new Package(
  "Gnome Maps", // Name
  "", // Description
  "Applications", // Group
  ["gnome-maps"], // Repo
  "org.gnome.Maps", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnome-passwordsafe"] = new Package(
  "Gnome Password Safe", // Name
  "", // Description
  "Applications", // Group
  ["gnome-passwordsafe"], // Repo
  "org.gnome.PasswordSafe", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnome-weather"] = new Package(
  "Gnome Weather", // Name
  "", // Description
  "Applications", // Group
  ["gnome-weather"], // Repo
  "org.gnome.Weather", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnucash"] = new Package(
  "GNU Cash", // Name
  "Accounting Application", // Description
  "Applications", // Group
  ["gnucash"], // Repo
  "org.gnucash.GnuCash", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["gramps"] = new Package(
  "GRAMPS", // Name
  "Genealogical Research and Analysis Management Programming System", // Description
  "Applications", // Group
  ["gramps"], // Repo
  "org.gramps_project.Gramps", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["gwenview"] = new Package(
  "Gwenview", // Name
  "KDE Image Viewer", // Description
  "Applications", // Group
  ["gwenview"], // Repo
  "org.kde.gwenview", // Flatpak
  "gwenview", // Snap
  { redhat: [] }, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["kalendar"] = new Package(
  "Kalendar", // Name
  "KDE Calendar", // Description
  "Applications", // Group
  ["kalendar"], // Repo
  "", // Flatpak
  "", // Snap
  { pacman: [], redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["kcalc"] = new Package(
  "KCalc", // Name
  "KDE Calculator", // Description
  "Applications", // Group
  ["kcalc"], // Repo
  "org.kde.kcalc", // Flatpak
  "kcalc", // Snap
  { redhat: [] }, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["okular"] = new Package(
  "Okular", // Name
  "KDE Document Viewer", // Description
  "Applications", // Group
  ["okular"], // Repo
  "org.kde.okular", // Flatpak
  "okular", // Snap
  { redhat: [] }, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["transmission-gtk"] = new Package(
  "Transmission (GTK)", // Name
  "Torrent", // Description
  "Applications", // Group
  ["transmission-gtk"], // Repo
  "", // Flatpak
  "", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["transmission-qt"] = new Package(
  "Transmission (QT)", // Name
  "Torrent", // Description
  "Applications", // Group
  ["transmission-qt"], // Repo
  "", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["virt-manager"] = new Package(
  "Virt Manager", // Name
  "Virtual Machine Manager", // Description
  "Applications", // Group
  ["virt-manager"], // Repo
  "", // Flatpak
  "", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["virtualbox"] = new Package(
  "Virtual Box", // Name
  "Virtual Machine Manager", // Description
  "Applications", // Group
  ["virtualbox"], // Repo
  "", // Flatpak
  "", // Snap
  { dnf: ["VirtualBox"], debian: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);

// Browsers Group
packages["chromium"] = new Package(
  "Chromium", // Name
  "", // Description
  "Browsers", // Group
  ["chromium"], // Repo
  "org.chromium.Chromium", // Flatpak
  "chromium", // Snap
  { ubuntu: [], redhat: [] }, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["epiphany"] = new Package(
  "Epiphany", // Name
  "Gnome", // Description
  "Browsers", // Group
  ["epiphany"], // Repo
  "org.gnome.Epiphany", // Flatpak
  "", // Snap
  { redhat: [], apt: ["epiphany-browser"] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["icecat"] = new Package(
  "Icecat", // Name
  "GNU", // Description
  "Browsers", // Group
  [], // Repo
  "", // Flatpak
  "", // Snap
  { fedora: ["icecat"] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["firefox"] = new Package(
  "Firefox", // Name
  "", // Description
  "Browsers", // Group
  ["firefox"], // Repo
  "org.mozilla.firefox", // Flatpak
  "firefox", // Snap
  { redhat: [], debian: [] }, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["firefox-esr"] = new Package(
  "Firefox ESR", // Name
  "Extended Support Release", // Description
  "Browsers", // Group
  [], // Repo
  "", // Flatpak
  "", // Snap
  { redhat: ["firefox"], debian: ["firefox-esr"] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["torbrowser"] = new Package(
  "TOR", // Name
  "The Onion Router", // Description
  "Browsers", // Group
  ["torbrowser-launcher"], // Repo
  "com.github.micahflee.torbrowser-launcher", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);

// Communication Group
packages["discord"] = new Package(
  "Discord", // Name
  "Gaming Chat", // Description
  "Communication", // Group
  [], // Repo
  "com.discordapp.Discord", // Flatpak
  "discord", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["geary"] = new Package(
  "Geary", // Name
  "Gnome Email", // Description
  "Communication", // Group
  ["geary"], // Repo
  "", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["thunderbird"] = new Package(
  "Thunderbird", // Name
  "Email", // Description
  "Communication", // Group
  ["thunderbird"], // Repo
  "", // Flatpak
  "thunderbird", // Snap
  {}, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "" // DE
);

// Games Group
packages["0ad"] = new Package(
  "0 A.D.", // Name
  "Ancient Warfare", // Description
  "Games", // Group
  ["0ad"], // Repo
  "com.play0ad.zeroad", // Flatpak
  "0ad", // Snap
  { redhat: [] }, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["aisleriot"] = new Package(
  "Aisleriot", // Name
  "Solitare", // Description
  "Games", // Group
  ["aisleriot"], // Repo
  "org.gnome.Aisleriot", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnome-2048"] = new Package(
  "Gnome 2048", // Name
  "", // Description
  "Games", // Group
  ["gnome-2048"], // Repo
  "org.gnome.TwentyFortyEight", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnome-chess"] = new Package(
  "Gnome Chess", // Name
  "", // Description
  "Games", // Group
  ["gnome-chess"], // Repo
  "org.gnome.Chess", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnome-mines"] = new Package(
  "Gnome Mines", // Name
  "", // Description
  "Games", // Group
  ["gnome-mines"], // Repo
  "org.gnome.Mines", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnome-sudoku"] = new Package(
  "Gnome Sudoku", // Name
  "", // Description
  "Games", // Group
  ["gnome-sudoku"], // Repo
  "org.gnome.Sudoku", // Flatpak
  "gnome-sudoku", // Snap
  { redhat: [] }, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["kmines"] = new Package(
  "KMines", // Name
  "", // Description
  "Games", // Group
  ["kmines"], // Repo
  "", // Flatpak
  "kmines", // Snap
  { redhat: [] }, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["knights"] = new Package(
  "KNights", // Name
  "", // Description
  "Games", // Group
  ["knights"], // Repo
  "", // Flatpak
  "knights", // Snap
  { redhat: [] }, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["ksudoku"] = new Package(
  "KSudoku", // Name
  "", // Description
  "Games", // Group
  ["ksudoku"], // Repo
  "org.kde.ksudoku", // Flatpak
  "ksudoku", // Snap
  { redhat: [] }, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["quadrapassel"] = new Package(
  "Quadrapassel", // Name
  "Gnome Tetris", // Description
  "Games", // Group
  ["quadrapassel"], // Repo
  "org.gnome.Quadrapassel", // Flatpak
  "quadrapassel", // Snap
  { redhat: [] }, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["steam"] = new Package(
  "Steam", // Name
  "", // Description
  "Games", // Group
  [], // Repo
  "com.valvesoftware.Steam", // Flatpak
  "", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["supertuxkart"] = new Package(
  "Super Tux Kart", // Name
  "", // Description
  "Games", // Group
  ["supertuxkart"], // Repo
  "net.supertuxkart.SuperTuxKart", // Flatpak
  "supertuxkart", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["xonotic"] = new Package(
  "Xonotic", // Name
  "FPS", // Description
  "Games", // Group
  [], // Repo
  "org.xonotic.Xonotic", // Flatpak
  "xonotic", // Snap
  { fedora: ["xonotic"] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);

// Multi Media Group
packages["blender"] = new Package(
  "Blender", // Name
  "3D Modleler and Video Editor", // Description
  "Multi Media", // Group
  ["blender"], // Repo
  "org.blender.Blender", // Flatpak
  "blender", // Snap
  { redhat: [] }, // Repo Other
  true, // Snap Official
  true, // Snap Classic
  "" // DE
);
packages["elisa"] = new Package(
  "Elisa", // Name
  "KDE Music Player", // Description
  "Multi Media", // Group
  ["elisa"], // Repo
  "org.kde.elisa", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["gimp"] = new Package(
  "GIMP", // Name
  "GNU Image Manipulation Program", // Description
  "Multi Media", // Group
  ["gimp"], // Repo
  "org.gimp.GIMP", // Flatpak
  "gimp", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["gnome-music"] = new Package(
  "Gnome Music", // Name
  "", // Description
  "Multi Media", // Group
  ["gnome-music"], // Repo
  "org.gnome.Music", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnome-photos"] = new Package(
  "Gnome Photos", // Name
  "", // Description
  "Multi Media", // Group
  ["gnome-photos"], // Repo
  "org.gnome.Photos", // Flatpak
  "", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnome-sound-recorder"] = new Package(
  "Gnome Sound Recorder", // Name
  "", // Description
  "Multi Media", // Group
  ["gnome-sound-recorder"], // Repo
  "org.gnome.SoundRecorder", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["kdenlive"] = new Package(
  "KdenLive", // Name
  "KDE Video Editor", // Description
  "Multi Media", // Group
  ["kdenlive"], // Repo
  "org.kde.kdenlive", // Flatpak
  "kdenlive", // Snap
  { redhat: [] }, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["rhythmbox"] = new Package(
  "RhythmBox", // Name
  "Music Player", // Description
  "Multi Media", // Group
  ["rhythmbox"], // Repo
  "org.gnome.Rhythmbox3", // Flatpak
  "", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["shotwell"] = new Package(
  "Shotwell", // Name
  "Photos", // Description
  "Multi Media", // Group
  ["shotwell"], // Repo
  "org.gnome.Shotwell", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["totem"] = new Package(
  "Totem", // Name
  "Gnome Video Player", // Description
  "Multi Media", // Group
  ["totem"], // Repo
  "org.gnome.Totem", // Flatpak
  "", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["vlc"] = new Package(
  "VLC", // Name
  "Media Player", // Description
  "Multi Media", // Group
  ["vlc"], // Repo
  "org.videolan.VLC", // Flatpak
  "vlc", // Snap
  {}, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "" // DE
);

// Editors Group
packages["code"] = new Package(
  "VS Code", // Name
  "Visual Studio Code", // Description
  "Editors", // Group
  [], // Repo
  "", // Flatpak
  "code", // Snap
  {}, // Repo Other
  true, // Snap Official
  true, // Snap Classic
  "" // DE
);
packages["codium"] = new Package(
  "Codium", // Name
  "FOSS Visual Studio Code", // Description
  "Editors", // Group
  [], // Repo
  "com.vscodium.codium", // Flatpak
  "codium", // Snap
  { pacman: ["code"] }, // Repo Other
  false, // Snap Official
  true, // Snap Classic
  "" // DE
);
packages["gedit"] = new Package(
  "gedit", // Name
  "Gnome Text Editor", // Description
  "Editors", // Group
  ["gedit"], // Repo
  "org.gnome.gedit", // Flatpak
  "", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnome-builder"] = new Package(
  "Gnome Builder", // Name
  "Gnome IDE", // Description
  "Editors", // Group
  [], // Repo
  "org.gnome.Builder", // Flatpak
  "", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["kate"] = new Package(
  "Kate", // Name
  "Text Editor", // Description
  "Editors", // Group
  ["kate"], // Repo
  "", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["kwrite"] = new Package(
  "KWrite", // Name
  "KDE Text Editor", // Description
  "Editors", // Group
  ["kwrite"], // Repo
  "org.kde.kwrite", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["kdevelop"] = new Package(
  "KDevelop", // Name
  "KDE IDE", // Description
  "Editors", // Group
  ["kdevelop"], // Repo
  "org.kde.kdevelop", // Flatpak
  "kdevelop", // Snap
  { redhat: [] }, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["kile"] = new Package(
  "Kile", // Name
  "LaTex Editor", // Description
  "Editors", // Group
  ["kile"], // Repo
  "", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["libreoffice"] = new Package(
  "LibreOffice", // Name
  "Office Suite", // Description
  "Editors", // Group
  [
    "libreoffice-writer",
    "libreoffice-calc",
    "libreoffice-impress",
    "libreoffice-draw",
    "libreoffice-base",
  ], // Repo
  "org.libreoffice.LibreOffice", // Flatpak
  "libreoffice", // Snap
  { pacman: ["libreoffice-fresh"] }, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["texstudio"] = new Package(
  "TeX Studio", // Name
  "LaTex Editor", // Description
  "Editors", // Group
  [], // Repo
  "org.texstudio.TeXstudio", // Flatpak
  "", // Snap
  { pacman: ["texstudio"] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["pycharm"] = new Package(
  "PyCharm", // Name
  "JetBrains Python Editor", // Description
  "Editors", // Group
  [], // Repo
  "com.jetbrains.PyCharm-Community", // Flatpak
  "pycharm-community", // Snap
  { pacman: ["pycharm-community-edition"] }, // Repo Other
  true, // Snap Official
  true, // Snap Classic
  "" // DE
);

// Software Group
packages["gnome-software"] = new Package(
  "Gnome Software", // Name
  "", // Description
  "Software", // Group
  ["gnome-software"], // Repo
  "", // Flatpak
  "", // Snap
  { pop: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["plasma-discover"] = new Package(
  "Plasma Discover", // Name
  "", // Description
  "Software", // Group
  ["plasma-discover"], // Repo
  "", // Flatpak
  "", // Snap
  { pacman: ["discover"], redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["snap-store"] = new Package(
  "Snap Store", // Name
  "", // Description
  "Software", // Group
  [], // Repo
  "", // Flatpak
  "snap-store", // Snap
  {}, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["synaptic"] = new Package(
  "Synaptic", // Name
  "Apt Software Manager", // Description
  "Software", // Group
  [], // Repo
  "", // Flatpak
  "", // Snap
  { apt: ["synaptic"] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);

// Utilities Group
packages["ark"] = new Package(
  "Ark", // Name
  "KDE Archiving Tool", // Description
  "Utilities", // Group
  ["ark"], // Repo
  "org.kde.ark", // Flatpak
  "ark", // Snap
  { redhat: [] }, // Repo Other
  true, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["baobab"] = new Package(
  "Baobab", // Name
  "Gnome Disk Usage", // Description
  "Utilities", // Group
  ["baobab"], // Repo
  "", // Flatpak
  "", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["dconf-editor"] = new Package(
  "dconf editor", // Name
  "Gnome Environment Variables", // Description
  "Utilities", // Group
  ["dconf-editor"], // Repo
  "", // Flatpak
  "", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["filelight"] = new Package(
  "FileLight", // Name
  "KDE Disk Usage", // Description
  "Utilities", // Group
  ["filelight"], // Repo
  "", // Flatpak
  "", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["gnome-disk-utility"] = new Package(
  "Gnome Disk Utility", // Name
  "", // Description
  "Utilities", // Group
  ["gnome-disk-utility"], // Repo
  "", // Flatpak
  "", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnome-system-monitor"] = new Package(
  "Gnome System Monitor", // Name
  "", // Description
  "Utilities", // Group
  ["gnome-system-monitor"], // Repo
  "", // Flatpak
  "", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["gnome-tweaks"] = new Package(
  "Gnome Tweaks", // Name
  "", // Description
  "Utilities", // Group
  ["gnome-tweaks"], // Repo
  "", // Flatpak
  "", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "gnome" // DE
);
packages["ksysguard"] = new Package(
  "KSysGuard", // Name
  "KDE System Monitor", // Description
  "Utilities", // Group
  ["ksysguard"], // Repo
  "", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["plasma-systemmonitor"] = new Package(
  "Plasma System Monitor", // Name
  "KDE System Monitor", // Description
  "Utilities", // Group
  ["plasma-systemmonitor"], // Repo
  "", // Flatpak
  "", // Snap
  { redhat: [] }, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "kde" // DE
);
packages["simple-scan"] = new Package(
  "Simple Scan", // Name
  "", // Description
  "Utilities", // Group
  ["simple-scan"], // Repo
  "", // Flatpak
  "", // Snap
  {}, // Repo Other
  false, // Snap Official
  false, // Snap Classic
  "" // DE
);
packages["spectacle"] = new Package(
  "Spectacle", // Name
  "KDE Screenshot", // Description
  "Utilities", // Group
  ["spectacle"], // Repo
  "", // Flatpak
  "spectacle", // Snap
  { redhat: [] }, // Repo Other
  true, // Snap Official
  false, // Snap Classic
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
