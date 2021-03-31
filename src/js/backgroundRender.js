// Prints the current application version to the version footer
function displayAppVersion () {
    var appVersionFooter = document.getElementById('appVersionFooter');
    const appInfo = require('../json/appInfo.json');

    appVersionFooter.textContent = 'Version ' + appInfo.version;
}