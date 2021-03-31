const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');


if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  var appPath = app.getAppPath();
  var userPath = app.getPath('userData');
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: false,
    resizable: false,
    maxWidth: 800,
    maxHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    frame: false,
    transparent: true
  });

  win.loadFile(path.join(__dirname, './html/index.html'));

  // win.webContents.openDevTools();
  win.menuBarVisible = false;

  ipcMain.handle('applicationFolder', (event) => {
    return appPath;
  })

  ipcMain.handle('userDataFolder', (event) => {
    return userPath;
  })

  win.webContents.on('did-finish-load', function() {
    win.webContents.executeJavaScript("runTimeActions();");
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
