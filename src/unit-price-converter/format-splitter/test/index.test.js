  'use strict';

  const expect = require('chai').expect;
  const fs = require('fs');

  const formatSplitter = require('../index');
  const prefixAndUnitSplitter = require('../prefix-and-unit-splitter');

  describe('format-splitter', () => {
    it('should always be true', () => {
      expect(true).to.be.true;
    });

    it('should getFormatObj().quantity without float', () => {
      let quantity = formatSplitter.getFormatObj('2X1X880G').quantity;
      expect(quantity).to.be.equal('880');
    });

    it('shouldgetFormatObj().quantity with float', () => {
      let quantity = formatSplitter.getFormatObj('2X1X880.5G').quantity;
      expect(quantity).to.be.equal('880.5');
    });

    it('should getFormatObj() G', () => {
      let prefixAndUnit = formatSplitter._getPrefixAndUnit('880.5G');
      expect(prefixAndUnit).to.be.equal('G');
    });

    it('should _getPrefixAndUnit() KG', () => {
      let prefixAndUnit = formatSplitter._getPrefixAndUnit('880.5KG');
      expect(prefixAndUnit).to.be.equal('KG');
    });

    it('should _getPrefixAndUnit() KG without float', () => {
      let prefixAndUnit = formatSplitter._getPrefixAndUnit('880KG');
      expect(prefixAndUnit).to.be.equal('KG');
    });

    it('should getFormatObj() get {packet, format, quantity, prefixSymblol, unitSymbol}', () => {
      let mesure = '880KG';
      let packetFormat = '2X4X' + mesure;
      let prefixAndUnit = formatSplitter._getPrefixAndUnit(mesure);
      let { packet, format, quantity, prefixSymblol, unitSymbol } =
                                formatSplitter.getFormatObj(packetFormat);

      expect(packet).to.be.equal('2');
      expect(format).to.be.equal('4');
      expect(quantity).to.be.equal(formatSplitter._getItemQuantity(mesure));
      expect(prefixSymblol).to.be.equal(prefixAndUnitSplitter.getPrefixSymbol(prefixAndUnit));
      expect(unitSymbol).to.be.equal(prefixAndUnitSplitter.getUnitSymbol(unitSymbol));
    });
  });
