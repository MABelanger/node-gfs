'use strict';

const utils = require('./utils');

function _getPrice(data) {
  /* eslint-disable no-useless-escape */
  let myRegexp = /([0-9]*,[0-9]*)\ \$/g;
  /* eslint-enable no-useless-escape */
  let match = myRegexp.exec(data);

  if (match && match[1]) {
    let priceStr = match[1];
    return utils.getFormatedPrice(priceStr);
  }
  return null;
}

function _getFormat(data) {
  /* eslint-disable no-useless-escape */
  let myRegexp = /Format\ :<\/strong>(.*?)\</m;
  /* eslint-enable no-useless-escape */

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
  let productName = _getProductName(data);
  let packetFormat = _getFormat(data);
  let price = _getPrice(data);

  return {
    productName,
    packetFormat,
    price
  };
}

module.exports = {
  _getPrice,
  _getFormat,
  _getProductName,
  getParsedData
};
