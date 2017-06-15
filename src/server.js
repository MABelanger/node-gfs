'use strict';

import htmlScraper from './html-scraper';
import utils from './utils';
import mock from './mock.json';
import unitPriceConverter from './unit-price-converter';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

function emitFromHmlScraper(id, sessionId, socket) {
  let date = utils.formatDate(new Date());
  htmlScraper.requestData(id, sessionId, function cb(parsedData){
    let allData = Object.assign(parsedData, {
      id: id,
      date: date
    })
    socket.emit('testerEvent', allData);
  }); // end requestData()
}

function emitFromMock(i, socket) {
  let date = utils.formatDate(new Date());
  let parsedData = mock[i];
  let { id, price, packetFormat } = parsedData;

  let { unitPriceFormated, standardUnit }
      = unitPriceConverter.getStandardPriceFormat(packetFormat, price);

  let allData = Object.assign(parsedData, {
    id: id,
    unitPriceFormated: unitPriceFormated,
    standardUnit: standardUnit,
    date: date
  });
  socket.emit('testerEvent', allData);
}


//Whenever someone connects this gets executed
io.on('connection', function(socket){
  console.log('A user connected');

  socket.on('clientEvent', function(jsonData){
    let data = JSON.parse(jsonData);
    let { sessionId, ids } = data;

    if(ids && ids.length > 0) {
      for(let i=0; i<ids.length; i++) {
        setTimeout(function(){
          let id = ids[i];
          //emitFromHmlScraper(id, sessionId, socket);
          emitFromMock(i, socket);
        }, i * 1000); // end setTimeout()
      } // end for()
    } // end if()
  }); // end clientEvent()

  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
