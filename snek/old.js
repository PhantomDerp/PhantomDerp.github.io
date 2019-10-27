//vars
var canvas = document.getElementById("mahcanvas");
var ctx = canvas.getContext("2d");
var parts = [{}];
var count;
var direction = "right";
var movex;
var movey;
var coinx = Math.floor(Math.random() * 50) * 10;
var coiny = Math.floor(Math.random() * 50) * 10;
var alive = true;
var turned;
var score = 1;

parts[0].x = 250;
parts[0].y = 250;



//functions
function spawnPart() {
  parts.push({})
  parts[parts.length - 1].x = parts[parts.length - 2].x;
  parts[parts.length - 1].y = parts[parts.length - 2].y;
  score += 1;
}

spawnPart();
spawnPart();

function onNewFrame() {
  document.getElementById("score").innerHTML = String(score);
  if (alive) {
    turned = false;
    ctx.clearRect(0,0,500,500)
    ctx.beginPath()
    ctx.fillStyle = "#00ff00";
    ctx.rect(coinx + 1,coiny + 1,8,8)
    ctx.fill()
    ctx.closePath()

    ctx.fillStyle = "#ffffff";

    for (var i in parts) {
    ctx.beginPath();
      ctx.rect(parts[i].x + 1,parts[i].y + 1,8,8);
      ctx.fill();
      ctx.closePath();
      count += 1;
    }

    movex = parts[0].x;
    movey = parts[0].y;

    if (direction == "right") {
      movex += 10;
      parts.pop();
      parts.unshift({});
      parts[0].x = movex;
      parts[0].y = movey;
    }
    if (direction == "left") {
      movex -= 10;
      parts.pop();
      parts.unshift({});
      parts[0].x = movex;
      parts[0].y = movey;
    }
    if (direction == "up") {
      movey -= 10;
      parts.pop();
      parts.unshift({});
      parts[0].x = movex;
      parts[0].y = movey;
    }
    if (direction == "down") {
      movey += 10;
      parts.pop();
      parts.unshift({});
      parts[0].x = movex;
      parts[0].y = movey;
    }

    if (parts[0].x == coinx && parts[0].y == coiny) {
      spawnPart()
      spawnPart()
      spawnPart()
      spawnPart()
      spawnPart()
      spawnPart()
      coinx = Math.floor(Math.random() * 50) * 10;
      coiny = Math.floor(Math.random() * 50) * 10;
    }

    if (parts[0].x >= 500 || parts[0].x <= -10 || parts[0].y <= -10 || parts[0].y >= 500) {
      alive = false;
    }

    count = 0;
    while (count < parts.length) {
      count += 1;
      if (parts[0].x == parts[count].x && parts[0].y == parts[count].y) {alive = false}
    }
  }
}

//controls
setInterval(onNewFrame,100);
document.addEventListener('keydown', function(event) {
  if (turned == false) {
    if (event.key == 'w') {if (direction != "down"){direction = "up"; turned = true}}
    if (event.key == 'a') {if (direction != "right"){direction = "left"; turned = true}}
    if (event.key == 's') {if (direction != "up"){direction = "down" turned = true}}
    if (event.key == 'd') {if (direction != "left"){direction = "right"; turned = true}}
}});
