'use strict';

import request from 'request';

import utils from './utils';
import htmlParser from './html-parser';

function requestData(itemId, sessionId, cb) {
  let optionsMainPage = utils.getOptionsMainPage(itemId, request, sessionId);
  let optionsDetailsPage = utils.getOptionsDetailsPage(request, sessionId);

  // First request to setup the next request. We don't care about the data.
  // The server setup the id for the next loading page.
  request(optionsMainPage, function (error, response, body) {
    // Second request to get the real data
    request(optionsDetailsPage, function (error, response, body) {
      cb( htmlParser.getParsedData(body) )
    });
  });
}

module.exports = {
  requestData
}
