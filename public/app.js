function init() {
  console.log("pippo");
  var socket = io();


  var canvas = document.getElementById("canvas");
  var stage = new createjs.Stage(canvas);

  stage.addEventListener("stagemouseup", function(e) {
    socket.emit("click", e.stageX,e.stageY);
    console.log("aaaa");
    drawStroke(e.stageX,e.stageY);
  });

  function drawStroke(x,y) {
    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(x,y,4);
    stage.addChild(circle);
    stage.update();
  }

  //I need a function that deletes old strokes when they go over MAX_STROKES

  socket.on('draw', function (data) {
    console.log(data);
    drawStroke(data.x, data.y);
  });

  socket.on('past strokes', function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++)
      drawStroke(data[i].x, data[i].y);
  });



}
