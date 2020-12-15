var INTRO = -1;
var PLAY = 1;
var END = 0;
var fish, fishAnim, pool;
var obstacle, collectable;
var obstaclesGroup, collectablesGroup;
var score, hit, reward;
var gameState = INTRO;
var gameOver, restart, gameOverImg, restartImg;
var river;
var worm, hook, food, poison;

var width, height;

function preload() {
  river = loadImage("double.png");
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
  worm = loadImage("worm.png");
  hook = loadImage("hook.png");
  food = loadImage("food.png");
  poison = loadImage("poison.png");

  fishAnim = loadAnimation("fish1.png", "fish2.png");

  loop = loadSound("techno.mp3");
  pain = loadSound("pain.mp3");
  collect = loadSound("collect.mp3");
}

function setup() {
  loop.play();

  width = 400;
  height = 600;

  createCanvas(width, height);

  pool = createSprite(width / 2, 400);
  pool.addAnimation("river", river);
  pool.scale = 1;

  fish = createSprite(width / 2, height - 70, 40, 20);
  fish.addAnimation("swimming", fishAnim);
  fish.scale = 0.12;
  fish.shapeColor = "orange";

  obstaclesGroup = new Group();
  collectablesGroup = new Group();

  score = 0;
  hit = 0;
  reward = 0;

  gameOver = createSprite(width / 2, height / 2 - 50, 10, 10);
  gameOver.addImage("GameOver", gameOverImg);
  gameOver.scale = 0.3;

  restart = createSprite(width / 2, height / 2 + 40, 10, 10);
  restart.addImage("Restart", restartImg);
  restart.scale = 0.3;
}

function draw() {
  background(0);

  if (gameState === INTRO) {
    introState();
  } else if (gameState === PLAY) {
    playState();
  } else if (gameState === END) {
    endState();
  }

  drawSprites();

  noStroke();
  rectMode(CENTER);
  fill(0, (alpha = 150));
  rect(width / 2, 40, 130, 70, 100);
  fill(255);
  textSize(16);
  textAlign(CENTER);
  textStyle(ITALIC);
  text("Hits: " + hit, width / 2, 25);
  text("Rewards: " + reward, width / 2, 45);
  text("Survived: " + Math.round(score), width / 2, 65);
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
  if (frameCount % 137 === 0) {
    var position = Math.round(random(1, 3));
    obstacle = createSprite(0, -10, 10, 10);

    if (Math.round(random(0, 1))) {
      obstacle.addImage(hook);
    } else {
      obstacle.addImage(poison);
    }

    obstacle.scale = 0.05;
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
    obstacle.velocityY = 2 + (3 * score) / 100;
    obstacle.lifetime = height / obstacle.velocityY;

    obstacle.depth = fish.depth;
    fish.depth = fish.depth + 1;

    obstaclesGroup.add(obstacle);
  }
}

function spawnCollectables() {
  if (frameCount % 199 === 0) {
    var position = Math.round(random(1, 3));
    collectable = createSprite(0, -10, 10, 10);

    if (Math.round(random(0, 1))) {
      collectable.addImage(worm);
    } else {
      collectable.addImage(food);
    }

    collectable.scale = 0.1;
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
    collectable.velocityY = 2 + (3 * score) / 100;
    collectable.lifetime = height / collectable.velocityY;

    collectable.depth = fish.depth;
    fish.depth = fish.depth + 1;

    collectablesGroup.add(collectable);
  }
}

function reset() {
  gameState = PLAY;
  loop.play();
  pool = createSprite(width / 2, height / 2);
  pool.addAnimation("river", river);
  obstaclesGroup.destroyEach();
  collectablesGroup.destroyEach();
  pool.depth = 1;

  score = 0;
  hit = 0;
  reward = 0;
  fish.x = width / 2;
  fish.y = height - 50;
}

function introState() {
  gameOver.visible = false;
  restart.visible = false;
  pool.visible = false;
  textSize(24);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textFont("Helvetica");
  textStyle(BOLDITALIC);
  text("Welcome to Fish Runner!", 200, 150);
  textSize(20);
  textStyle(BOLD);
  text("\nKeep swimming as you collect\nFish Food and Worms :D", 200, 200);
  text(
    "\nBut be careful and avoid the\nPoison Bottles and Fish Hooks!",
    200,
    270
  );
  textStyle(ITALIC);
  text("\n\nPress Space to Start!", 200, 350);

  if (keyDown("space")) {
    gameState = PLAY;
  }
}

function playState() {
  gameOver.visible = false;
  restart.visible = false;
  pool.visible = true;
  pool.velocityY = 2 + (3 * score) / 100;

  if (pool.y > 800) {
    pool.y = 0;
  }

  fishControl();
  spawnObstacles();
  spawnCollectables();

  score = score + 0.1;

  for (var i = 0; i < obstaclesGroup.length; i++) {
    if (fish.isTouching(obstaclesGroup[i])) {
      obstaclesGroup[i].destroy();
      pain.play();
      hit = hit + 1;
    }
  }
  for (var i = 0; i < collectablesGroup.length; i++) {
    if (fish.isTouching(collectablesGroup[i])) {
      collectablesGroup[i].destroy();
      collect.play();
      reward = reward + 1;
    }
  }

  if (hit === 10) {
    gameState = END;
  }
}

function endState() {
  background(255);
  loop.stop();
  pool.destroy();
  gameOver.visible = true;
  restart.visible = true;
  obstaclesGroup.setVelocityYEach(0);
  collectablesGroup.setVelocityYEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  collectablesGroup.setLifetimeEach(-1);
  if (mousePressedOver(restart)) {
    reset();
  }
}
