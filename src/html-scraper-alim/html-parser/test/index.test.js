'use strict';

const expect = require('chai').expect;
const fs = require('fs');

const htmlParser = require('../index');

describe('html-parser alim_37912.html', () => {
  let dataOneLine = null;

  before((done) => {
    fs.readFile(__dirname + '/alim_37912.html', 'utf8', function(error, data) {
      // remove all new lines and tabs
      dataOneLine = data.replace(/(\r\n|\n|\r|\t)/gm, '');
      done();
    });
  });

  it('should _getPrice()', () => {
    expect(htmlParser._getPrice(dataOneLine)).to.be.equal(30.5);
  });

  it('should _getFormat()', () => {
    expect(htmlParser._getFormat(dataOneLine)).to.be.equal('1X1X2KG');
  });

  it('should _getProductName()', () => {
    expect(htmlParser._getProductName(dataOneLine)).to.be.equal('Bouch baton mozz pate');
  });

});

describe('html-parser saucice.html', () => {
  let dataOneLine = null;

  before((done) => {
    fs.readFile(__dirname + '/saucice.html', 'utf8', function(error, data) {
      // remove all new lines and tabs
      dataOneLine = data.replace(/(\r\n|\n|\r|\t)/gm, '');
      done();
    });
  });

  it('should _getPrice()', () => {
    expect(htmlParser._getPrice(dataOneLine)).to.be.equal(28.9);
  });

  it('should _getFormat()', () => {
    expect(htmlParser._getFormat(dataOneLine)).to.be.equal('1X1X3KG');
  });

  it('should _getProductName()', () => {
    expect(htmlParser._getProductName(dataOneLine)).to.be.equal('Saucisse ital douce');
  });

});

describe('html-parser fritte.html', () => {
  let dataOneLine = null;

  before((done) => {
    fs.readFile(__dirname + '/fritte.html', 'utf8', function(error, data) {
      // remove all new lines and tabs
      dataOneLine = data.replace(/(\r\n|\n|\r|\t)/gm, '');
      done();
    });
  });

  it('should _getPrice()', () => {
    expect(htmlParser._getPrice(dataOneLine)).to.be.equal(27.25);
  });

  it('should _getFormat()', () => {
    expect(htmlParser._getFormat(dataOneLine)).to.be.equal('1X6X5LB');
  });

  it('should _getProductName()', () => {
    expect(htmlParser._getProductName(dataOneLine)).to.be.equal('Frite 3/8 reg taterchef');
  });

});

/*
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
*/
