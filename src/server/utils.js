'use strict';
import mockGfs from './mock/gfs.json';
import mockAlim from './mock/alim.json';
import unitPriceConverter from '../unit-price-converter';

function _formatDate(date) {
  let d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
}

function getMock(supplierStr) {
  if (supplierStr === 'GFS') {
    return mockGfs;
  } else if (supplierStr === 'ALIM') {
    return mockAlim;
  }
}

function getCombinedData(id, parsedData) {
  let date = _formatDate(new Date());
  let { price, packetFormat } = parsedData;

  let { unitPriceFormated, standardUnit } =
      unitPriceConverter.getStandardPriceFormat(packetFormat, price);

  let combinedData = Object.assign(parsedData, {
    id: id,
    unitPriceFormated: unitPriceFormated,
    standardUnit: standardUnit,
    date: date
  });

  return combinedData;
}

module.exports = {
  getCombinedData,
  getMock
};
