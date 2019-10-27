//vars
var canvas = document.getElementById("mahcanvas");
var ctx = canvas.getContext("2d");
var playerX = 250;
var playerY = 250;
var rooms = {};
var roomCount;
var bulletCount = 0;
var currentRoom = 1;
var roomChoices;
var roomChoice;
var difficulty = 0;
var coins = 0;
var attackSpeed = 20;
var bulletDamage = 1;
var attackCooldown = 0;
var playerSpeed = 4;
var playerHp = 5;
var enemyCount = 0;
var enemyCount2 = 0;
var itemCount = 0;
var enemyAmount = 0;
var enemyDrop;
var doorUp = false;
var doorRight = false;
var doorDown = false;
var doorLeft = false;
var wPressed = false;
var aPressed = false;
var sPressed = false;
var dPressed = false;
var iPressed = false;
var jPressed = false;
var kPressed = false;
var lPressed = false;
//document.getElementById("display").innerHTML = String()
//functions
function newFloor() {
  rooms = {};
  roomCount = 0;
  roomChoices = ["shop","exit","enemy","enemy","enemy","enemy","enemy","enemy","enemy","enemy","enemy","enemy"];
  currentRoom = 1;
  difficulty += 1;
  while (roomCount < 12) {
    roomCount += 1;
    rooms[String(roomCount)] = {};
    roomChoice = Math.floor(Math.random() * roomChoices.length);
    rooms[String(roomCount)]["type"] = roomChoices[roomChoice];
    roomChoices.splice(roomChoice,1)

    rooms[String(roomCount)]["enemies"] = {};
    rooms[String(roomCount)]["items"] = {};
    rooms[String(roomCount)]["bullets"] = {}
  }

  if (rooms["1"]["type"] == "enemy") {rooms["1"]["type"] = null}
  for (i in rooms) {
    if (rooms[i]["type"] == "enemy") {
      enemyAmount = Math.floor(Math.random() * 4);
      enemyCount2 = 0;
      while (enemyCount2 < enemyAmount) {
        enemyCount2 += 1;
        spawnEnemy(Math.floor(Math.random() * 360 + 70),Math.floor(Math.random() * 360 + 70),Math.floor(Math.random() * 3 + 1),[true,false,false,false][Math.floor(Math.random() * 4)],2,i)
      }
    }
    if (rooms[i]["type"] == "shop") {
      if (Math.floor(Math.random() * 2) == 0) {spawnItem(246,246,"attackSpeedUp",i)} else {spawnItem(246,246,"attackDamageUp",i)}
    }
    if (rooms[i]["type"] == "exit") {}
  }
}

function spawnBullet(x,y,xSpeed,ySpeed,friendly) {
  bulletCount += 1;
  rooms[String(currentRoom)]["bullets"][String(bulletCount)] = {};
  rooms[String(currentRoom)]["bullets"][String(bulletCount)]["x"] = x;
  rooms[String(currentRoom)]["bullets"][String(bulletCount)]["y"] = y;
  rooms[String(currentRoom)]["bullets"][String(bulletCount)]["xSpeed"] = xSpeed;
  rooms[String(currentRoom)]["bullets"][String(bulletCount)]["ySpeed"] = ySpeed;
  rooms[String(currentRoom)]["bullets"][String(bulletCount)]["friendly"] = friendly;
}

function spawnEnemy(x,y,hp,ranged,speed,room) {
  enemyCount += 1;
  rooms[room]["enemies"][String(enemyCount)] = {};
  rooms[room]["enemies"][String(enemyCount)]["x"] = x;
  rooms[room]["enemies"][String(enemyCount)]["y"] = y;
  rooms[room]["enemies"][String(enemyCount)]["hp"] = hp + difficulty;
  rooms[room]["enemies"][String(enemyCount)]["ranged"] = ranged;
  rooms[room]["enemies"][String(enemyCount)]["speed"] = 1.5;
  rooms[room]["enemies"][String(enemyCount)]["attackOffset"] = Math.random() * 1000;
  rooms[room]["enemies"][String(enemyCount)]["firingDirection"] = null;
} //spawnEnemy(150,150,25,false,2,String(currentRoom))

function spawnItem(x,y,type,room) {
  itemCount += 1;
  rooms[room]["items"][String(itemCount)] = {};
  rooms[room]["items"][String(itemCount)]["x"] = x;
  rooms[room]["items"][String(itemCount)]["y"] = y;
  rooms[room]["items"][String(itemCount)]["type"] = type;
}

