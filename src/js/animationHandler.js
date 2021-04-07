/* Modules */
const { elementPosCalc } = require('../js/modules/utilityModules');


/* Variables */

// Arrays
var rotatedPopoutButtons = [];

// Bools
var NBContextMenuOut = false;


/* Functions */

// Rotates any buttons that call it by 180 degrees
function rotatePopoutButton (button) {
    var buttonElement = document.getElementById(button);

    if (rotatedPopoutButtons.includes(button) == false) {
        buttonElement.style.transform = 'rotate(-180deg)';
        rotatedPopoutButtons.push(button);
    } else {
        buttonElement.style.transform = 'rotate(0deg)';

        const index = rotatedPopoutButtons.indexOf(button);
        rotatedPopoutButtons.splice(index, 1);
    }
}

// Changes nav button selection upon clicking a nav button
function selectNavButton (buttonElement) {
    var elementsWithClass = document.getElementsByClassName('selectedNavButton');
    var navSelectedMarker = document.getElementById('navSelectedMarker');

    if (elementsWithClass.length > 0) {
        elementsWithClass[0].classList.remove('selectedNavButton');
    }

    buttonElement.classList.add('selectedNavButton');
    var nextPosition = elementPosCalc(buttonElement);

    navSelectedMarker.style.top = nextPosition.yPos + 'px';
    navSelectedMarker.style.height = buttonElement.clientHeight + 'px';
}

// Animates opening and closing the nav bar content menu
function navBarContextMenuClick () {
    var navBarContextMenu = document.getElementById('navBarContextMenu');

    rotatePopoutButton('mainMenuPopout');
    if (NBContextMenuOut) {
        navBarContextMenu.style.height = '0px';
        NBContextMenuOut = false;
    } else {
        navBarContextMenu.style.height = 'fit-content';
        NBContextMenuOut = true;
    }
}