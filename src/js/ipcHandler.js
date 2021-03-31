const { ipcRenderer } = require('electron/renderer');

function locateDir (location) {
    if (location == 'userData') {
        return ipcRenderer.invoke('userDataFolder');
    } else if (location == 'app') {
        return ipcRenderer.invoke('applicationFolder');
    }
}