function enemiesAttack() {
  for (i in rooms[String(currentRoom)]["enemies"]) {
    if (rooms[String(currentRoom)]["enemies"][i]["ranged"]) {
      if (rooms[String(currentRoom)]["enemies"][i]["firingDirection"] == "up") {setTimeout(spawnBullet(rooms[String(currentRoom)]["enemies"][i]["x"] - 2.5,rooms[String(currentRoom)]["enemies"][i]["y"] - 2.5,0,-4,false),rooms[String(currentRoom)]["enemies"][i]["attackOffset"])}
      if (rooms[String(currentRoom)]["enemies"][i]["firingDirection"] == "down") {setTimeout(spawnBullet(rooms[String(currentRoom)]["enemies"][i]["x"] - 2.5,rooms[String(currentRoom)]["enemies"][i]["y"] - 2.5,0,4,false),rooms[String(currentRoom)]["enemies"][i]["attackOffset"])}
      if (rooms[String(currentRoom)]["enemies"][i]["firingDirection"] == "left") {setTimeout(spawnBullet(rooms[String(currentRoom)]["enemies"][i]["x"] - 2.5,rooms[String(currentRoom)]["enemies"][i]["y"] - 2.5,-4,0,false),rooms[String(currentRoom)]["enemies"][i]["attackOffset"])}
      if (rooms[String(currentRoom)]["enemies"][i]["firingDirection"] == "right") {setTimeout(spawnBullet(rooms[String(currentRoom)]["enemies"][i]["x"] - 2.5,rooms[String(currentRoom)]["enemies"][i]["y"] - 2.5,4,0,false),rooms[String(currentRoom)]["enemies"][i]["attackOffset"])}
    }
  }
}

newFloor()

//////////////////////////////////////////////////////////////////////////////////////////////

