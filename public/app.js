function init() {
  console.log("pippo");
  var socket = io();

  var canvas = document.getElementById("canvas");
  var stage = new createjs.Stage(canvas);

  stage.addEventListener("stagemouseup", function(e) {
    socket.emit("click", e.stageX,e.stageY);
    console.log("aaaa");
    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(e.stageX,e.stageY,4);
    stage.addChild(circle);
    stage.update();
  });

  socket.on('draw', function (data) {
    console.log(data);
    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(data.x,data.y,4);
    stage.addChild(circle);
    stage.update();
  });
}
