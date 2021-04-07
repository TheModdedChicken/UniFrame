var areTabsHidden = false;

class ContentTab {
    constructor (module, name, isBackground) {
        // Checks for type errors
        if (!name) name = 'New Tab';
        if (!module) return new Error('A module to bind this tab to needs to be specified');
        if (!isBackground) isBackground = false;
        var loopedCallback;

        // Loops a specified function for a given amount of time
        this.loop = (callback, timing) => {
            if (!callback || (callback instanceof Function) == false) return new Error('The callback parameter needs to be of type Function');
            if (!timing || (timing instanceof Number) == false) return new Error('The timing parameter needs to be of type Number');
            loopedCallback = setInterval(callback, timing);
            callback();
        }

        // Executes a specified function
        this.executeOnce = (callback) => {
            if (!callback || (callback instanceof Function) == false) return new Error('The callback parameter needs to be of type Function');
            callback();
        }

        // Restores the tab and continues processes
        this.restore = () => {

        }

        // Hides the tab and sets it as a background process
        this.backgroundProcess = (bool) => {

        }

        // Kills all processes, and stores the tab for later use
        this.store = () => {
            if (loopedCallback) clearInterval(loopedCallback);
        }

        // Kills tab and disposes of it
        this.kill = () => {
            if (loopedCallback) clearInterval(loopedCallback);
        }
    }
}