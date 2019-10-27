//vars
var canvas = document.getElementById("mahcanvas");
var ctx = canvas.getContext("2d");
var wpressed = false;
var spressed = false;
var uppressed = false;
var downpressed = false;
var p1 = 150;
var p2 = 150;
var bx = 300;
var by = 150;
var bxspeed = 0;
var difference;
while (bxspeed > -3 && bxspeed < 3) {
  bxspeed = Math.random() * 10 - 5;
}
var byspeed = Math.random() * 10 - 5;
var p1wins = 0;
var p2wins = 0;
const paddlespeed = 6;

ctx.fillStyle = '#ffffff';

//functions

function retry() {
  clearInterval(gameloop)
  p1 = 150;
  p2 = 150;
  bx = 300;
  by = 150;
  bxspeed = 0;
  while (bxspeed > -3 && bxspeed < 3) {
    bxspeed = Math.random() * 14 - 7;
  }
  byspeed = Math.random() * 10 - 5;
  gameloop = setInterval(onNewFrame,20);
}

  

function onNewFrame() {
  //logic
  bx += bxspeed;
  by += byspeed;
  
  if (wpressed && p1 > 40) {p1 -= paddlespeed}
  if (spressed && p1 < 260) {p1 += paddlespeed}
  if (uppressed && p2 > 40) {p2 -= paddlespeed}
  if (downpressed && p2 < 260) {p2 += paddlespeed}
  
  if (by >= p1 - 47 && by <= p1 + 47 && bx < 42 && bx > 28) {bxspeed *= -1;difference = (by - p1) / 15;byspeed += difference;bxspeed += 0.5}
  if (by >= p2 - 47 && by <= p2 + 47 && bx < 572 && bx > 558) {bxspeed *= -1;difference = (by - p2) / 15;byspeed += difference;bxspeed -= 0.5}
  
  if (by >= 293 || by <= 7) {byspeed *= -1}
  

  
  //animation
  ctx.clearRect(0,0,600,300);
  ctx.beginPath();
  ctx.rect(25,p1 - 40,10,80);
  ctx.rect(565,p2 - 40,10,80);
  ctx.arc(bx,by,5,0,Math.PI * 2);
  ctx.fill();
  ctx.closePath();
  if (bx < 0) {clearInterval(gameloop);p2wins += 1;document.getElementById('display').innerHTML = String(p1wins) + ' | ' + String(p2wins)}
  if (bx > 600) {clearInterval(gameloop);p1wins += 1;document.getElementById('display').innerHTML = String(p1wins) + ' | ' + String(p2wins)}
}

//controls
var gameloop = setInterval(onNewFrame,20);

document.addEventListener('keydown', function(event) {
  if (event.key === 'w') {wpressed = true}
  if (event.key === 's') {spressed = true}
  if (event.keyCode === 38) {uppressed = true}
  if (event.keyCode === 40) {downpressed = true}
});

document.addEventListener('keyup', function(event) {
  if (event.key === 'w') {wpressed = false}
  if (event.key === 's') {spressed = false}
  if (event.keyCode === 38) {uppressed = false}
  if (event.keyCode === 40) {downpressed = false}
});
