'use strict';

const expect = require('chai').expect;
const fs = require('fs');

const prefixAndUnitSplitter = require('../index');

describe('prefix-and-unit-splitter', () => {
  it('should always be true', () => {
    expect(true).to.be.true;
  });

  it('should getPrefixSymbol() K', () => {
    let prefixSymbol = prefixAndUnitSplitter.getPrefixSymbol('KG');
    expect(prefixSymbol).to.be.equal('K');
  });
});
