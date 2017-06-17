'use strict';

const expect = require('chai').expect;
const fs = require('fs');

const htmlParser = require('../index');

describe('html-parser getParsedData()', () => {
  let dataOneLine = null;

  before((done) => {
    fs.readFile(__dirname + '/alim_37912.html', 'utf8', function(error, data) {
      // remove all new lines and tabs
      dataOneLine = data.replace(/(\r\n|\n|\r|\t)/gm, '');
      done();
    });
  });

  it('should getParsedData() -> All cases', () => {
    let after = {
      price : htmlParser._getPrice(dataOneLine),
      productName : htmlParser._getProductName(dataOneLine),
      packetFormat : htmlParser._getFormat(dataOneLine)
    };
    expect(htmlParser.getParsedData(dataOneLine)).to.be.deep.equal(after);
  });
});

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

describe('html-parser null', () => {
  let dataOneLine = null;

  it('should _getPrice()', () => {
    expect(htmlParser._getPrice(null)).to.be.equal(null);
    expect(htmlParser._getPrice("garbage")).to.be.equal(null);
  });

  it('should _getFormat()', () => {
    expect(htmlParser._getFormat(null)).to.be.equal(null);
    expect(htmlParser._getFormat("garbage")).to.be.equal(null);
  });

  it('should _getProductName()', () => {
    expect(htmlParser._getProductName(null)).to.be.equal(null);
    expect(htmlParser._getProductName("garbage")).to.be.equal(null);
  });

  it('should getParsedData()', () => {
    let after = {
      price : htmlParser._getPrice(dataOneLine),
      productName : htmlParser._getProductName(dataOneLine),
      packetFormat : htmlParser._getFormat(dataOneLine)
    };
    expect(htmlParser.getParsedData(dataOneLine)).to.be.deep.equal(after);
  });
});
