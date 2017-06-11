'use strict';

import request from 'request';

import { HEADERS, BASE_URL_ITEM, URL_ITEM_SUMMARY} from './constants';
import { getSessionCookie } from './utils';
import htmlParser from './html-parser';

let myJar = request.jar();

function requestData(itemId, sessionId, cb) {
  let cookie = request.cookie( getSessionCookie(sessionId) );
  let urlItemView = BASE_URL_ITEM + itemId;

  myJar.setCookie(cookie, urlItemView);

  let options = {
    url: urlItemView,
    jar: myJar,
    headers: HEADERS
  };

  // First request to setup the next request. We don't care about the data.
  // The server setup the id for the next loading page.
  request(options, function (error, response, body) {
    let options = {
      url: URL_ITEM_SUMMARY,
      jar: myJar,
      headers: HEADERS
    };

    // Second request to get the real data
    request(options, function (error, response, body) {
      console.log('htmlParser.getParsedData(body)', htmlParser.getParsedData(body))
      cb( htmlParser.getParsedData(body) )
    });
  });
}

module.exports = {
  requestData
}
