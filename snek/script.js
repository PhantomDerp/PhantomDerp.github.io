"use strict";

//vars
var canvas = document.getElementById("mahcanvas");
var ctx = canvas.getContext("2d");
//var corpses = [];
var i;

//constructors
function Player(x = 250, y = 250) {
  this.parts = [{x: x, y: y}];
  this.xspeed = 0;
  this.yspeed = 0;
  this.moved = false;
  this.spawnPart = function() {
    this.parts.push({
      x: this.parts[this.parts.length - 1].x,
      y: this.parts[this.parts.length - 1].y
    });
  }
  this.die = function() {
    clearInterval(gameloop);
  }
}

function Coin(x = Math.floor(Math.random() * 50) * 10, y = Math.floor(Math.random() * 50) * 10) {
  this.x = x;
  this.y = y;
  this.randomize = function() {
    this.x = Math.floor(Math.random() * 50) * 10;
    this.y = Math.floor(Math.random() * 50) * 10;
  }
}

var player = new Player();
var coin = new Coin();
player.spawnPart();
player.spawnPart();

//loop
var gameloop = setInterval(function() {
  //logic
  player.moved = false;
  player.parts.pop()
  player.parts.unshift({x: player.parts[0].x + player.xspeed, y: player.parts[0].y + player.yspeed});
  
  if (player.parts[0].x === coin.x && player.parts[0].y === coin.y) {
    coin.randomize();
    player.spawnPart();
    player.spawnPart();
    player.spawnPart();
    player.spawnPart();
    player.spawnPart();
    player.spawnPart();
    player.spawnPart();
    player.spawnPart();
    player.spawnPart();
    player.spawnPart();
  }
  
  if (player.parts[0].x === 500 || player.parts[0].y === 500 || player.parts[0].x === -10 || player.parts[0].y === -10) {player.die();}
  
  if (player.xspeed !== player.yspeed) {
    for (i = 1; i < player.parts.length; i++) {
      if (player.parts[0].x === player.parts[i].x && player.parts[0].y === player.parts[i].y) {
        player.die();
      }
    }
  }
  
  //draw
  ctx.clearRect(0,0,500,500)
  
  ctx.fillStyle = '#00ff00';
  ctx.beginPath();
  ctx.rect(coin.x, coin.y, 10, 10);
  ctx.fill();
  ctx.closePath();
  
  ctx.fillStyle = '#ffffff';
  for (i in player.parts) {
    ctx.beginPath();
    ctx.rect(player.parts[i].x + 1, player.parts[i].y + 1, 8, 8);
    ctx.fill();
    ctx.closePath();
  }
  
  ctx.fillText(String(player.parts.length), 2, 10);
}, 150);

document.addEventListener('keydown', function(event) {
  if (player.moved === false) {
    if ((event.keyCode === 87 || event.keyCode === 38) && player.yspeed !== 10) {player.xspeed = 0; player.yspeed = -10; player.moved = true}
    if ((event.keyCode === 65 || event.keyCode === 37) && player.xspeed !== 10) {player.xspeed = -10; player.yspeed = 0; player.moved = true}
    if ((event.keyCode === 83 || event.keyCode === 40) && player.yspeed !== -10) {player.xspeed = 0; player.yspeed = 10; player.moved = true}
    if ((event.keyCode === 68 || event.keyCode === 39) && player.xspeed !== -10) {player.xspeed = 10; player.yspeed = 0; player.moved = true}
  }
});
