'use strict';

// http://ukma.org.uk/docs/ukma-style-guide.pdf

const formatSplitter = require('../format-splitter');
const { TYPES, HEIGHT_UNITS, VOLUME_UNITS, UNITY_UNITS } = require('./constants');

/**
 * @private
 */
function getTypeOfMesurement(unitSymbol) {

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
function getMultiplicator(prefixSymblol) {

  if(prefixSymblol == "K"){
    return 1000;
  }

  if(prefixSymblol == "M"){
    return parseFloat(1/1000);
  }

  return 1;
}

function getStandardFormat(formatObj) {
  let { packet, format, quantity, prefixSymblol, unitSymbol } = formatObj;
  let multiplicator = getMultiplicator(prefixSymblol);
  let typeOfMesurement = getTypeOfMesurement(unitSymbol);

  let standardQuantity =  parseInt(packet) * parseInt(format) * parseFloat(quantity) *
                     multiplicator;

  return {
    quantity : standardQuantity,
    typeOfMesurement: typeOfMesurement
  }
}

module.exports = {
  getTypeOfMesurement,
  getMultiplicator,
  getStandardFormat
}
