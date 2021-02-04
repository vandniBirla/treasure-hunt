var gameOver, gameOverImg;
var gameState = 1;
var PLAY = 1;
var END = 0;
var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;

function preload() {
  gameOverImg = loadImage("gameOver.png")
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
}

function setup() {

  createCanvas(500, 500);

  // Moving background
  path = createSprite(250, 250);
  path.addImage(pathImg);
  path.velocityY = 4;

  //create the game over sprite
  gameOver = createSprite(250, 250);
  gameOver.addImage(gameOverImg);

  //creating boy running
  boy = createSprite(70, 400, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;

  //create the required groups
  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();

}

function draw() {

  //clear the screen
  background(0);
  //create the edges and make the boy collide with the edges
  edges = createEdgeSprites();
  boy.collide(edges);

  //make the game over sprite dissapear
  gameOver.visible = false;

  if (gameState === PLAY) {

    //make the boy move with the mouse
    boy.x = World.mouseX;

    //code to reset the background
    if (path.y > 600) {
      path.y = height / 2;
    }

    //call the functions
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    //make the scoring system function and destroy the  sprites whenever the boy touches them
    if (cashG.isTouching(boy)) {
      treasureCollection = treasureCollection + 50;
      cashG.destroyEach();
    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 150;

    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 100;

    } else if (swordGroup.isTouching(boy)) {
      swordGroup.destroyEach();
      gameState = END;
    }
  } else if (gameState === END) {
    //make the game over sprite visible
    gameOver.visible = true;
    //destroy all the other sprites
    boy.destroy();
    swordGroup.destroyEach();
    jwelleryG.destroyEach();
    diamondsG.destroyEach();
    cashG.destroyEach();
    //make the path stop moving
    path.velocityY = 0;
  }

  //draw the sprites
  drawSprites();
  //make the scores appear
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, 200, 30);


}
//create the cash sprite
function createCash() {
  if (World.frameCount % 50 == 0) {
    var cash = createSprite(Math.round(random(50, 500), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashG.add(cash);
  }
}
//create the diamond sprite
function createDiamonds() {
  if (World.frameCount % 80 == 0) {
    var diamonds = createSprite(Math.round(random(50, 500), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
}

//create the jewellery sprite
function createJwellery() {
  if (World.frameCount % 80 == 0) {
    var jwellery = createSprite(Math.round(random(50, 500), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
  }
}

//create the sword sprite
function createSword() {
  if (World.frameCount % 150 == 0) {
    var sword = createSprite(Math.round(random(50, 500), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 150;
    swordGroup.add(sword);
  }
}