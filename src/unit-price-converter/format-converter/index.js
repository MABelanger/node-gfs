'use strict';

// http://ukma.org.uk/docs/ukma-style-guide.pdf

const formatSplitter = require('../format-splitter');
const { TYPES, HEIGHT_UNITS, VOLUME_UNITS, UNITY_UNITS, STANDARD } =
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
function _getPrefixMultiplicator(prefixSymblol) {

  if(prefixSymblol == "K"){
    return 1000;
  }

  if(prefixSymblol == "M"){
    return parseFloat(1/1000);
  }

  return 1;
}

function _getStandard(typeOfMesurement) {
  if(typeOfMesurement == TYPES.WEIGHT) {
    return STANDARD.WEIGHT;

  } else if(typeOfMesurement == TYPES.VOLUME) {
    return STANDARD.VOLUME;

  } else if(typeOfMesurement == TYPES.UNITY) {
    return STANDARD.UNITY;
  }
  return STANDARD.UNKNOW;
}

function _getValueConversion(unitSymbol) {
  if (unitSymbol == 'LB' ){
    return 453.592;
  }

  if (unitSymbol == 'Z' ){
    return 43/1454;
  }
  return 1;
}

function getStandardFormat(formatObj) {
  let { packet, format, quantity, prefixSymblol, unitSymbol } = formatObj;

  let typeOfMesurement = _getTypeOfMesurement(unitSymbol);
  let multiplicator = _getPrefixMultiplicator(prefixSymblol);
  let valueConversion = _getValueConversion(unitSymbol);

  let standardQuantity =  parseInt(packet) * parseInt(format)
                          * parseFloat(quantity) * parseFloat(valueConversion) *
                          parseFloat(multiplicator);


  // multiply by the multiplicator standard ex:. kg need to * by 1000
  let standard = _getStandard(typeOfMesurement);

  console.log('standardQuantity', standardQuantity)
  console.log('standard.multiplicator', standard.multiplicator)
  standardQuantity = standardQuantity * parseFloat(standard.multiplicator);

  return {
    quantity : standardQuantity,
    typeOfMesurement: typeOfMesurement,
    standardUnit: standard.unit
  }
}

module.exports = {
  _getTypeOfMesurement,
  _getPrefixMultiplicator,
  getStandardFormat
}
