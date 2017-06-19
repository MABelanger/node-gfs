'use strict';

import { HEADERS, BASE_URL_ITEM, URL_ITEM_SUMMARY } from './constants';

function getOptionsMainPage(itemId, request, cookie) {
  let urlItemView = BASE_URL_ITEM + itemId;
  let { jSessionId } = cookie;

  let reqCookie = request.cookie('JSESSIONID=' + jSessionId);

  let myJar = request.jar();
  myJar.setCookie(reqCookie, urlItemView);
  return {
    url: urlItemView,
    jar: myJar,
    headers: HEADERS
  };
}

function getOptionsDetailsPage(request, cookie) {
  let { jSessionId } = cookie;

  let reqCookie = request.cookie('JSESSIONID=' + jSessionId);

  let myJar = request.jar();
  myJar.setCookie(reqCookie, URL_ITEM_SUMMARY);
  return {
    url: URL_ITEM_SUMMARY,
    jar: myJar,
    headers: HEADERS
  };
}

module.exports = {
  getOptionsMainPage,
  getOptionsDetailsPage
};
