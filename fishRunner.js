var PLAY = 1;
var END = 0;
var fish, fishImg, pool;
var obstacle, collectable;
var obstaclesGroup, collectablesGroup;
var score, death, reward;
var gameState = PLAY;
var gameOver, restart, gameOverImg, restartImg;
var river;

var width, height;

function preload() {
  createRiver();
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
  fishImg = loadImage("fish.png");
}

function setup() {
  width = 400;
  height = 600;

  createCanvas(width, height);

  pool = createSprite(width / 2, height / 2);
  pool.addAnimation("river", river);
  pool.scale = 10;

  fish = createSprite(width / 2, height - 70, 40, 20);
  fish.addImage(fishImg);
  fish.rotation = -90;
  fish.scale = 0.15;
  fish.shapeColor = "orange";

  obstaclesGroup = new Group();
  collectablesGroup = new Group();

  score = 0;
  death = 0;
  reward = 0;

  gameOver = createSprite(width / 2, height / 2 - 50, 10, 10);
  gameOver.addImage("GameOver", gameOverImg);
  gameOver.scale = 0.3;

  restart = createSprite(width / 2, height / 2 + 40, 10, 10);
  restart.addImage("Restart", restartImg);
  restart.scale = 0.3;
}

function draw() {
  background(255);
  if (gameState === PLAY) {
    gameOver.visible = false;
    restart.visible = false;

    fishControl();
    spawnObstacles();
    spawnCollectables();

    score = score + 0.1;

    for (var i = 0; i < obstaclesGroup.length; i++) {
      if (fish.isTouching(obstaclesGroup[i])) {
        obstaclesGroup[i].destroy();
        death = death + 1;
      }
    }
    for (var i = 0; i < collectablesGroup.length; i++) {
      if (fish.isTouching(collectablesGroup[i])) {
        collectablesGroup[i].destroy();
        reward = reward + 1;
      }
    }

    if (death === 1) {
      gameState = END;
    }
  } else if (gameState === END) {
    pool.destroy();

    gameOver.visible = true;
    restart.visible = true;
    obstaclesGroup.setVelocityYEach(0);
    collectablesGroup.setVelocityYEach(0);
    //obstaclesGroup.destroyEach();
    //collectablesGroup.destroyEach();
    if (mousePressedOver(restart)) {
      reset();
    }
  }

  drawSprites();

  noStroke();
  rectMode(CENTER);
  fill(0, (alpha = 150));
  rect(width / 2, 45, 130, 70, 100);
  fill(255);
  textSize(18);
  textAlign(CENTER);
  text("Deaths: " + death, width / 2, 30);
  text("Rewards: " + reward, width / 2, 50);
  text("Survived: " + Math.round(score), width / 2, 70);
}

function fishControl() {
  if (keyWentDown("right")) {
    if (fish.x === width / 2) {
      fish.x = width - 100;
    } else if (fish.x === 100) {
      fish.x = width / 2;
    }
  }

  if (keyWentDown("left")) {
    if (fish.x === width / 2) {
      fish.x = 100;
    } else if (fish.x === width - 100) {
      fish.x = width / 2;
    }
  }
}

function spawnObstacles() {
  if (frameCount % 150 === 0) {
    var position = Math.round(random(1, 3));
    obstacle = createSprite(0, -10, 10, 10);
    obstacle.shapeColor = 0;
    switch (position) {
      case 1:
        obstacle.x = 100;
        break;
      case 2:
        obstacle.x = width / 2;
        break;
      case 3:
        obstacle.x = width - 100;
        break;
    }
    obstacle.velocityY = 2 + score / 100;
    obstacle.lifetime = height / obstacle.velocityY;

    obstacle.depth = fish.depth;
    fish.depth = fish.depth + 1;

    obstaclesGroup.add(obstacle);
  }
}

function spawnCollectables() {
  if (frameCount % 200 === 0) {
    var position = Math.round(random(1, 3));
    collectable = createSprite(0, -10, 10, 10);
    collectable.shapeColor = 255;
    switch (position) {
      case 1:
        collectable.x = 100;
        break;
      case 2:
        collectable.x = width / 2;
        break;
      case 3:
        collectable.x = width - 100;
        break;
    }
    collectable.velocityY = 2;
    collectable.lifetime = height / collectable.velocityY;

    collectable.depth = fish.depth;
    fish.depth = fish.depth + 1;

    collectablesGroup.add(collectable);
  }
}

function reset() {
  gameState = PLAY;
  pool = createSprite(width / 2, height / 2);
  pool.addAnimation("river", river);
  pool.scale = 10;
  pool.depth = 1;

  score = 0;
  death = 0;
  reward = 0;
  fish.x = width / 2;
  fish.y = height - 50;
}

function createRiver() {
  river = loadAnimation(
    "R/r0.png",
    "R/r1.png",
    "R/r2.png",
    "R/r3.png",
    "R/r4.png",
    "R/r5.png",
    "R/r6.png",
    "R/r7.png",
    "R/r8.png",
    "R/r9.png",
    "R/r10.png",
    "R/r11.png",
    "R/r12.png",
    "R/r13.png",
    "R/r14.png",
    "R/r15.png",
    "R/r16.png",
    "R/r17.png",
    "R/r18.png",
    "R/r19.png",
    "R/r20.png",
    "R/r21.png",
    "R/r22.png",
    "R/r23.png",
    "R/r24.png",
    "R/r25.png",
    "R/r26.png",
    "R/r27.png",
    "R/r28.png",
    "R/r29.png",
    "R/r30.png",
    "R/r31.png",
    "R/r32.png",
    "R/r33.png",
    "R/r34.png",
    "R/r35.png",
    "R/r36.png",
    "R/r37.png",
    "R/r38.png",
    "R/r39.png",
    "R/r40.png",
    "R/r41.png",
    "R/r42.png",
    "R/r43.png",
    "R/r44.png",
    "R/r45.png",
    "R/r46.png",
    "R/r47.png",
    "R/r48.png",
    "R/r49.png",
    "R/r50.png",
    "R/r51.png",
    "R/r52.png",
    "R/r53.png",
    "R/r54.png",
    "R/r55.png",
    "R/r56.png",
    "R/r57.png",
    "R/r58.png",
    "R/r59.png",
    "R/r60.png",
    "R/r61.png",
    "R/r62.png",
    "R/r63.png",
    "R/r64.png",
    "R/r65.png",
    "R/r66.png",
    "R/r67.png",
    "R/r68.png",
    "R/r69.png",
    "R/r70.png",
    "R/r71.png",
    "R/r72.png",
    "R/r73.png",
    "R/r74.png",
    "R/r75.png",
    "R/r76.png",
    "R/r77.png",
    "R/r78.png",
    "R/r79.png"
  );
}
