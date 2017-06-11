var request = require('request')




var j = request.jar();
var headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
};


function getPrice(itemId, cb) {
  var cookie = request.cookie('JSESSIONID=' + '0000B1nOCCiobYRnmVj_Ui8VAxE:19tl92die');
  var urlItemView = 'https://connect.gfs.ca/pnet/ItemView.jsp?itemNbr=' + itemId;
  var urlItemViewSummary = "https://connect.gfs.ca/pnet/ItemViewSummary.jsp";

  j.setCookie(cookie, urlItemView);


  request({url: urlItemView, jar: j, headers: headers}, function (error, response, body) {
    request({url: urlItemViewSummary, jar: j, headers: headers}, function (error, response, body) {
      cb( getPriceFromHtml(body) )
    });
  });
}

module.exports = {
  getPrice
}


/*
var fs = require("fs");

fs.readFile("./list.json", "utf8", function(error, data) {
  var items = JSON.parse(data);
  for(var i=0; i<items.length; i++) {

    (function(i){
      setTimeout(function(){
        var item = items[i];
        var itemId = item.gfs.id;
        var itemNameMcta = item.mcta;
        var itemNameGfs = item.gfs.description;
        getPrice(itemId, itemNameGfs)
      }, i*1000);
    })(i);

  }
});
*/
