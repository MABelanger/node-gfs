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
    return utils.getFormatedFormat(formatStr); // formatStr
  }
  return null;
}


function _getProductName(data) {
  let myRegexp = /<div id="divInfoProduit">([\s\S]*?)<h2>(.*?)<\/h2>/m;
  let match = myRegexp.exec(data);

  if (match && match[2]) {
    return match[2];
  }

  return null;
}

function getParsedData(data) {
  return {
    productName: _getProductName(data),
    packetFormat: _getFormat(data),
    price: _getPrice(data)
  };
}

module.exports = {
  _getPrice,
  _getFormat,
  _getProductName,
  getParsedData
};
