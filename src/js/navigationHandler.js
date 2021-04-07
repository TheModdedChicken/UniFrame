var currentContentFrame = 'home';

function gotoNavLocation (element) {
    var elementID = element.id;

    selectNavButton(element);
    switchContentFrame(elementID);
}

function switchContentFrame (elementID) {
    tabState('hidden');
    if (elementID == 'navHomeButton') {
        var CCF = document.getElementById(currentContentFrame);
        var NCF = document.getElementById('home');

        CCF.style.visibility = 'hidden';
        NCF.style.visibility = 'visible';
        currentContentFrame = 'home';
    } else if (elementID == 'navAudioButton') {
        var CCF = document.getElementById(currentContentFrame);
        var NCF = document.getElementById('audio');

        CCF.style.visibility = 'hidden';
        NCF.style.visibility = 'visible';
        tabState('visible');
        currentContentFrame = 'audio';
    } else if (elementID == 'navVideoButton') {
        var CCF = document.getElementById(currentContentFrame);
        var NCF = document.getElementById('video');

        CCF.style.visibility = 'hidden';
        NCF.style.visibility = 'visible';
        currentContentFrame = 'video';
    } else if (elementID == 'navModulesButton') {
        var CCF = document.getElementById(currentContentFrame);
        var NCF = document.getElementById('modules');

        CCF.style.visibility = 'hidden';
        NCF.style.visibility = 'visible';
        currentContentFrame = 'modules';
    }
}

function tabState (state) {
    var titleBar = document.getElementById('titleBar');
    var tabBar = document.getElementById('tabBar');
    if (state == 'hidden') {
        titleBar.style.height = '50px';
        tabBar.style.height = '0px';
    } else if (state == 'visible') {
        titleBar.style.height = '25px';
        tabBar.style.height = '25px';
    }
}