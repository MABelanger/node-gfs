'use strict';

import request from 'request';

import utils from './utils';
import htmlParser from './html-parser';

function requestData(itemId, cookie, cb) {

  let optionsDetailsPage = utils.getOptionsDetailsPage(itemId, request, cookie);


  // First request to setup the next request. We don't care about the data.
  // The server setup the id for the next loading page.
  request(optionsDetailsPage, function(error, response, body) {
    if (!error) {
      let bodyOneLine = body.replace(/(\r\n|\n|\r|\t)/gm, '');
      let parsedData = htmlParser.getParsedData(bodyOneLine);
      cb(parsedData);
    }
  });
}

module.exports = {
  requestData
};
