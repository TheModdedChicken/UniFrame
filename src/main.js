const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const path = require('path');

var localIcoLocation = "\\src\\assets\\images\\icos\\UniCon.ico";


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
    resizable: false,
    fullscreenable: false,
    maximizable: false,
    frame: false,
    transparent: true,
    icon: appPath + localIcoLocation
  });

  win.loadFile(path.join(__dirname, './html/index.html'));

  // win.webContents.openDevTools();
  win.menuBarVisible = false;

  let tray = createTray();

  ipcMain.handle('applicationFolder', (event) => {
    return appPath;
  })

  ipcMain.handle('userDataFolder', (event) => {
    return userPath;
  })

  ipcMain.on('exit-app', (evt, arg) => {
    app.quit()
    tray.destroy()
  })
  
  ipcMain.on('minimize-app', (evt, arg) => {
    win.minimize()
  })

  ipcMain.on('minTray-app', (evt, arg) => {
    win.setSkipTaskbar(true);
    win.hide();
  })

  win.webContents.on('did-finish-load', function() {
    win.webContents.executeJavaScript("runTimeActions();");
  });

  function createTray() {
    let appIcon = new Tray(appPath + localIcoLocation);
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Show', click: function () {
          win.show();
          win.setSkipTaskbar(false);
        }
      },
      {
        label: 'Reload', click: function () {
          app.relaunch();
          app.quit();
        }
      },
      {
        label: 'Console', click: function () {
          win.webContents.openDevTools();
        }
      },
      {
        label: 'Exit', click: function () {
          app.isQuiting = true;
          app.quit();
        }
      }
    ]);

    appIcon.on('double-click', function (event) {
      win.show();
      win.setSkipTaskbar(false);
    });
    appIcon.setToolTip('UniFrame');
    appIcon.setContextMenu(contextMenu);
    return appIcon;
  }
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
