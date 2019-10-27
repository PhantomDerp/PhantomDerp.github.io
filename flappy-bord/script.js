//vars
var canvas = document.getElementById("mahcanvas");
var ctx = canvas.getContext("2d");
var score = 0;
var y = 100;
var ySpeed = 0;
var pipes = {};
var pipeCount = 0;
var dead = false;

ctx.beginPath()
ctx.rect(0,450,500,50)
ctx.fill()
ctx.closePath()

///////////////////////////////////////////////////////////////////////////////////////////////

function spawnPipe() {
  pipeCount += 1;
  pipes[String(pipeCount)] = {};
  pipes[String(pipeCount)]["x"] = 500;
  pipes[String(pipeCount)]["y"] = Math.floor(Math.random() * 200 + 150)
} spawnPipe()

function onNewFrame() {
  //animation
  ctx.clearRect(0,0,500,450)
  ctx.beginPath()
  ctx.rect(50,y,50,30)
  ctx.fill()
  ctx.clearRect(90,y+5,5,5)
  ctx.closePath()
  
  for (i in pipes) {
    ctx.beginPath()
    ctx.rect(pipes[i]['x'],pipes[i]['y'],70,400)
    ctx.rect(pipes[i]['x'],0,70,pipes[i]['y'] - 120)
    ctx.fill()
    ctx.closePath()
  }
  
  if (y < 420) {y -= ySpeed} else {dead = true}
  if (ySpeed > -10) {ySpeed -= 0.5}
  for (i in pipes) {
    pipes[i]['x'] -= 4 + (score / 100000)
    if (pipes[i]['x'] < 100 && pipes[i]['x'] + 70 > 50 && (y + 30 > pipes[i]['y'] || y < pipes[i]['y'] - 120)) {dead = true}
  }
  if (dead == false) {score += 1}
  document.getElementById("display").innerHTML = 'Score: ' + String(score)
}

//controls
setInterval(onNewFrame,20)
setInterval(spawnPipe,2000)
document.addEventListener('keydown', function(event) {
  if (event.key == ' ') {if (dead == false) {ySpeed = 8}}
});
