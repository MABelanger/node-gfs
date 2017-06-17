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
  let myJar = request.jar();

  let reqCookie = request.cookie('CFID=25797033');
  myJar.setCookie(reqCookie, urlItemDetail);

  reqCookie = request.cookie('CFTOKEN=71433318');
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
