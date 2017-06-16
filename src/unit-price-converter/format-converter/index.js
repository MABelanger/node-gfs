'use strict';

// http://ukma.org.uk/docs/ukma-style-guide.pdf

const { TYPES, HEIGHT_UNITS, VOLUME_UNITS, UNITY_UNITS, STANDARD, UNITS, PREFIX } =
        require('./constants');

/**
 * @private
 */
function _getTypeOfMesurement(unitSymbol) {
  if (HEIGHT_UNITS.find(item => { return item === unitSymbol; })) {
    return TYPES.WEIGHT;
  } else if (VOLUME_UNITS.find(item => { return item === unitSymbol; })) {
    return TYPES.VOLUME;
  } else if (UNITY_UNITS.find(item => { return item === unitSymbol; })) {
    return TYPES.UNITY;
  }

  return null;
}

/**
 * @private
 */
function _getPrefixMultiplicator(prefixSymblol) {
  if (prefixSymblol === PREFIX.KILLO) {
    return 1000;
  }

  if (prefixSymblol === PREFIX.MILLI) {
    return parseFloat(1 / 1000);
  }

  return 1;
}

/**
 * @private
 */
function _getStandard(typeOfMesurement) {
  if (typeOfMesurement === TYPES.WEIGHT) {
    return STANDARD.WEIGHT;
  } else if (typeOfMesurement === TYPES.VOLUME) {
    return STANDARD.VOLUME;
  } else if (typeOfMesurement === TYPES.UNITY) {
    return STANDARD.UNITY;
  }

  return STANDARD.UNKNOW;
}

/**
 * @private
 */
function _getValueConversion(unitSymbol) {
  if (unitSymbol === UNITS.POUND) {
    return 453.592;
  } else if (unitSymbol === UNITS.OUNCE) {
    return 43 / 1454;
  }
  return 1;
}

function getStandardFormat(formatObj) {
  let { packet, format, quantity, prefixSymblol, unitSymbol } = formatObj;

  let typeOfMesurement = _getTypeOfMesurement(unitSymbol);
  let multiplicator = _getPrefixMultiplicator(prefixSymblol);
  let valueConversion = _getValueConversion(unitSymbol);

  // Get the Total quantity in the right format grams, liters and units
  let standardQuantity = parseInt(packet) * parseInt(format) *
                          parseFloat(quantity) * parseFloat(valueConversion) *
                          parseFloat(multiplicator);

  // multiply by the multiplicator standard ex:. kg need to * by 1000
  let standard = _getStandard(typeOfMesurement);
  standardQuantity = standardQuantity * parseFloat(standard.multiplicator);

  return {
    quantity: standardQuantity,
    typeOfMesurement: typeOfMesurement,
    standardUnit: standard.unit
  };
}

module.exports = {
  _getTypeOfMesurement,
  _getPrefixMultiplicator,
  _getStandard,
  _getValueConversion,
  getStandardFormat
};
