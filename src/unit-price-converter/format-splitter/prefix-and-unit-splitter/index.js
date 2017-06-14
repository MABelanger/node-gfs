'use strict';

// return K, k, M or m for(kilo and milli)
// of KG, ML ...
function getPrefixSymbol(prefixAndUnit) {
  let myRegexp = /^[KkMm]+/g;
  let match = myRegexp.exec(prefixAndUnit);
  if( match && match[0] ) {
    return match[0];
  }
  return null;
}

// remove the prefixSymbol from string to get only the symbol (G, UN, L ...)
function getUnitSymbol(prefixAndUnit){
  let PrefixSymbol = getPrefixSymbol(prefixAndUnit);
  return prefixAndUnit.replace(PrefixSymbol, '');
}

module.exports = {
  getPrefixSymbol,
  getUnitSymbol
}
