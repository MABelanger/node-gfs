'use strict';

import { HEADERS, BASE_URL_ITEM, URL_ITEM_SUMMARY} from './constants';

function _getSessionCookie(sessionId) {
  // example : 'JSESSIONID=0000B1nOCCiobYRnmVj_Ui8VAxE:19tl92die'
  return 'JSESSIONID=' + sessionId;
}

function getOptionsMainPage(itemId, request, sessionId) {
  let urlItemView = BASE_URL_ITEM + itemId;
  let cookie = request.cookie( _getSessionCookie(sessionId) );
  let myJar = request.jar();
  myJar.setCookie(cookie, urlItemView);
  return {
    url: urlItemView,
    jar: myJar,
    headers: HEADERS
  }
}

function getOptionsDetailsPage(request, sessionId) {
  let cookie = request.cookie( _getSessionCookie(sessionId) );
  let myJar = request.jar();
  myJar.setCookie(cookie, URL_ITEM_SUMMARY);
  return {
    url: URL_ITEM_SUMMARY,
    jar: myJar,
    headers: HEADERS
  };
}


module.exports = {
  getOptionsMainPage,
  getOptionsDetailsPage
}
