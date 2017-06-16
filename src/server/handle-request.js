'use strict';

import htmlScraper from '../html-scraper';
import unitPriceConverter from '../unit-price-converter';

import utils from './utils';
import mock from './mock.json';

const IS_MOCK = true;

function _emitFromHmlScraper(id, sessionId, socket) {
  let date = utils.formatDate(new Date());
  htmlScraper.requestData(id, sessionId, function cb(parsedData) {
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

function emitToClient(dataClient, socket, isMock) {
  let { sessionId, ids } = dataClient;

  if (!(ids && ids.length > 0)) {
    return null;
  }

  for (let i = 0; i < ids.length; i++) {
    setTimeout(function() {
      if (isMock) {
        _emitFromMock(i, socket);
      } else {
        let id = ids[i];
        _emitFromHmlScraper(id, sessionId, socket);
      }
    }, i * 1000); // end setTimeout()
  } // end for()

}

module.exports = {
  emitToClient
}
