'use strict';

const expect = require('chai').expect;
const fs = require('fs');

const dataNormalizer = require('../index');

describe('data-normalizer', () => {

  it('should _getFormatPadded()', () => {
    expect(dataNormalizer._getFormatPadded('2X3X4KG')).to.be.equal('2X3X4KG');
    expect(dataNormalizer._getFormatPadded('2X3KG')).to.be.equal('1X2X3KG');
    expect(dataNormalizer._getFormatPadded('3KG')).to.be.equal('1X1X3KG');
    expect(dataNormalizer._getFormatPadded()).to.be.equal(null);
  });

  it('should _getNumber()', () => {
    expect(dataNormalizer._getNumber('4KG')).to.be.equal('4');
    expect(dataNormalizer._getNumber('4.5KG')).to.be.equal('4.5');
    expect(dataNormalizer._getNumber('4.5__JUNK__')).to.be.equal('4.5');
    expect(dataNormalizer._getNumber('3-5KG ENV (Kg.mcx)')).to.be.equal('3');

    // Null
    expect(dataNormalizer._getNumber('__JUNK__4.5')).to.be.equal(null);
    expect(dataNormalizer._getNumber(null)).to.be.equal(null);
    expect(dataNormalizer._getNumber()).to.be.equal(null);
  });

  it('should _getPrefix()', () => {
    expect(dataNormalizer._getPrefix('4KG')).to.be.equal('K');
    expect(dataNormalizer._getPrefix('4.5MG')).to.be.equal('M');
    expect(dataNormalizer._getPrefix('4.5__JUNK__KG')).to.be.equal(null);

    // Null
    expect(dataNormalizer._getPrefix(null)).to.be.equal(null);
    expect(dataNormalizer._getPrefix()).to.be.equal(null);
  });

  it('should _getUnit()', () => {
    let units = ['LB','G','L','UN','\''];

    units.forEach((unit) =>{
      // float number + unit
      expect(dataNormalizer._getUnit('1.00' + unit)).to.be.equal(unit);
      // integer number + unit
      expect(dataNormalizer._getUnit('1' + unit)).to.be.equal(unit);
      // only unit
      expect(dataNormalizer._getUnit(unit)).to.be.equal(null);
    });

    // Unknow UNIT ABC
    expect(dataNormalizer._getUnit('4.5ABC')).to.be.equal(null);
    expect(dataNormalizer._getUnit('4.5__JUNK__KG')).to.be.equal(null);

    // Null
    expect(dataNormalizer._getUnit(null)).to.be.equal(null);
    expect(dataNormalizer._getUnit()).to.be.equal(null);
  });

  it('should getFormatedPrice()', () => {
    expect(dataNormalizer.getFormatedPrice('5,50')).to.be.equal(5.5);
    expect(dataNormalizer.getFormatedPrice('5.50')).to.be.equal(5.5);
    expect(dataNormalizer.getFormatedPrice('0.00')).to.be.equal(0);

    // Null
    expect(dataNormalizer.getFormatedPrice(null)).to.be.equal(null);
    expect(dataNormalizer.getFormatedPrice()).to.be.equal(null);
  });

  it('should getFormatedFormat()', () => {
    expect(dataNormalizer.getFormatedFormat('5.50KG')).to.be.equal('1X1X5.50KG');
    expect(dataNormalizer.getFormatedFormat('2X5.50KG')).to.be.equal('1X2X5.50KG');
    expect(dataNormalizer.getFormatedFormat('3X2X5.50LB')).to.be.equal('3X2X5.50LB');

    // Null
    expect(dataNormalizer.getFormatedFormat(null)).to.be.equal(null);
    expect(dataNormalizer.getFormatedFormat('')).to.be.equal(null);
    expect(dataNormalizer.getFormatedFormat()).to.be.equal(null);
  });
});
