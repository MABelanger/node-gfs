'use strict';

import request from 'request';

import utils from './utils';
import htmlParser from './html-parser';

function requestData(itemId, cookie) {
  let optionsDetailsPage = utils.getOptionsDetailsPage(itemId, request, cookie);

  let primise = new Promise((resolve, reject) => {
    request(optionsDetailsPage, function(error, response, body) {
      if (!error) {
        let bodyOneLine = body.replace(/(\r\n|\n|\r|\t)/gm, '');
        resolve(htmlParser.getParsedData(bodyOneLine));
      } else {
        reject(error);
      }
    });
  });
  return primise;
}

module.exports = {
  requestData
};
