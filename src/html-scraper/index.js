'use strict';

import supplier from './supplier';

function getHtmlScraper(supplierStr) {
  if (supplierStr === 'GFS') {
    return supplier.gfs;
  } else if (supplierStr === 'ALIM') {
    return supplier.alimPlus;
  }
}

module.exports = {
  getHtmlScraper
};
