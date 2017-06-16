'use strict';

const expect = require('chai').expect;
const fs = require('fs');

const htmlParser = require('../index');

describe('html-parser bagel.html', () => {
  let bagelData = null;

  before((done) => {
    fs.readFile(__dirname + '/bagel.html', 'utf8', function(error, data) {
      // remove all new lines and tabs
      bagelData = data.replace(/(\r\n|\n|\r|\t)/gm, '');
      done();
    });
  });

  it('should _getPrice()', () => {
    expect(htmlParser._getPrice(bagelData)).to.be.equal(21.89);
  });

  it('should _getPacket()', () => {
    expect(htmlParser._getPacket(bagelData)).to.be.equal(6);
  });

  it('should _getFormat()', () => {
    expect(htmlParser._getFormat(bagelData)).to.be.equal('6X112G');
  });

  it('should _getPacketFormat()', () => {
    expect(htmlParser._getPacketFormat(bagelData))
      .to.be.equal(htmlParser._getPacket(bagelData) + 'X' + htmlParser._getFormat(bagelData));
  });

  // SURG PAIN À DÉJEUNER (14080)
  it('should _getProductName()', () => {
    expect(htmlParser._getProductName(bagelData)).to.be.equal('BAGEL PLEIN SAVEUR TR');
  });
});

describe('html-parser poivre.html', () => {
  let poivreData = null;

  before((done) => {
    fs.readFile(__dirname + '/poivre.html', 'utf8', function(error, data) {
      // remove all new lines and tabs
      poivreData = data.replace(/(\r\n|\n|\r|\t)/gm, '');
      done();
    });
  });

  it('should _getPrice()', () => {
    expect(htmlParser._getPrice(poivreData)).to.be.equal(162.57);
  });

  it('should _getPacket()', () => {
    expect(htmlParser._getPacket(poivreData)).to.be.equal(6);
  });

  it('should _getFormat()', () => {
    expect(htmlParser._getFormat(poivreData)).to.be.equal('1X750G');
  });

  it('should _getPacketFormat()', () => {
    expect(htmlParser._getPacketFormat(poivreData))
      .to.be.equal(htmlParser._getPacket(poivreData) + 'X' + htmlParser._getFormat(poivreData));
  });

  // SURG PAIN À DÉJEUNER (14080)
  it('should _getProductName()', () => {
    expect(htmlParser._getProductName(poivreData)).to.be.equal('SAUCE MEL POIVRE VERT');
  });
});
