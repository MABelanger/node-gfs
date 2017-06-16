'use strict';

function _getPrice(data) {
  let myRegexp = /<td align="right">(.*?)<\/td>/g;
  let match = myRegexp.exec(data);

  if (match && match[1]) {
    let priceStr = match[1];
    if (priceStr.includes('$')) {
      // Remove the dollard sign from the string
      priceStr = priceStr.replace('$', '');
      return parseFloat(priceStr);
    }
  }
  return null;
}

function _getPacket(data) {
  let myRegexp = /<span>Paquet([\s\S]*?)<span>(.*?)<\/span>/m;
  let match = myRegexp.exec(data);

  if (match && match[2]) {
    let packetStr = match[2];
    // return the integer
    return parseInt(packetStr);
  }
  return null;
}

function _getFormat(data) {
  let myRegexp = /<span>Format([\s\S]*?)<span>(.*?)<\/span>/m;
  let match = myRegexp.exec(data);

  if (match && match[2]) {
    let formatStr = match[2];
    // if format do not contain number of ... (X), return 1X
    if (!formatStr.includes('X')) {
      return '1X' + formatStr;
    } else {
      return formatStr;
    }
  }
  return null;
}

function _getPacketFormat(data) {
  return _getPacket(data) + 'X' + _getFormat(data);
}

function _getProductName(data) {
  let myRegexp = /<div id="ProductMainRight">([\s\S]*?)<div class="ProductNameTitle">(.*?)<\/div>/m;
  let match = myRegexp.exec(data);

  // remove product (id) inside the productName
  // BAGEL PLEIN SAVEUR TR (0093188) -> BAGEL PLEIN SAVEUR TR
  if (match && match[2]) {
    let productName = match[2];
    /* eslint-disable no-useless-escape */
    productName = productName.replace(/\ \((.*?)\)/gm, '');
    /* eslint-enable no-useless-escape */
    return productName;
  }
  return null;
}

function getParsedData(data) {
  return {
    productName: _getProductName(data),
    packetFormat: _getPacketFormat(data),
    price: _getPrice(data)
  };
}

module.exports = {
  _getPrice,
  _getPacket,
  _getFormat,
  _getPacketFormat,
  _getProductName,
  getParsedData
};
