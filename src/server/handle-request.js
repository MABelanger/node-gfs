'use strict';

import htmlScraper from '../html-scraper';
import utils from './utils';

function _emitFromHmlScraper(id, cookie, socket, supplierStr) {
  let htmlScraper = htmlScraper.getHtmlScraper(supplierStr);
  let promise = htmlScraper.requestData(id, cookie);

  promise.then((parsedData) => {
    let allData = utils.getCombinedData(id, parsedData);
    socket.emit('dataJson_' + supplierStr , allData);
  });
}

function _emitFromMock(id, socket, supplierStr) {
  let mock = utils.getMock(supplierStr)
  let parsedData = mock.find((item)=>{
    return item.id === id;
  });

  let allData = utils.getCombinedData(id, parsedData);
  socket.emit('dataJson_' + supplierStr , allData);
}

function emitToClient(dataClient, socket) {
  let { isMock, supplier, cookie, ids } = dataClient;

  if (!(ids && ids.length > 0)) {
    return null;
  }

  for (let i = 0; i < ids.length; i++) {
    setTimeout(function() {
      let id = ids[i];
      if (isMock) {
        _emitFromMock(id, socket, supplier);
      } else {
        _emitFromHmlScraper(id, cookie, socket, supplier);
      }
    }, i * 1000); // end setTimeout()
  } // end for()
}

module.exports = {
  emitToClient
};
