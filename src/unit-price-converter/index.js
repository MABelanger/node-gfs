'use strict';

const formatConverter = require('./format-converter');
const formatSplitter = require('./format-splitter');

// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

function getStandardPriceFormat(formatString, price) {
  let formatObj = formatSplitter.getFormatObj(formatString);

  let { quantity, standardUnit, typeOfMesurement } =
              formatConverter.getStandardFormat(formatObj);

  let unitPrice = null;
  let unitPriceFormated = null;

  if (quantity && price) {
    unitPrice = parseFloat(price) / parseFloat(quantity);
    unitPriceFormated = formatter.format(unitPrice).replace('$', '');
  }

  return {
    unitPriceFormated,
    typeOfMesurement,
    standardUnit
  };
}

module.exports = {
  getStandardPriceFormat
};
