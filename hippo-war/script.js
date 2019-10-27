//vars
var canvas = document.getElementById("mahcanvas");
var ctx = canvas.getContext("2d");
var x = 250;
var y = 250;
var goingUp = false;
var goingDown = false;
var goingLeft = false;
var goingRight = false;
var aimingUp = false;
var aimingDown = false;
var aimingLeft = false;
var aimingRight = false;
var bullets = {};
var globalBulletXspeed = 0;
var globalBulletYspeed = 0;
var count = 0;
var enemies = {};
var enemySpawnLocations = [0,500];
var count2 = 0;
var count3 = 0;
var enemiesInWave = 0;
var enemyTypes = ["normal","normal","normal","normal","normal","normal","normal","normal","normal","normal","normal","speeder"];
var lives = 3;
var score = 0;

//functions
function newWave() {
  count3 = 0;
  enemiesInWave = Math.ceil(Math.random() * 5 + 5)
  while (count3 < enemiesInWave) {
    count2 += 1;
    count3 += 1;
    enemies["enemy" + String(count2)] = {};
    enemies["enemy" + String(count2)]["type"] = enemyTypes[Math.ceil(Math.random() * 12)]
    enemies["enemy" + String(count2)]["x"] = enemySpawnLocations[Math.ceil(Math.random() * 2 - 1)];
    enemies["enemy" + String(count2)]["y"] = Math.random() * 400;
    enemies["enemy" + String(count2)]["alive"] = true;
    enemies["enemy" + String(count2)]["speed"] = 2;
    if (enemies["enemy" + String(count2)]["type"] == "speeder") {enemies["enemy" + String(count2)]["speed"] = 4}
  }
}

function spawnBullet() {
  if (!(globalBulletXspeed == 0) || !(globalBulletYspeed == 0)) {
  count += 1;
  bullets["bullet" + String(count)] = {};
  bullets["bullet" + String(count)]["alive"] = true;
  bullets["bullet" + String(count)]["x"] = x;
  bullets["bullet" + String(count)]["y"] = y;
  bullets["bullet" + String(count)]["xspeed"] = globalBulletXspeed;
  bullets["bullet" + String(count)]["yspeed"] = globalBulletYspeed;
  }
}

function onNewFrame() {
  //animation
  document.getElementById("display").innerHTML = "Score: " + String(score) + " Lives: " + String(lives)
  if (lives > -1) {
  ctx.clearRect(0,0,500,500)
  ctx.fillStyle = "#000000";
  ctx.beginPath()
  ctx.arc(x,y,20,0,Math.PI * 2)
  ctx.fill()
  ctx.closePath()

  for (i in bullets) {
    if (bullets[i]["alive"]) {
      ctx.beginPath()
      ctx.arc(bullets[i]["x"],bullets[i]["y"],5,0,Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  }

  for (i in enemies) {
    if (enemies[i]["alive"]) {
    ctx.beginPath()
    ctx.arc(enemies[i]["x"],enemies[i]["y"],15,0,Math.PI * 2)
    if (enemies[i]["type"] == "speeder") {ctx.fillStyle = "red"} else {ctx.fillStyle = "orange"}
    ctx.fill()
    ctx.closePath()
    }
  }

  //player
  if (goingUp) {if (y > 20) {y -= 4}}
  if (goingDown) {if (y < 480) {y += 4}}
  if (goingLeft) {if (x > 20) {x -= 4}}
  if (goingRight) {if (x < 480) {x += 4}}
  //bullets
  globalBulletXspeed = 0;
  globalBulletYspeed = 0;
  if (aimingUp) {globalBulletYspeed -= 4}
  if (aimingDown) {globalBulletYspeed += 4}
  if (aimingLeft) {globalBulletXspeed -= 4}
  if (aimingRight) {globalBulletXspeed += 4}
  for (i in bullets) {
    if (bullets[i]["alive"]) {
      bullets[i]["x"] += bullets[i]["xspeed"];
      bullets[i]["y"] += bullets[i]["yspeed"];

      for (ii in enemies) {if (enemies[ii]["alive"]) {
        if (bullets[i]["x"] >= enemies[ii]["x"] - 15 && bullets[i]["x"] <= enemies[ii]["x"] + 15 && bullets[i]["y"] >= enemies[ii]["y"] - 15 && bullets[i]["y"] <= enemies[ii]["y"] + 15) {bullets[i]["alive"] = false; enemies[ii]["alive"] = false}
      }}

      if (bullets[i]["x"] > 500 || bullets[i]["x"] < 0 || bullets[i]["y"] > 500 || bullets[i]["y"] < 0) {bullets[i]["alive"] = false}
  }}

  //enemies
  for (i in enemies) {
    if (enemies[i]["alive"]) {
    if (enemies[i]["x"] > x) {enemies[i]["x"] -= enemies[i]["speed"]}
    if (enemies[i]["x"] < x) {enemies[i]["x"] += enemies[i]["speed"]}
    if (enemies[i]["y"] > y) {enemies[i]["y"] -= enemies[i]["speed"]}
    if (enemies[i]["y"] < y) {enemies[i]["y"] += enemies[i]["speed"]}

    if (enemies[i]["x"] + 15 >= x - 15 && enemies[i]["x"] - 15 <= x + 15 && enemies[i]["y"] + 15 >= y - 15 && enemies[i]["y"] - 15 <= y + 15) {enemies[i]["alive"] = false; lives -= 1}
      }
    }
  }
}

//controls
document.addEventListener('keydown', function(event) {
  if (event.key == 'w') {
    goingUp = true}
  if (event.key == 's') {
    goingDown = true}
  if (event.key == 'a') {
    goingLeft = true}
  if (event.key == 'd') {
    goingRight = true}
  if (event.key == 'i') {
    aimingUp = true}
  if (event.key == 'k') {
    aimingDown = true}
  if (event.key == 'j') {
    aimingLeft = true}
  if (event.key == 'l') {
    aimingRight = true}
});

document.addEventListener('keyup', function(event) {
  if (event.key == 'w') {
    goingUp = false}
  if (event.key == 's') {
    goingDown = false}
  if (event.key == 'a') {
    goingLeft = false}
  if (event.key == 'd') {
    goingRight = false}
  if (event.key == 'i') {
    aimingUp = false}
  if (event.key == 'k') {
    aimingDown = false}
  if (event.key == 'j') {
    aimingLeft = false}
  if (event.key == 'l') {
    aimingRight = false}
});




setInterval(onNewFrame,20);
setInterval(spawnBullet,200);
setInterval(newWave,5000)
