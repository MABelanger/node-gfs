'use strict';

const expect = require('chai').expect;

const unitPriceConverter = require('../index');

describe('unit-price-converter', () => {

  it('should always be true', () => {
    expect(true).to.be.true;
  });

  it('should getUnitPrice()', () => {
    let formatString = "2X1X3.78L";
    let price = 5.50;
    let { unitPrice, standardUnit } =
        unitPriceConverter.getStandardPriceFormat(formatString, price);

    expect(unitPrice).to.be.equal(0.7275132275132276);
    expect(standardUnit).to.be.equal('l');
  });
});
