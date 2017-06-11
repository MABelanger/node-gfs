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

  socket.on('clientEvent', function(jsonData){
    let data = JSON.parse(jsonData);
    let sessionId = data.sessionId;
    let ids = data.ids;

    for(let i=0; i<ids.length; i++) {
      setTimeout(function(){
        let id = ids[i];
        htmlScraper.requestData(id, sessionId, function cb(parsedData){
          socket.emit('testerEvent', parsedData);
        });
      }, i*1000);
    }
  });

  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
