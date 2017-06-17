'use strict';

function getFormatPadded(formatStr) {

  // 12X8X21KG -> 12X8X21KG
  let myRegexp = /(^[1-9][0-9]*\.?[0-9]*)[Xx]([1-9][0-9]*\.?[0-9]*)[Xx]([1-9][0-9]*\.?[0-9]*)(.*)/m;
  let match = myRegexp.exec(formatStr);

  if (match && match[3]) {
    return match[1] + "X" + match[2] + "X" + match[3] + match[4];
  }

    // 8X21KG -> 1X8X21KG
  myRegexp = /(^[1-9][0-9]*\.?[0-9]*)[Xx]([1-9][0-9]*\.?[0-9]*)(.*)/m;
  match = myRegexp.exec(formatStr);

  if (match && match[2]) {
    return "1X" + match[1] + "X" + match[2] + match[3];
  }


  // 21KG -> 1X1X21KG
  myRegexp = /(^[1-9][0-9]*\.?[0-9]*)(.*)/m;
  match = myRegexp.exec(formatStr);

  if (match && match[1]) {
    return "1X1X" + match[1] + match[2];
  }

  return null;
}

function getFormatedPrice(priceStr) {
  // replace comma by dot
  priceStr = priceStr.replace(',', '.');
  return parseFloat(priceStr);
}

function _getPrefix(formatStr) {
  let myRegexp = /(^[1-9][0-9]*\.?[0-9]*)([K|M])/m;
  let match = myRegexp.exec(formatStr);

  if (match && match[2]) {
    return match[2];
  }

  return null;
}

function _getUnit(formatStr) {
  let myRegexp = /(^[1-9][0-9]*\.?[0-9]*)([K|M])?(LB|G|L|')?/m;
  let match = myRegexp.exec(formatStr);

  if (match && match[3]) {
    return match[3];
  }

  return null;
}



function _getNumber(formatStr) {
  let myRegexp = /(^[1-9][0-9]*\.?[0-9]*)([K|M])?(LB|G|L|')?/m;
  let match = myRegexp.exec(formatStr);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}

function getFormatedFormat(formatStr) {
  formatStr = formatStr.replace(/\ /g, '');

  console.log('__formatStr', formatStr);

  let formatPadded = getFormatPadded(formatStr);

  let prefixAndUnit = null;
  let formatPaddedSplited = [];
  if(formatPadded) {
    formatPaddedSplited = formatPadded.split('X');
    prefixAndUnit = formatPaddedSplited[2];
    let number = _getNumber(prefixAndUnit);
    let prefix = _getPrefix(prefixAndUnit);
    let unit = _getUnit(prefixAndUnit);

    return formatPaddedSplited[0] + 'X' + formatPaddedSplited[1] + 'X' + number +  prefix + unit;
  }

  return null;

}

module.exports = {
  getFormatedPrice,
  getFormatedFormat
};
