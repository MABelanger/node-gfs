'use strict';

import request from 'request';

import utils from './utils';
import htmlParser from './html-parser';

function requestData(itemId, cookie, cb) {

  let optionsDetailsPage = utils.getOptionsDetailsPage(itemId, request, cookie);

  // First request to setup the next request. We don't care about the data.
  // The server setup the id for the next loading page.
  request(optionsDetailsPage, function(error, response, body) {
    console.log('body', body);
  });
}

let cookie = {
  cfId : '25797033',
  cfToken : '71433318'
};

requestData("37912", cookie, function cb(body){
  
});
