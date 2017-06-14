'use strict';

const TYPES = {
  WEIGHT : "weight",
  VOLUME : "volume",
  UNITY : "unity"
};

const HEIGHT_UNITS = ['G', 'LB'];
const VOLUME_UNITS = ['L'];
const UNITY_UNITS = ['UN'];

const STANDARD_SYMBOL_UNITS = {
  WEIGHT : "g",
  VOLUME : "l",
  UNITY : "un"
}

module.exports = {
  TYPES,
  STANDARD_SYMBOL_UNITS,
  HEIGHT_UNITS,
  VOLUME_UNITS,
  UNITY_UNITS,
};
