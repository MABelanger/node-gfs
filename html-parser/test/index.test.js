'use strict';

const expect = require('chai').expect;
const fs = require('fs');

const htmlParser = require('./index');

describe('html-parser bagel.html', () => {

  let bagelData = null;

  before((done) => {
    fs.readFile(__dirname + '/bagel.html', 'utf8', function(error, data) {
      // remove all new lines and tabs
      bagelData = data.replace(/(\r\n|\n|\r|\t)/gm, '');
      done();
    });
  });

  it('should getPrice()', () => {
    expect( htmlParser.getPrice(bagelData) ).to.be.equal(21.89);
  });

  it('should getPacket()', () => {
    expect( htmlParser.getPacket(bagelData) ).to.be.equal(6);
  });

  it('should getFormat()', () => {
    expect( htmlParser.getFormat(bagelData) ).to.be.equal('6X112G');
  });

  it('should getPacketFormat()', () => {
    expect( htmlParser.getPacketFormat(bagelData) )
      .to.be.equal(htmlParser.getPacket(bagelData) + 'X' + htmlParser.getFormat(bagelData));
  });

  // SURG PAIN À DÉJEUNER (14080)
  it('should getProductName()', () => {
    expect( htmlParser.getProductName(bagelData) ).to.be.equal('BAGEL PLEIN SAVEUR TR');
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

  it('should getPrice()', () => {
    expect( htmlParser.getPrice(poivreData) ).to.be.equal(162.57);
  });

  it('should getPacket()', () => {
    expect( htmlParser.getPacket(poivreData) ).to.be.equal(6);
  });

  it('should getFormat()', () => {
    expect( htmlParser.getFormat(poivreData) ).to.be.equal('1X750G');
  });

  it('should getPacketFormat()', () => {
    expect( htmlParser.getPacketFormat(poivreData) )
      .to.be.equal(htmlParser.getPacket(poivreData) + 'X' + htmlParser.getFormat(poivreData));
  });

  // SURG PAIN À DÉJEUNER (14080)
  it('should getProductName()', () => {
    expect( htmlParser.getProductName(poivreData) ).to.be.equal('SAUCE MEL POIVRE VERT');
  });
});
