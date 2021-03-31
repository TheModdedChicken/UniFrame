const { elementPosCalc } = require('../js/modules/utilityModules');

var rotatedPopoutButtons = [];

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
function selectNavButton (button) {
    var buttonElement = document.getElementById(button);
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