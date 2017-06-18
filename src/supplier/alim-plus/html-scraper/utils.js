'use strict';

import { HEADERS, BASE_URL_ITEM } from './constants';

function getOptionsDetailsPage(itemId, request, cookie) {
  let urlItemDetail = BASE_URL_ITEM + itemId;
  let myJar = request.jar();

  let { cfId, cfToken } = cookie;

  let reqCookie = request.cookie('CFID=' + cfId);
  myJar.setCookie(reqCookie, urlItemDetail);

  reqCookie = request.cookie('CFTOKEN=' + cfToken);
  myJar.setCookie(reqCookie, urlItemDetail);

  return {
    url: urlItemDetail,
    jar: myJar,
    headers: HEADERS
  };
}

module.exports = {
  getOptionsDetailsPage
};
