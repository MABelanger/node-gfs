'use strict';

import requestGfs from './request-gfs';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//Whenever someone connects this gets executed
io.on('connection', function(socket){
  console.log('A user connected');

  socket.on('clientEvent', function(data){
    var items = JSON.parse(data);
    
    for(var i=0; i<items.length; i++) {

      (function(i){
        setTimeout(function(){
          var item = items[i];
          var itemId = item.gfs.id;
          var itemNameMcta = item.mcta;
          var itemNameGfs = item.gfs.description;
          requestGfs.getPrice(itemId, function cb(price){
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
