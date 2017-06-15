'use strict';

// http://ukma.org.uk/docs/ukma-style-guide.pdf

const formatSplitter = require('../format-splitter');
const { TYPES, HEIGHT_UNITS, VOLUME_UNITS, UNITY_UNITS, STANDARD_SYMBOL_UNITS } =
        require('./constants');

/**
 * @private
 */
function _getTypeOfMesurement(unitSymbol) {

  if(HEIGHT_UNITS.find(item => { return item === unitSymbol } )){
    return TYPES.WEIGHT;

  } else if(VOLUME_UNITS.find(item => { return item === unitSymbol } )){
    return TYPES.VOLUME;

  } else if(UNITY_UNITS.find(item => { return item === unitSymbol } )){
    return TYPES.UNITY;
  }
  return null;
}

/**
 * @private
 */
function _getMultiplicator(prefixSymblol) {

  if(prefixSymblol == "K"){
    return 1000;
  }

  if(prefixSymblol == "M"){
    return parseFloat(1/1000);
  }

  return 1;
}

function _getStandardUnit(typeOfMesurement) {
  if(typeOfMesurement == TYPES.WEIGHT) {
    return STANDARD_SYMBOL_UNITS.WEIGHT;

  } else if(typeOfMesurement == TYPES.VOLUME) {
    return STANDARD_SYMBOL_UNITS.VOLUME;

  } else if(typeOfMesurement == TYPES.UNITY) {
    return STANDARD_SYMBOL_UNITS.UNITY;
  }
}

function getStandardFormat(formatObj) {
  let { packet, format, quantity, prefixSymblol, unitSymbol } = formatObj;
  let multiplicator = _getMultiplicator(prefixSymblol);
  let typeOfMesurement = _getTypeOfMesurement(unitSymbol);
  let standardUnit = _getStandardUnit(typeOfMesurement);

  let standardQuantity =  parseInt(packet) * parseInt(format) * parseFloat(quantity) *
                     multiplicator;

  return {
    quantity : standardQuantity,
    typeOfMesurement: typeOfMesurement,
    standardUnit: standardUnit
  }
}

module.exports = {
  _getTypeOfMesurement,
  _getMultiplicator,
  getStandardFormat
}
