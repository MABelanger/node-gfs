'use strict';

function getPrice(data) {
  let myRegexp = /<td align="right">(.*?)<\/td>/g;
  let match = myRegexp.exec(data);

  if( match && match.length > 1 ) {
    let priceStr = match[1];
    if( priceStr.includes("$") ) {
      // Remove the dollard sign from the string
      priceStr = priceStr.replace('$','');
      return parseFloat(priceStr);
    }
  }
  return null;
}

function getPacket(data) {
  let myRegexp = /<span>Paquet([\s\S]*?)<span>(.*?)<\/span>/m;
  let match = myRegexp.exec(data);

  if( match && match.length > 2 ) {
    let packetStr = match[2];
    // return the integer
    return parseInt(packetStr);
  }
  return null;
}

function getFormat(data) {
  let myRegexp = /<span>Format([\s\S]*?)<span>(.*?)<\/span>/m;
  let match = myRegexp.exec(data);

  if( match && match.length > 2 ) {
    let formatStr = match[2];
    // if format do not contain number of ... (X), return 1X
    if( !formatStr.includes("X") ) {
      return "1X" + formatStr;
    } else {
      return formatStr;
    }
  }
  return null;
}

function getPacketFormat(data) {
  return getPacket(data) + "X" + getFormat(data);
}

function getProductName(data) {
  let myRegexp = /<div id="ProductMainRight">([\s\S]*?)<div class="ProductNameTitle">(.*?)<\/div>/m;
  let match = myRegexp.exec(data);

  if( match && match.length > 2 ) {
    let productName = match[2];
    // remove product (id) inside the productName
    // BAGEL PLEIN SAVEUR TR (0093188) -> BAGEL PLEIN SAVEUR TR
    productName = productName.replace(/\ \((.*?)\)/gm, '');
    return productName;
  }
  return null;
}

module.exports = {
  getPrice,
  getPacket,
  getFormat,
  getPacketFormat,
  getProductName
};
