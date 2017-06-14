'use strict';

const prefixAndUnitSplitter = require('./prefix-and-unit-splitter');

//  "2X1X880G" -> [ '2', '1', '880G' ]
/**
 * @private
 */
function splitValue(packetFormat) {
  return packetFormat.split('X');
}

// 123KG => 123, 55.4G => 55.4
function getItemQuantity(mesure) {
  let myRegexp = /\d+(\.\d+)?/g;
  let match = myRegexp.exec(mesure);
  if( match && match[0] ) {
    return match[0];
  }
  return null;
}

// 123KG => KG, 55.4G => G
function getPrefixAndUnit(mesure) {
  let myRegexp = /[a-zA-Z]+$/g;
  let match = myRegexp.exec(mesure);
  if( match && match[0] ) {
    return match[0];
  }
  return null;
}

function getFormatObj(packetFormat){
  let values = splitValue(packetFormat);
  let mesure = values[2]; // Example:. 180KG
  let prefixAndUnit = getPrefixAndUnit(mesure); // Example :. KG

  return {
    packet: values[0],
    format: values[1],
    quantity : getItemQuantity(mesure),
    prefixSymblol: prefixAndUnitSplitter.getPrefixSymbol(prefixAndUnit),
    unitSymbol : prefixAndUnitSplitter.getUnitSymbol(prefixAndUnit)
  }
}

module.exports = {
  getFormatObj,
  getItemQuantity,
  getPrefixAndUnit
}
