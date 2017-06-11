'use strict';

import htmlScraper from './html-scraper';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//Whenever someone connects this gets executed
io.on('connection', function(socket){
  console.log('A user connected');

  socket.on('clientEvent', function(data){
    let items = JSON.parse(data);

    for(let i=0; i<items.length; i++) {
      (function(i){
        setTimeout(function(){
          let item = items[i];
          let itemId = item.gfs.id;
          let itemNameMcta = item.mcta;
          let itemNameGfs = item.gfs.description;
          htmlScraper.requestData(itemId, '0000z-YIVCmwao5cs1H-YAO4rcW:19tl92die', function cb(price){
            socket.emit('testerEvent', { description: price });
          });
        }, i*1000);
      })(i);
    }
  });

  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
