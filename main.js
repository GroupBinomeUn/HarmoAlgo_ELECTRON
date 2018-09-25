const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
// = const {app, BrowserWindow} = require('electron')

let mainWindow;

function createWindow () {
  // on définit une taille pour notre fenêtre
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: 'ressources/svg/png/address-book.png',
    title: "Carnet d'adresses",
    center: true,
    minWidth: 1280,
    minHeight: 720
  });
  //mainWindow = new BrowserWindow({fullscreen: true})
  //mainWindow.loadURL(`file://${__dirname}/index.html`); // on doit charger un chemin absolu
  mainWindow.loadFile('index.html')

  // Ouvre les DevTools.
  //mainWindow.webContents.openDevTools();

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