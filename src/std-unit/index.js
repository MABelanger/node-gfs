'use strict';

//  "2X1X880G" -> [ '2', '1', '880G' ]
function splitQuantity(packetFormat) {
  return packetFormat.split('X');
}

function getFormatObj(packetFormat){
  let elements = splitQuantity(packetFormat)
  return {
    packet: elements[0],
    format: elements[1],
    mesure: elements[2]
  }
}

// 123KG => 123, 55.4G => 55.4
function getItemQuantity(mesure) {
  let myRegexp = /\d+(\.\d+)?/g;
  let match = myRegexp.exec(mesure);
  if( match && match[0] ) {
    return match[0];
  }
  return null;
}

// 123KG => KG, 55.4G => G
function getItemUnit(mesure) {
  let myRegexp = /[a-zA-Z]+$/g;
  let match = myRegexp.exec(mesure);
  if( match && match[0] ) {
    return match[0];
  }
  return null;
}

module.exports = {
  splitQuantity,
  getFormatObj,
  getItemQuantity,
  getItemUnit
}
