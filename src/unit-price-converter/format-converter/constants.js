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

const MILLI = 'M';
const KILLO = 'K';

const PREFIX = {
  MILLI,
  KILLO
};

const UNITS = {
  GRAM,
  POUND,
  GRAM_A,
  LITER,
  OUNCE,
  UNITY
};

const STANDARD_WEIGHT_UNIT = "kg";
const STANDARD_VOLUME_UNIT = "l";
const STANDARD_UNITY_UNIT = "1000 un";
const STANDARD_UNKNOW_UNIT = "unknow";

const HEIGHT_UNITS = [GRAM, POUND, GRAM_A];
const VOLUME_UNITS = [LITER, OUNCE];
const UNITY_UNITS = [UNITY];

const STANDARD = {
  WEIGHT : {
    unit : STANDARD_WEIGHT_UNIT,
    multiplicator : 1/1000
  },
  VOLUME : {
    unit : STANDARD_VOLUME_UNIT,
    multiplicator : 1
  },
  UNITY : {
    unit: STANDARD_UNITY_UNIT,
    multiplicator : 1/1000
  },
  UNKNOW : {
    unit : STANDARD_UNKNOW_UNIT,
    multiplicator : 1
  }
}

module.exports = {
  TYPES,
  STANDARD,
  HEIGHT_UNITS,
  VOLUME_UNITS,
  UNITY_UNITS,
  UNITS,
  PREFIX
};
