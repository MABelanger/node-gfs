'use strict';

const formatConverter = require('./format-converter');
const formatSplitter = require('./format-splitter');




function getStandardPriceFormat(formatString, price) {
  let formatObj = formatSplitter.getFormatObj(formatString);
  let { quantity, standardUnit, typeOfMesurement } = formatConverter.getStandardFormat(formatObj);

  if(quantity) {
    let unitPrice = parseFloat(price / quantity);
    return {
      unitPrice,
      typeOfMesurement,
      standardUnit
    }
  }

  return null;
}

module.exports = {
  getStandardPriceFormat
}
