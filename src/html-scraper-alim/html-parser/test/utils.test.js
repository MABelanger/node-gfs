'use strict';

const expect = require('chai').expect;
const fs = require('fs');

const utils = require('../utils');

describe('html-parser/utils', () => {

  it('should _getFormatPadded()', () => {
    expect(utils._getFormatPadded('2X3X4KG')).to.be.equal('2X3X4KG');
    expect(utils._getFormatPadded('2X3KG')).to.be.equal('1X2X3KG');
    expect(utils._getFormatPadded('3KG')).to.be.equal('1X1X3KG');
    expect(utils._getFormatPadded()).to.be.equal(null);
  });

  it('should _getNumber()', () => {
    expect(utils._getNumber('4KG')).to.be.equal('4');
    expect(utils._getNumber('4.5KG')).to.be.equal('4.5');
    expect(utils._getNumber('4.5__JUNK__')).to.be.equal('4.5');
    expect(utils._getNumber('3-5KG ENV (Kg.mcx)')).to.be.equal('3');

    // Null
    expect(utils._getNumber('__JUNK__4.5')).to.be.equal(null);
    expect(utils._getNumber(null)).to.be.equal(null);
    expect(utils._getNumber()).to.be.equal(null);
  });

  it('should _getPrefix()', () => {
    expect(utils._getPrefix('4KG')).to.be.equal('K');
    expect(utils._getPrefix('4.5MG')).to.be.equal('M');
    expect(utils._getPrefix('4.5__JUNK__KG')).to.be.equal(null);

    // Null
    expect(utils._getPrefix(null)).to.be.equal(null);
    expect(utils._getPrefix()).to.be.equal(null);
  });

  it('should _getUnit()', () => {
    let units = ['LB','G','L','UN','\''];

    units.forEach((unit) =>{
      // float number + unit
      expect(utils._getUnit('1.00' + unit)).to.be.equal(unit);
      // integer number + unit
      expect(utils._getUnit('1' + unit)).to.be.equal(unit);
      // only unit
      expect(utils._getUnit(unit)).to.be.equal(null);
    });

    // Unknow UNIT ABC
    expect(utils._getUnit('4.5ABC')).to.be.equal(null);
    expect(utils._getUnit('4.5__JUNK__KG')).to.be.equal(null);

    // Null
    expect(utils._getUnit(null)).to.be.equal(null);
    expect(utils._getUnit()).to.be.equal(null);
  });

  it('should getFormatedPrice()', () => {
    expect(utils.getFormatedPrice('5,50')).to.be.equal(5.5);
    expect(utils.getFormatedPrice('5.50')).to.be.equal(5.5);
    expect(utils.getFormatedPrice('0.00')).to.be.equal(0);

    // Null
    expect(utils.getFormatedPrice(null)).to.be.equal(null);
    expect(utils.getFormatedPrice()).to.be.equal(null);
  });

  it('should getFormatedFormat()', () => {
    expect(utils.getFormatedFormat('5.50KG')).to.be.equal('1X1X5.50KG');
    expect(utils.getFormatedFormat('2X5.50KG')).to.be.equal('1X2X5.50KG');
    expect(utils.getFormatedFormat('3X2X5.50LB')).to.be.equal('3X2X5.50LB');

    // Null
    expect(utils.getFormatedFormat(null)).to.be.equal(null);
    expect(utils.getFormatedFormat('')).to.be.equal(null);
    expect(utils.getFormatedFormat()).to.be.equal(null);
  });
});
