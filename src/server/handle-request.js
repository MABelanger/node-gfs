'use strict';

import htmlScraperGfs from '../html-scraper-gfs';
import htmlScraperAlim from '../html-scraper-alim';
import unitPriceConverter from '../unit-price-converter';

import utils from './utils';
import mock from './mock.json';

function _emitFromHmlScraper(id, cookie, socket, supplier) {
  let date = utils.formatDate(new Date());

  let htmlScraper = null;

  if (supplier == 'GFS') {
    htmlScraper = htmlScraperGfs;

  } else if (supplier == 'ALIM') {
    htmlScraper = htmlScraperAlim;
  }
  htmlScraper.requestData(id, cookie, function cb(parsedData) {
    let allData = Object.assign(parsedData, {
      id: id,
      date: date
    });
    socket.emit('testerEvent', allData);
  }); // end requestData()
}

function _emitFromMock(i, socket) {
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
  socket.emit('testerEvent', allData);
}

function emitToClient(dataClient, socket, isMock, supplier) {
  let { cookie, ids } = dataClient;

  if (!(ids && ids.length > 0)) {
    return null;
  }

  for (let i = 0; i < ids.length; i++) {
    setTimeout(function() {
      if (isMock) {
        _emitFromMock(i, socket);
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
