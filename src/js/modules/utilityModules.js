function compareVersions (compare, contrast) {
    const escapeUp = compare.indexOf('^');
    const escapeDown = compare.indexOf('v');

    console.log(escapeUp + ' | ' + escapeDown);

    if (escapeUp > -1 && escapeDown > -1) return new Error('Versions cannot escape up and down. If you want to cover all versions then get the latest version and put a down escape (v) at the beginning')

    const compareVer = compareVerFunc();
    function compareVerFunc () {
        if (escapeUp > -1) {
            return compare.split('^')[1].split('.');
        } else if (escapeDown > -1) {
            return compare.split('v')[1].split('.');
        } else {
            return compare.split('.');
        }
    }

    const contrastVer = contrast.split('.');

    console.log(compareVer);

    for (var i = 0; i >= compareVer.length; i++) {
        if (parseInt(compareVer[i]) < parseInt(contrastVer[i])) {
            if (escapeUp > -1) {
                return 0;
            } else {
                return -1;
            }
        } else if (parseInt(compareVer[i]) > parseInt(contrastVer[i])) {
            if (escapeDown > -1) {
                return 0;
            } else {
                return 1;
            }
        }
    }

    return 0;
}

module.exports.compareVersions = compareVersions;

function elementPosCalc (htmlElement) {
    var width = htmlElement.getBoundingClientRect().width;
    var leftPos = htmlElement.getBoundingClientRect().left;
    var xPos = (leftPos + (width / 2)) / 2;
  
    var height = htmlElement.getBoundingClientRect().height;
    var topPos = htmlElement.getBoundingClientRect().top;
    var yPos = (topPos + (height / 2)) / 2;
  
    var centerPos = {
      yCPos: yPos,
      xCPos: xPos,
      xPos: htmlElement.getBoundingClientRect().left,
      yPos: htmlElement.getBoundingClientRect().top,
    }
  
    return centerPos;
}

module.exports.elementPosCalc = elementPosCalc;