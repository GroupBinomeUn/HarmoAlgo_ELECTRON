const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
// = const {app, BrowserWindow} = require('electron')

let mainWindow;

function createWindow () {
  // on définit une taille pour notre fenêtre
  mainWindow = new BrowserWindow({width: 1000, height: 800});
  //mainWindow = new BrowserWindow({fullscreen: true})
  //mainWindow.loadURL(`file://${__dirname}/index.html`); // on doit charger un chemin absolu
  mainWindow.loadFile('index.html')

  // Ouvre les DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
/*
const {app, BrowserWindow} = require('electron')
  
  // Gardez une reference globale de l'objet window, si vous ne le faites pas, la fenetre sera
  // fermee automatiquement quand l'objet JavaScript sera garbage collected.
  let win
  
  function createWindow () {
    // Créer le browser window.
    win = new BrowserWindow({width: 800, height: 600})
  
    // et charge le index.html de l'application.
    win.loadFile('index.html')
  
    // Ouvre les DevTools.
    win.webContents.openDevTools()
  
    // Émit lorsque la fenêtre est fermée.
    win.on('closed', () => {
      // Dé-référence l'objet window , normalement, vous stockeriez les fenêtres
      // dans un tableau si votre application supporte le multi-fenêtre. C'est le moment
      // où vous devez supprimer l'élément correspondant.
      win = null
    })
  }
  
  // Cette méthode sera appelée quant Electron aura fini
  // de s'initialiser et sera prêt à créer des fenêtres de navigation.
  // Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
  app.on('ready', createWindow)
  
  // Quitte l'application quand toutes les fenêtres sont fermées.
  app.on('window-all-closed', () => {
    // Sur macOS, il est commun pour une application et leur barre de menu
    // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
    // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
    if (win === null) {
      createWindow()
    }
  })
  
  // Dans ce fichier, vous pouvez inclure le reste de votre code spécifique au processus principal. Vous pouvez également le mettre dans des fichiers séparés et les inclure ici.
  */