function onNewFrame() {
  //animation
  document.getElementById("display").innerHTML = "COINS: " + String(coins) + " | HP: " + String(playerHp);

  ctx.beginPath()
  ctx.fillStyle = "#6E6E6E";
  ctx.rect(0,0,500,500)
  ctx.fill()
  ctx.closePath()

  doorUp = false;
  doorDown = false;
  doorLeft = false;
  doorRight = false;

  ctx.beginPath()
  ctx.fillStyle = "#654321"
  if (String(currentRoom + 4) in rooms) {doorUp = true;ctx.rect(150,0,200,50)}
  if (String(currentRoom - 4) in rooms) {doorDown = true;ctx.rect(150,450,200,50)}
  if (String(currentRoom + 1) in rooms && (currentRoom + 1) % 4 != 1) {doorRight = true;ctx.rect(450,150,50,200)}
  if (String(currentRoom - 1) in rooms && (currentRoom - 1) % 4 != 0) {doorLeft = true;ctx.rect(0,150,50,200)}
  ctx.fill()
  ctx.closePath()

  ctx.clearRect(50,50,400,400)

  for (i in rooms[String(currentRoom)]["items"]) {
    ctx.beginPath()
    if (rooms[String(currentRoom)]["items"][i]["type"] == "heart") {ctx.fillStyle = "#ff0000"}
    else if (rooms[String(currentRoom)]["items"][i]["type"] == "coin") {ctx.fillStyle = "#ffff00"}
    else {ctx.fillStyle = "#00ff00"}

    ctx.rect(rooms[String(currentRoom)]["items"][i]["x"],rooms[String(currentRoom)]["items"][i]["y"],8,8)
    ctx.fill()
    ctx.closePath()
  }

  ctx.beginPath()
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#ffffff";
  ctx.arc(playerX,playerY,20,0,Math.PI * 2)
  ctx.fill()
  ctx.closePath()

  for (i in rooms[String(currentRoom)]["bullets"]) {
    ctx.beginPath()
    if (rooms[String(currentRoom)]["bullets"][i]["friendly"]) {
      ctx.fillStyle = "#ffffff";
    } else {
      ctx.fillStyle = "#ff0000";
    }
    ctx.rect(rooms[String(currentRoom)]["bullets"][i]["x"],rooms[String(currentRoom)]["bullets"][i]["y"],5,5)
    ctx.fill()
    ctx.closePath()
  }

  for (i in rooms[String(currentRoom)]["enemies"]) {
    ctx.strokeStyle = "#ffffff";
    if (rooms[String(currentRoom)]["enemies"][i]["hp"] == 1 || rooms[String(currentRoom)]["enemies"][i]["hp"] == 11) {ctx.fillStyle = "#ff0000"}
    if (rooms[String(currentRoom)]["enemies"][i]["hp"] == 2 || rooms[String(currentRoom)]["enemies"][i]["hp"] == 12) {ctx.fillStyle = "#ffa500"}
    if (rooms[String(currentRoom)]["enemies"][i]["hp"] == 3 || rooms[String(currentRoom)]["enemies"][i]["hp"] == 13) {ctx.fillStyle = "#ffff00"}
    if (rooms[String(currentRoom)]["enemies"][i]["hp"] == 4 || rooms[String(currentRoom)]["enemies"][i]["hp"] == 14) {ctx.fillStyle = "#00ff00"}
    if (rooms[String(currentRoom)]["enemies"][i]["hp"] == 5 || rooms[String(currentRoom)]["enemies"][i]["hp"] == 15) {ctx.fillStyle = "#0000ff"}
    if (rooms[String(currentRoom)]["enemies"][i]["hp"] == 6 || rooms[String(currentRoom)]["enemies"][i]["hp"] == 16) {ctx.fillStyle = "#4b0082"}
    if (rooms[String(currentRoom)]["enemies"][i]["hp"] == 7 || rooms[String(currentRoom)]["enemies"][i]["hp"] == 17) {ctx.fillStyle = "#8a2be2"}
    if (rooms[String(currentRoom)]["enemies"][i]["hp"] == 8 || rooms[String(currentRoom)]["enemies"][i]["hp"] == 18) {ctx.fillStyle = "#ffffff";ctx.strokeStyle = "#6e6e6e"}
    if (rooms[String(currentRoom)]["enemies"][i]["hp"] == 9 || rooms[String(currentRoom)]["enemies"][i]["hp"] == 19) {ctx.fillStyle = "#6e6e6e"}
    if (rooms[String(currentRoom)]["enemies"][i]["hp"] == 10) {ctx.fillStyle = "#000000";ctx.strokeStyle = "#6e6e6e"}
    if (rooms[String(currentRoom)]["enemies"][i]["hp"] >= 20) {ctx.fillStyle = "#000000"}
    ctx.beginPath()
    ctx.arc(rooms[String(currentRoom)]["enemies"][i]["x"],rooms[String(currentRoom)]["enemies"][i]["y"],20,0,Math.PI * 2)
    ctx.fill()
    if (rooms[String(currentRoom)]["enemies"][i]["hp"] > 9) {ctx.stroke()}
    ctx.closePath()
  }

  if (rooms[String(currentRoom)]["type"] == "exit") {
    ctx.fillStyle = "#654321";
    ctx.beginPath()
    ctx.rect(210,210,80,80)
    ctx.fill()
    ctx.closePath()
  }

//////////////////////////////////////////////////////////////////////////////////////////////

  //player
  if (playerHp > 0) {
  if (doorUp && playerY < 75 && playerX > 150 && playerX < 350) {playerY = 410; currentRoom += 4}
  if (doorDown && playerY > 425 && playerX > 150 && playerX < 350) {playerY = 90; currentRoom -= 4}
  if (doorLeft && playerX < 75 && playerY > 150 && playerY < 350) {playerX = 410; currentRoom -= 1}
  if (doorRight && playerX > 425 && playerY > 150 && playerY < 350) {playerX = 90; currentRoom += 1}
  if (rooms[String(currentRoom)]["type"] == "exit") {if (playerX > 210 && playerX < 290 && playerY > 210 && playerY < 290) {newFloor()}}

  if (wPressed) {if (playerY - 20 > 50) {playerY -= playerSpeed}}
  if (aPressed) {if (playerX - 20 > 50) {playerX -= playerSpeed}}
  if (sPressed) {if (playerY + 20 < 450) {playerY += playerSpeed}}
  if (dPressed) {if (playerX + 20 < 450) {playerX += playerSpeed}}

  attackXSpeed = 0;
  attackYSpeed = 0;
  if (iPressed) {attackYSpeed -= 4;}
  if (jPressed) {attackXSpeed -= 4;}
  if (kPressed) {attackYSpeed += 4;}
  if (lPressed) {attackXSpeed += 4;}
  if (attackCooldown <= 0) {
    if (attackXSpeed != 0 || attackYSpeed != 0) {
      spawnBullet(playerX - 2,playerY - 2,attackXSpeed,attackYSpeed,true)
      attackCooldown = attackSpeed + 1;
    }
  }
  attackCooldown -= 1;
  }

  //bullets
  for (i in rooms[String(currentRoom)]["bullets"]) {

    rooms[String(currentRoom)]["bullets"][i]["x"] += rooms[String(currentRoom)]["bullets"][i]["xSpeed"]
    rooms[String(currentRoom)]["bullets"][i]["y"] += rooms[String(currentRoom)]["bullets"][i]["ySpeed"]

    if (rooms[String(currentRoom)]["bullets"][i]["x"] <= 50 || rooms[String(currentRoom)]["bullets"][i]["x"] + 5 >= 450 || rooms[String(currentRoom)]["bullets"][i]["y"] <= 50 || rooms[String(currentRoom)]["bullets"][i]["y"] + 5 >= 450) {delete rooms[String(currentRoom)]["bullets"][i]}
    if (rooms[String(currentRoom)]["bullets"][i]["friendly"]) {
      for (ii in rooms[String(currentRoom)]["enemies"]) {
        if ((rooms[String(currentRoom)]["bullets"][i]["x"] + 5 > rooms[String(currentRoom)]["enemies"][ii]["x"] - 20 && rooms[String(currentRoom)]["bullets"][i]["x"] < rooms[String(currentRoom)]["enemies"][ii]["x"] + 20) &&(rooms[String(currentRoom)]["bullets"][i]["y"] + 5 > rooms[String(currentRoom)]["enemies"][ii]["y"] - 20 && rooms[String(currentRoom)]["bullets"][i]["y"] < rooms[String(currentRoom)]["enemies"][ii]["y"] + 20)) {
          rooms[String(currentRoom)]["enemies"][ii]["hp"] -= bulletDamage;
          delete rooms[String(currentRoom)]["bullets"][i];
        }
      }
    }
    if (rooms[String(currentRoom)]["bullets"][i]["friendly"] == false) {
      if (rooms[String(currentRoom)]["bullets"][i]["x"] + 5 > playerX - 20 && rooms[String(currentRoom)]["bullets"][i]["x"] < playerX + 20 && rooms[String(currentRoom)]["bullets"][i]["y"] + 5 > playerY - 20 && rooms[String(currentRoom)]["bullets"][i]["y"] < playerY + 20) {
        playerHp -= 1;
        delete rooms[String(currentRoom)]["bullets"][i];

      }

    }
  }

  //enemies
  for (i in rooms[String(currentRoom)]["enemies"]) {
    if (rooms[String(currentRoom)]["enemies"][i]["hp"] <= 0) {
      enemyDrop = Math.floor(Math.random() * 4);
      if (enemyDrop == 0) {spawnItem(rooms[String(currentRoom)]["enemies"][i]["x"] - 2,rooms[String(currentRoom)]["enemies"][i]["y"] - 2,"coin",String(currentRoom))}
      if (enemyDrop == 1) {spawnItem(rooms[String(currentRoom)]["enemies"][i]["x"] - 2,rooms[String(currentRoom)]["enemies"][i]["y"] - 2,"heart",String(currentRoom))}
      delete rooms[String(currentRoom)]["enemies"][i];
    }
    if (rooms[String(currentRoom)]["enemies"][i]["ranged"] == false) {
      if (playerX > rooms[String(currentRoom)]["enemies"][i]["x"]) {rooms[String(currentRoom)]["enemies"][i]["x"] += rooms[String(currentRoom)]["enemies"][i]["speed"]}
      if (playerX < rooms[String(currentRoom)]["enemies"][i]["x"]) {rooms[String(currentRoom)]["enemies"][i]["x"] -= rooms[String(currentRoom)]["enemies"][i]["speed"]}
      if (playerY > rooms[String(currentRoom)]["enemies"][i]["y"]) {rooms[String(currentRoom)]["enemies"][i]["y"] += rooms[String(currentRoom)]["enemies"][i]["speed"]}
      if (playerY < rooms[String(currentRoom)]["enemies"][i]["y"]) {rooms[String(currentRoom)]["enemies"][i]["y"] -= rooms[String(currentRoom)]["enemies"][i]["speed"]}
    }
    if (rooms[String(currentRoom)]["enemies"][i]["ranged"]) {

      if (Math.abs(playerX - rooms[String(currentRoom)]["enemies"][i]["x"]) > Math.abs(playerY - rooms[String(currentRoom)]["enemies"][i]["y"])) {
        if (playerY > rooms[String(currentRoom)]["enemies"][i]["y"]) {rooms[String(currentRoom)]["enemies"][i]["y"] += 2}
        if (playerY < rooms[String(currentRoom)]["enemies"][i]["y"]) {rooms[String(currentRoom)]["enemies"][i]["y"] -= 2}
        if (playerX > rooms[String(currentRoom)]["enemies"][i]["x"]) {rooms[String(currentRoom)]["enemies"][i]["firingDirection"] = "right"}
        if (playerX < rooms[String(currentRoom)]["enemies"][i]["x"]) {rooms[String(currentRoom)]["enemies"][i]["firingDirection"] = "left"}
      }

      if (Math.abs(playerX - rooms[String(currentRoom)]["enemies"][i]["x"]) < Math.abs(playerY - rooms[String(currentRoom)]["enemies"][i]["y"])) {
        if (playerX > rooms[String(currentRoom)]["enemies"][i]["x"]) {rooms[String(currentRoom)]["enemies"][i]["x"] += 2}
        if (playerX < rooms[String(currentRoom)]["enemies"][i]["x"]) {rooms[String(currentRoom)]["enemies"][i]["x"] -= 2}
        if (playerY > rooms[String(currentRoom)]["enemies"][i]["y"]) {rooms[String(currentRoom)]["enemies"][i]["firingDirection"] = "down"}
        if (playerY < rooms[String(currentRoom)]["enemies"][i]["y"]) {rooms[String(currentRoom)]["enemies"][i]["firingDirection"] = "up"}
      }

    }
    if (playerX + 20 > rooms[String(currentRoom)]["enemies"][i]["x"] - 20 && playerX - 20 < rooms[String(currentRoom)]["enemies"][i]["x"] + 20 && playerY + 20 > rooms[String(currentRoom)]["enemies"][i]["y"] - 20 && playerY - 20 < rooms[String(currentRoom)]["enemies"][i]["y"] + 20) {
      delete rooms[String(currentRoom)]["enemies"][i];
      playerHp -= 1;
    }
  }

  //items
  for (i in rooms[String(currentRoom)]["items"]) {
    if (playerX + 20 > rooms[String(currentRoom)]["items"][i]["x"] && playerX - 20 < rooms[String(currentRoom)]["items"][i]["x"] + 8 && playerY + 20 > rooms[String(currentRoom)]["items"][i]["y"] && playerY - 20 < rooms[String(currentRoom)]["items"][i]["y"] + 8) {
      if (rooms[String(currentRoom)]["items"][i]["type"] == "coin") {delete rooms[String(currentRoom)]["items"][i];coins += 1}
      if (rooms[String(currentRoom)]["items"][i]["type"] == "heart") {delete rooms[String(currentRoom)]["items"][i];playerHp += 1}
      if (coins >= 5) {
        if (rooms[String(currentRoom)]["items"][i]["type"] == "attackSpeedUp") {delete rooms[String(currentRoom)]["items"][i];attackSpeed /= 1.5;coins -= 5}
        if (rooms[String(currentRoom)]["items"][i]["type"] == "attackDamageUp") {delete rooms[String(currentRoom)]["items"][i];bulletDamage += 1;coins -= 5}

      }
    }
  }
}

//controls
setInterval(onNewFrame, 1000 / 50)
setInterval(enemiesAttack, 2000)
document.addEventListener('keydown', function(event) {
    if (event.key == 'w') {wPressed = true}
    if (event.key == 'a') {aPressed = true}
    if (event.key == 's') {sPressed = true}
    if (event.key == 'd') {dPressed = true}
    if (event.key == 'i') {iPressed = true}
    if (event.key == 'j') {jPressed = true}
    if (event.key == 'k') {kPressed = true}
    if (event.key == 'l') {lPressed = true}
  });

document.addEventListener('keyup', function(event) {
    if (event.key == 'w') {wPressed = false}
    if (event.key == 'a') {aPressed = false}
    if (event.key == 's') {sPressed = false}
    if (event.key == 'd') {dPressed = false}
    if (event.key == 'i') {iPressed = false}
    if (event.key == 'j') {jPressed = false}
    if (event.key == 'k') {kPressed = false}
    if (event.key == 'l') {lPressed = false}
  });
