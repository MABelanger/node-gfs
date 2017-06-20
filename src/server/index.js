'use strict';

import fs from 'fs';
import url from 'url';
import path from 'path';

import handleEmit from './handle-emit';

var open = require("open");


let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

const URL_ROOT_REDIRECT = '/dist/index.html';


app.get('/', function (req, res, next) {
  return res.redirect(URL_ROOT_REDIRECT);
});


app.get('/dist/index.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

function serveFile (filename, req, res) {
  let fileStream = fs.createReadStream(filename);
  fileStream.pipe(res);
}

app.get('/dist/*', function(req, res) {
  let uri = url.parse(req.url).pathname;
  let filename = path.join(__dirname, uri);

  console.log('filename: ', filename);

  if (fs.existsSync(filename)) {
    serveFile(filename, req, res);
  } else {
    console.log('file do not exist', filename);
  }
});

// Whenever someone connects this gets executed
io.on('connection', function(socket) {
  console.log('A user connected');

  socket.on('clientEvent', function(jsonData) {
    let dataClient = JSON.parse(jsonData);
    handleEmit.emitToClient(dataClient, socket);
  }); // end clientEvent()

  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
});

http.listen(3000, function() {
  console.log('http://localhost:3000');
  open("http://localhost:3000");
});
