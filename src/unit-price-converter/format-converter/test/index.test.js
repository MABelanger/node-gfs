'use strict';

const expect = require('chai').expect;
const fs = require('fs');

const formatConverter = require('../index');
const { TYPES } = require('../constants');


describe('format-converter', () => {

  it('should always be true', () => {
    expect(true).to.be.true;
  });

  it('should getTypeOfMesurement("K")', () => {
    expect(formatConverter.getTypeOfMesurement("L")).to.be.equal(TYPES.VOLUME);
    expect(formatConverter.getTypeOfMesurement("G")).to.be.equal(TYPES.WEIGHT);
    expect(formatConverter.getTypeOfMesurement("UN")).to.be.equal(TYPES.UNITY);
  });

  it('should getMultiplicator("K")', () => {
    expect(formatConverter.getMultiplicator("K")).to.be.equal(1000);
    expect(formatConverter.getMultiplicator("M")).to.be.equal(1/1000);
  });

  it('should getStandardFormat().quantity', () => {
    let formatObj = {
      packet: "3",
      format: "2",
      quantity : "50",
      prefixSymblol: "K",
      unitSymbol : "G"
    }

    let standardFormat = formatConverter.getStandardFormat(formatObj);
    expect(standardFormat.quantity).to.be.equal(3 * 2 * 50 * 1000);
  });

  it('should getStandardFormat().typeOfMesurement', () => {
    let formatObj = {
      packet: "3",
      format: "2",
      quantity : "50",
      prefixSymblol: "K",
      unitSymbol : "G"
    }

    let standardFormat = formatConverter.getStandardFormat(formatObj);
    expect(standardFormat.typeOfMesurement).to.be.equal(TYPES.WEIGHT);
  });

});
