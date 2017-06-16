'use strict';

import { HEADERS, BASE_URL_ITEM } from './constants';

function _getSessionCookie(cookie) {
  let { cfId, cfToken } = cookie;
  // example : "CFID=25797033; CFTOKEN=71433318"
  let cookieStr = 'CFID=' + cfId + '; ' + 'CFTOKEN=' + cfToken;
  return cookieStr;
}

function getOptionsDetailsPage(itemId, request, cookie) {
  let urlItemDetail = BASE_URL_ITEM + itemId;

  let reqCookie = request.cookie(_getSessionCookie(cookie));
  let myJar = request.jar();

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
