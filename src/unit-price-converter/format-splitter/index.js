'use strict';

const prefixAndUnitSplitter = require('./prefix-and-unit-splitter');

/**
 * @private
 */
//  "2X1X880G" -> [ '2', '1', '880G' ]
function _splitValue(packetFormat) {
  if (packetFormat) {
    return packetFormat.split('X');
  }
  return ['0', '0', '0'];
}

/**
 * @private
 */
// 123KG => 123, 55.4G => 55.4
function _getItemQuantity(mesure) {
  let myRegexp = /\d+(\.\d+)?/g;
  let match = myRegexp.exec(mesure);
  if (match && match[0]) {
    return match[0];
  }
  return null;
}

/**
 * @private
 */
// 123KG => KG, 55.4G => G
function _getPrefixAndUnit(mesure) {
  let myRegexp = /[a-zA-Z]+$/g;
  let match = myRegexp.exec(mesure);
  if (match && match[0]) {
    return match[0];
  }
  return null;
}

function getFormatObj(packetFormat) {
  let values = _splitValue(packetFormat); // ['2', '1', '180KG']

  let mesure = values[2]; // Example:. 180KG
  let prefixAndUnit = _getPrefixAndUnit(mesure); // Example :. KG

  let formatObj = {
    packet: values[0],
    format: values[1],
    quantity: _getItemQuantity(mesure),
    prefixSymblol: prefixAndUnitSplitter.getPrefixSymbol(prefixAndUnit),
    unitSymbol: prefixAndUnitSplitter.getUnitSymbol(prefixAndUnit)
  };

  return formatObj;
}

module.exports = {
  _getItemQuantity,
  _getPrefixAndUnit,
  getFormatObj
};
