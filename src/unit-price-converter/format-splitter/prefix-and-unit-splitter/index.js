'use strict';

const { PREFIX_REGEX_SYMBOLS } = require('./constants');

// return K, k, M or m for(kilo and milli)
// of KG, ML ...
function getPrefixSymbol(prefixAndUnit) {
  // let myRegexp = /^[KkMm]+/g;
  let myRegexp = new RegExp('[' + PREFIX_REGEX_SYMBOLS.join() + ']', 'g');
  let match = myRegexp.exec(prefixAndUnit);
  if (match && match[0]) {
    return match[0];
  }
  return null;
}

// remove the prefixSymbol from string to get only the symbol (G, UN, L ...)
function getUnitSymbol(prefixAndUnit) {
  let PrefixSymbol = getPrefixSymbol(prefixAndUnit);
  return prefixAndUnit.replace(PrefixSymbol, '');
}

module.exports = {
  getPrefixSymbol,
  getUnitSymbol
};
