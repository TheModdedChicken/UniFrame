const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');


if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: false,
    resizable: false,
    maxWidth: 800,
    maxHeight: 600,
  });

  win.loadFile(path.join(__dirname, './html/index.html'));

  win.webContents.openDevTools();
  win.menuBarVisible = false;
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
