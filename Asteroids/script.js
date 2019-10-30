//vars
var canvas = document.getElementById("mahcanvas");
var ctx = canvas.getContext("2d");
const pi = Math.PI;
var px = 350;
var py = 350;
var pangle = 0;
var wpressed = false;
var apressed = false;
var dpressed = false;
var pxspeed = 0;
var pyspeed = 0;
var bullets = {};
var bcount = 0;
var asteroids = {};
var acount = 0;
var fired = false;
var level = 1;

//functions

//this function stolen off google
function isEmpty(myObject) {
  for(var key in myObject) {
    if (myObject.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

function spawnAsteroid(x,y,xspeed,yspeed,angle,aspeed,size) {
  acount += 1;
  asteroids[String(acount)] = {};
  asteroids[String(acount)].x = x;
  asteroids[String(acount)].y = y;
  asteroids[String(acount)].xspeed = xspeed;
  asteroids[String(acount)].yspeed = yspeed;
  asteroids[String(acount)].angle = angle;
  asteroids[String(acount)].aspeed = aspeed;
  asteroids[String(acount)].size = size;
} spawnAsteroid(Math.floor(Math.random() * 2) * 700 - 700,Math.floor(Math.random() * 2) * 700 - 700,Math.random() * 4 - 2,Math.random() * 4 - 2,Math.floor(Math.random() * 360),Math.floor(Math.random() * 4),3);

function spawnBullet(x,y,xspeed,yspeed) {
  bcount += 1;
  bullets[String(bcount)] = {};
  bullets[String(bcount)].x = x;
  bullets[String(bcount)].y = y;
  bullets[String(bcount)].xspeed = xspeed;
  bullets[String(bcount)].yspeed = yspeed;
}

function pythag(x,y,x2,y2) {
  return Math.sqrt(Math.abs(x - x2) * Math.abs(x - x2) + Math.abs(y - y2) * Math.abs(y - y2))
}

function rads(number) {
  number %= 360;
  return number * (pi/180);
}

function onNewFrame() {
  //logic
  
  //rapid fire
//  if (fired) {spawnBullet(px +  20 * Math.cos(rads(pangle)), py + 20 * Math.sin(rads(pangle)),pxspeed + 2 * Math.cos(rads(pangle)),pyspeed + 2 * Math.sin(rads(pangle)))}
  
  if (apressed) {pangle -= 3}
  if (dpressed) {pangle += 3}
  if (wpressed) {pxspeed += Math.cos(rads(pangle)) / 50; pyspeed += Math.sin(rads(pangle)) / 50}
  
  px += pxspeed;
  py += pyspeed;
  
  if (px > 700) {px = 0}
  if (px < 0) {px = 700}
  if (py > 700) {py = 0}
  if (py < 0) {py = 700}
  
  for (var i in bullets) {
    bullets[i].x += bullets[i].xspeed;
    bullets[i].y += bullets[i].yspeed;
    if (bullets[i].x > 700 || bullets[i].x < 0 || bullets[i].y > 700 || bullets[i].y < 0) {delete bullets[i]}
  }
  
  for (var i in asteroids) {
    asteroids[i].angle += asteroids[i].aspeed;
    asteroids[i].x += asteroids[i].xspeed;
    asteroids[i].y += asteroids[i].yspeed;
    
    if (asteroids[i].x >= 725) {asteroids[i].x = 0} else
    if (asteroids[i].x <= -25) {asteroids[i].x = 700}
    if (asteroids[i].y >= 725) {asteroids[i].y = 0} else
    if (asteroids[i].y <= -25) {asteroids[i].y = 700}
    
    
    if (asteroids[i].size === 1) {yeet = 15} else if (asteroids[i].size === 2) {yeet = 25} else {yeet = 50}
    
    if (pythag(asteroids[i].x,asteroids[i].y,px + 20 * Math.cos(rads(0 + pangle)), py + 20 * Math.sin(rads(0 + pangle))) < yeet) {clearInterval(gameloop)}
    if (pythag(asteroids[i].x,asteroids[i].y,px + 14 * Math.cos(rads(140 + pangle)), py + 14 * Math.sin(rads(140 + pangle))) < yeet) {clearInterval(gameloop)}
    if (pythag(asteroids[i].x,asteroids[i].y,px + 14 * Math.cos(rads(220 + pangle)), py + 14 * Math.sin(rads(220 + pangle))) < yeet) {clearInterval(gameloop)}
    
    for (var ii in bullets) {
      if (pythag(bullets[ii].x, bullets[ii].y, asteroids[i].x, asteroids[i].y) < yeet) {
        //bullet collision
        delete bullets[ii];
        if (asteroids[i].size !== 1) {
        spawnAsteroid(asteroids[i].x,asteroids[i].y,Math.random() * 4 - 2,Math.random() * 4 - 2,Math.floor(Math.random() * 360),Math.floor(Math.random() * 4),asteroids[i].size - 1);
        spawnAsteroid(asteroids[i].x,asteroids[i].y,Math.random() * 4 - 2,Math.random() * 4 - 2,Math.floor(Math.random() * 360),Math.floor(Math.random() * 10 - 5),asteroids[i].size - 1);
        spawnAsteroid(asteroids[i].x,asteroids[i].y,Math.random() * 4 - 2,Math.random() * 4 - 2,Math.floor(Math.random() * 360),Math.floor(Math.random() * 10 - 5),asteroids[i].size - 1);
        }
        delete asteroids[i];
      }
    }
  }
  
  if (isEmpty(asteroids)) {
    level += 1;
    var count = 0
    while (count < level) {
      count += 1;
      document.getElementById("display").innerHTML = "Level: " + String(level)
      spawnAsteroid(Math.floor(Math.random() * 2) * 700 - 700,Math.floor(Math.random() * 2) * 700 - 700,Math.random() * 4 - 2,Math.random() * 4 - 2,Math.floor(Math.random() * 360),Math.floor(Math.random() * 4),3);
    }
  }
  
  //drawing
  ctx.clearRect(0,0,700,700);
  ctx.beginPath();

  
  ctx.moveTo(px + 20 * Math.cos(rads(0 + pangle)), py + 20 * Math.sin(rads(0 + pangle)));
  ctx.lineTo(px + 14 * Math.cos(rads(140 + pangle)), py + 14 * Math.sin(rads(140 + pangle)));
  ctx.lineTo(px + 5 * Math.cos(rads(180 + pangle)), py + 5 * Math.sin(rads(180 + pangle)));
  ctx.lineTo(px + 14 * Math.cos(rads(220 + pangle)), py + 14 * Math.sin(rads(220 + pangle)));
  ctx.lineTo(px + 20 * Math.cos(rads(0 + pangle)), py + 20 * Math.sin(rads(0 + pangle)));
  ctx.stroke();
  ctx.closePath();
  
  for (var i in bullets) {
    ctx.beginPath();
    ctx.arc(bullets[i].x,bullets[i].y,2.5,0,pi * 2);
    ctx.stroke();
    ctx.closePath();
  }
  
  for (var i in asteroids) {
    ctx.beginPath();
    var yeet;
    if (asteroids[i].size === 1) {yeet = 10} else if (asteroids[i].size === 2) {yeet = 25} else {yeet = 50}
    ctx.moveTo(asteroids[i].x + yeet * Math.cos(rads(45 + asteroids[i].angle)), asteroids[i].y + yeet * Math.sin(rads(45 + asteroids[i].angle)));
    ctx.lineTo(asteroids[i].x + yeet * Math.cos(rads(90 + asteroids[i].angle)), asteroids[i].y + yeet * Math.sin(rads(90 + asteroids[i].angle)));
    ctx.lineTo(asteroids[i].x + yeet * Math.cos(rads(135 + asteroids[i].angle)), asteroids[i].y + yeet * Math.sin(rads(135 + asteroids[i].angle)));
    ctx.lineTo(asteroids[i].x + yeet * Math.cos(rads(180 + asteroids[i].angle)), asteroids[i].y + yeet * Math.sin(rads(180 + asteroids[i].angle)));
    ctx.lineTo(asteroids[i].x + yeet * Math.cos(rads(225 + asteroids[i].angle)), asteroids[i].y + yeet * Math.sin(rads(225 + asteroids[i].angle)));
    ctx.lineTo(asteroids[i].x + yeet * Math.cos(rads(270 + asteroids[i].angle)), asteroids[i].y + yeet * Math.sin(rads(270 + asteroids[i].angle)));
    ctx.lineTo(asteroids[i].x + yeet * Math.cos(rads(315 + asteroids[i].angle)), asteroids[i].y + yeet * Math.sin(rads(315 + asteroids[i].angle)));
    ctx.lineTo(asteroids[i].x + yeet * Math.cos(rads(360 + asteroids[i].angle)), asteroids[i].y + yeet * Math.sin(rads(360 + asteroids[i].angle)));
    ctx.lineTo(asteroids[i].x + yeet * Math.cos(rads(45 + asteroids[i].angle)), asteroids[i].y + yeet * Math.sin(rads(45 + asteroids[i].angle)));
    ctx.stroke();
    ctx.closePath();
  }
}

var gameloop = setInterval(onNewFrame, 10);
document.addEventListener('keydown', function(event) {
  if (event.key == 'w' || event.key == 'W') {wpressed = true}
  if (event.key == 'a' || event.key == 'A') {apressed = true}
  if (event.key == 'd' || event.key == 'D') {dpressed = true}
  if (event.key == ' ') {if (fired === false) {spawnBullet(px +  20 * Math.cos(rads(pangle)), py + 20 * Math.sin(rads(pangle)),pxspeed + 3 * Math.cos(rads(pangle)),pyspeed + 3 * Math.sin(rads(pangle)))} fired = true}
});

document.addEventListener('keyup', function(event) {
  if (event.key == 'w' || event.key == 'W') {wpressed = false}
  if (event.key == 'a' || event.key == 'A') {apressed = false}
  if (event.key == 'd' || event.key == 'D') {dpressed = false}
  if (event.key == ' ') {fired = false}
});
