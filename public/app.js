function init() {
  console.log("pippo");
  var socket = io();

  var canvas = document.getElementById("canvas");
  var stage = new createjs.Stage(canvas);
}
