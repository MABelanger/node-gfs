'use strict';

import supplier from '../supplier';
import unitPriceConverter from '../unit-price-converter';

import utils from './utils';
import mock from './mock.json';

function _getHtmlScraper(supplier) {
  if (supplier === 'GFS') {
    return supplier.gfs.htmlScraper;
  } else if (supplier === 'ALIM') {
    return supplier.alimPlus.htmlScraper;
  }
}

function _emitFromHmlScraper(id, cookie, socket, supplier) {
  let date = utils.formatDate(new Date());

  let htmlScraper = _getHtmlScraper(supplier);

  htmlScraper.requestData(id, cookie, function cb(parsedData) {
    let { price, packetFormat } = parsedData;

    let { unitPriceFormated, standardUnit } =
        unitPriceConverter.getStandardPriceFormat(packetFormat, price);

    let allData = Object.assign(parsedData, {
      id: id,
      unitPriceFormated: unitPriceFormated,
      standardUnit: standardUnit,
      date: date
    });
    socket.emit('dataJson_' + supplier , allData);
  }); // end requestData()
}

function _emitFromMock(i, socket, supplier) {
  let date = utils.formatDate(new Date());
  let parsedData = mock[i];
  let { id, price, packetFormat } = parsedData;

  let { unitPriceFormated, standardUnit } =
      unitPriceConverter.getStandardPriceFormat(packetFormat, price);

  let allData = Object.assign(parsedData, {
    id: id,
    unitPriceFormated: unitPriceFormated,
    standardUnit: standardUnit,
    date: date
  });
  socket.emit('dataJson_'+ supplier, allData);
}

function emitToClient(dataClient, socket) {
  let { isMock, supplier, cookie, ids } = dataClient;

  if (!(ids && ids.length > 0)) {
    return null;
  }

  for (let i = 0; i < ids.length; i++) {
    setTimeout(function() {
      if (isMock) {
        _emitFromMock(i, socket, supplier);
      } else {
        let id = ids[i];
        _emitFromHmlScraper(id, cookie, socket, supplier);
      }
    }, i * 1000); // end setTimeout()
  } // end for()
}

module.exports = {
  emitToClient
};
