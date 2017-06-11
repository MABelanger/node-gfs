'use strict';

const expect = require('chai').expect;
const fs = require('fs');

const stdUnit = require('../index');


describe('std-unit', () => {

  let units = null;

  before((done) => {
    fs.readFile(__dirname + '/units.json', 'utf8', function(error, jsonData) {
      units = JSON.parse(jsonData)
      done();
    });
  });

  it('should always be true', () => {
    expect(true).to.be.true;
  });

  it('should getFormatObj() get packet, format and mesure', () => {
    let { packet, format, mesure } = stdUnit.getFormatObj("2X4X880G")
    expect( packet ).to.be.equal('2');
    expect( format ).to.be.equal('4');
    expect( mesure ).to.be.equal('880G');
  });

  it('should getItemQuantity() without float', () => {
    let mesure = stdUnit.getFormatObj("2X1X880G").mesure;
    expect(stdUnit.getItemQuantity(mesure)).to.be.equal('880');
  });

  it('should getItemQuantity() with float', () => {
    let mesure = stdUnit.getFormatObj("2X1X880.5G").mesure;
    expect(stdUnit.getItemQuantity(mesure)).to.be.equal('880.5');
  });

  it('should getItemUnit() G', () => {
    let mesure = stdUnit.getFormatObj("2X1X880.5G").mesure;
    expect(stdUnit.getItemUnit(mesure)).to.be.equal('G');
  });

  it('should getItemUnit() KG', () => {
    let mesure = stdUnit.getFormatObj("2X1X880.5KG").mesure;
    expect(stdUnit.getItemUnit(mesure)).to.be.equal('KG');
  });

  it('should getItemUnit() KG without float', () => {
    let mesure = stdUnit.getFormatObj("2X1X880KG").mesure;
    expect(stdUnit.getItemUnit(mesure)).to.be.equal('KG');
  });

});
