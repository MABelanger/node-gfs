'use strict';

const TYPES = {
  WEIGHT : "weight",
  VOLUME : "volume",
  UNITY : "unity"
};

const HEIGHT_UNITS = ['G', 'LB'];
const VOLUME_UNITS = ['L', 'Z'];
const UNITY_UNITS = ['UN'];

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
};
