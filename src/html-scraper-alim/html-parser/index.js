'use strict';

const utils = require('./utils');


function _getPrice(data) {
  let myRegexp = /Prix\ :(.*?)\$/g;
  let match = myRegexp.exec(data);

  if (match && match[1]) {
    let priceStr = match[1];
    return utils.getFormatedPrice(priceStr);
  }
  return null;
}

function _getFormat(data) {
  let myRegexp = /Format\ :<\/strong>(.*?)\</m;
  let match = myRegexp.exec(data);

  if (match && match[1]) {
    let formatStr = match[1];
    return utils.getFormatedFormat('4X3.78 LT'); // formatStr
  }
  return null;
}

function _getPacketFormat(data) {
  return _getPacket(data) + 'X' + _getFormat(data);
}


// remove product (id) inside the productName
// BAGEL PLEIN SAVEUR TR (0093188) -> BAGEL PLEIN SAVEUR TR
function _getFormatedProductName(productName) {
  /* eslint-disable no-useless-escape */
  return productName.replace(/\ \((.*?)\)/gm, '');
  /* eslint-enable no-useless-escape */
}

function _getProductName(data) {
  let myRegexp = /<div id="ProductMainRight">([\s\S]*?)<div class="ProductNameTitle">(.*?)<\/div>/m;
  let match = myRegexp.exec(data);

  if (match && match[2]) {
    let productName = match[2];
    return _getFormatedProductName(productName);
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
  _getFormat
};
