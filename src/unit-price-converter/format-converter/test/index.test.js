'use strict';

const expect = require('chai').expect;
const fs = require('fs');

const formatConverter = require('../index');
const { TYPES } = require('../constants');


describe('format-converter', () => {

  it('should always be true', () => {
    expect(true).to.be.true;
  });

  it('Private API : should _getTypeOfMesurement("K")', () => {
    expect(formatConverter._getTypeOfMesurement("L")).to.be.equal(TYPES.VOLUME);
    expect(formatConverter._getTypeOfMesurement("G")).to.be.equal(TYPES.WEIGHT);
    expect(formatConverter._getTypeOfMesurement("UN")).to.be.equal(TYPES.UNITY);
  });

  it('Private API : should _getPrefixMultiplicator("K")', () => {
    expect(formatConverter._getPrefixMultiplicator("K")).to.be.equal(1000);
    expect(formatConverter._getPrefixMultiplicator("M")).to.be.equal(1/1000);
  });

  it('Public API : should getStandardFormat().quantity', () => {
    let formatObj = {
      packet: "3",
      format: "2",
      quantity : "50",
      prefixSymblol: "K",
      unitSymbol : "G"
    }

    let standardFormat = formatConverter.getStandardFormat(formatObj);
    expect(standardFormat.quantity).to.be.equal(3 * 2 * 50);
  });

  it('Public API : should getStandardFormat().typeOfMesurement', () => {
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
