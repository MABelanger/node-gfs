'use strict';

function getSessionCookie(sessionId) {
  // example : 'JSESSIONID=0000B1nOCCiobYRnmVj_Ui8VAxE:19tl92die'
  return 'JSESSIONID=' + sessionId;
}

module.exports = {
  getSessionCookie
}
