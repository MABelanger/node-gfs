'use strict';

import htmlScraper from '../html-scraper';
import utils from './utils';

function _emitFromHmlScraper(id, cookie, socket, supplierStr) {
  let htmlScraperSupplier = htmlScraper.getHtmlScraper(supplierStr);
  let promise = htmlScraperSupplier.requestData(id, cookie);

  promise.then((parsedData) => {
    let combinedData = utils.getCombinedData(id, parsedData);
    socket.emit('dataJson_' + supplierStr , combinedData);
  });
}

function _emitFromMock(id, socket, supplierStr) {
  let mock = utils.getMock(supplierStr)

  // get the parsedData from the mock of the id
  let parsedData = mock.find((item)=>{
    return item.id === id;
  });

  let combinedData = utils.getCombinedData(id, parsedData);
  socket.emit('dataJson_' + supplierStr , combinedData);
}

function emitToClient(dataClient, socket) {
  let { isMock, supplier, cookie, ids } = dataClient;

  if (ids) {
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
}

module.exports = {
  emitToClient
};
