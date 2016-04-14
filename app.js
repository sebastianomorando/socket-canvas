// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

var numUsers = 0;
//here we need a global array to store all touches
//redis?
//when the array have more than 1000 touches, we pop the older ones

io.on('connection', function (socket) {
  ++numUsers

  socket.who = Math.random();

  console.log("Someone connected");
  console.log(numUsers+" connected users");

  //everytime someone send his position information
  //we broadcast all the position information to everyone
  //or is maybe better to use a tick() and send every tot seconds
  //the information?

  //someone clicks, we receive the position
  //we need some kind of global position
  //or maybe the position can only be relative
  //to the last position
   socket.on('click', function (x,y) {
      //we are going to calculate the new position
     console.log(x+","+y);
     //now i send the position to everyone
     //the broadcast obviously doesn't have memory of past events
      socket.broadcast.emit('draw', {
        who : socket.who,
        x: x,
        y: y
      });
   });


   socket.on('disconnect', function () {
      --numUsers;
      console.log("Someone disconnected");
     console.log(numUsers+" connected users");
    });

});
