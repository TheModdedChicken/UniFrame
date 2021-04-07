const { ipcRenderer } = require('electron/renderer');

function locateDir (location) {
    if (location == 'userData') {
        return ipcRenderer.invoke('userDataFolder');
    } else if (location == 'app') {
        return ipcRenderer.invoke('applicationFolder');
    }
}

function titleButtonPress (element) {
    var elementID = element.id;

    if (elementID == 'closeButton') {
        ipcRenderer.send('exit-app');
    } else if (elementID == 'trayButton') {
        ipcRenderer.send('minTray-app');
    } else if (elementID == 'minimizeButton') {
        ipcRenderer.send('minimize-app');
    }
}