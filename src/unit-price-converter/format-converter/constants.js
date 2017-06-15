'use strict';

const TYPES = {
  WEIGHT : "weight",
  VOLUME : "volume",
  UNITY : "unity"
};

const GRAM = 'G';
const POUND = 'LB';
const GRAM_A = 'GA';
const LITER = 'L';
const OUNCE = 'Z';
const UNITY = 'UN';

const UNITS = {
  GRAM,
  POUND,
  GRAM_A,
  LITER,
  OUNCE,
  UNITY
}

const HEIGHT_UNITS = [GRAM, POUND, GRAM_A];
const VOLUME_UNITS = [LITER, OUNCE];
const UNITY_UNITS = [UNITY];

const STANDARD = {
  WEIGHT : {
    unit : "kg",
    multiplicator : 1/1000
  },
  VOLUME : {
    unit : "l",
    multiplicator : 1
  },
  UNITY : {
    unit: "1000 un",
    multiplicator : 1/1000
  },
  UNKNOW : {
    unit : "unknow",
    multiplicator : 1
  }
}

module.exports = {
  TYPES,
  STANDARD,
  HEIGHT_UNITS,
  VOLUME_UNITS,
  UNITY_UNITS,
  UNITS
};
