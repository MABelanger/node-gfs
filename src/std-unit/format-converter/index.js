'use strict';

const formatSplitter = require('../format-splitter');

// http://ukma.org.uk/docs/ukma-style-guide.pdf


function getUnitType(unit) {
  let heightUnits = ['G', 'LB'];
  let volumeUnits = ['L'];
  let unityUnits = ['UN'];

  if( str.includes("K") ){
    return 1000;
  }

  if(heightUnits.find(item => { return item === unit } )){
    return "weight";

  }else if(volumeUnits.find(item => { return item === unit } )){
    return "volume";

  }else if(unityUnits.find(item => { return item === unit } )){
    return "unity";
  }
  return null;
}

function getMultiplicator(unit) {

  if(str.includes("K")){
    return 1000;
  }

}
function _getTotalValue(formatObj) {
  let {packet, format, quantity} = formatObj;
  return parseInt(packet) * parseInt(format) * parseFloat(quantity);
}

function getTotalHeight(formatObj, multiplicator) {
  let { unit } = formatObj;
  if(unit == 'KG')
  return _getTotalValue(formatObj);
}

function getTotalVolume(formatObj) {
  return _getTotalValue(formatObj);
}

function getTotalUnity(formatObj) {
  return _getTotalValue(formatObj);
}
