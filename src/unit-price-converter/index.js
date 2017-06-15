'use strict';

const formatConverter = require('./format-converter');
const formatSplitter = require('./format-splitter');

// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

function getStandardPriceFormat(formatString, price) {
  let formatObj = formatSplitter.getFormatObj(formatString);
  let { quantity, standardUnit, typeOfMesurement } =
              formatConverter.getStandardFormat(formatObj);

  if(quantity) {
    let unitPrice = parseFloat( parseFloat(price) / parseFloat(quantity) );
    let unitPriceFormated = formatter.format(unitPrice).replace('$', '');

    return {
      unitPriceFormated,
      typeOfMesurement,
      standardUnit
    }
  }

  return null;
}

module.exports = {
  getStandardPriceFormat
}
