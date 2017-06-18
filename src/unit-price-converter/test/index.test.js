'use strict';

const expect = require('chai').expect;

const unitPriceConverter = require('../index');

describe('unit-price-converter', () => {
  it('should always be true', () => {
    expect(true).to.be.true;
  });

  it('should getUnitPrice()', () => {
    let formatString = '2X1X3.78L';
    let price = '5.50';
    let { unitPriceFormated, standardUnit } =
        unitPriceConverter.getStandardPriceFormat(formatString, price);

    expect(unitPriceFormated).to.be.equal('0.73');
    expect(standardUnit).to.be.equal('l');
  });

  it('should getUnitPrice() formatString=null', () => {
    let formatString = null;
    let price = '5.50';
    let { unitPriceFormated, standardUnit } =
        unitPriceConverter.getStandardPriceFormat(formatString, price);

    expect(unitPriceFormated).to.be.equal(null);
    expect(standardUnit).to.be.equal('unknow');
  });

  it('should getUnitPrice() price=null', () => {
    let formatString = '2X1X3.78L';
    let price = null;
    let { unitPriceFormated, standardUnit } =
        unitPriceConverter.getStandardPriceFormat(formatString, price);

    expect(unitPriceFormated).to.be.equal(null);
    expect(standardUnit).to.be.equal('l');
  });
});
