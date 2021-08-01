var nezuko, nezukoImg;
var star,starImg, starsGroup;
var asteroid, asteroidImg, asteroidsGroup;
var invisibleBorder_1, invisibleBorder_2;
var gameover_sound;
var twinkle_sound;
var score = 0;
var START = 2;
var PLAY = 1;
var END = 0;
var gameState = START;

function preload()
{
  nezukoImg = loadImage("nezuko-chan.png");
  starImg = loadImage("star.png");
  asteroidImg = loadImage("asteroid.png");
  gameover_sound = loadSound("gameover.wav");
  twinkle_sound = loadSound("twinkle.mp3");
}


function setup() 
{
  createCanvas(600,200);

  nezuko = createSprite(100,200);
  nezuko.addImage(nezukoImg);
  nezuko.scale = 0.1;

  invisibleBorder_1 = createSprite(1,1,400,10);
  invisibleBorder_1.visible = false;
  invisibleBorder_2 = createSprite(200,200,400,10);
  invisibleBorder_2.visible = false;

  starsGroup = new Group();
  asteroidsGroup = new Group();
}

function draw()
{
  background("lightblue");

  if(gameState === START)
  {
    fill("purple");
    textSize(15);
    text("Press space to Start", 240,140);

    fill("purple");
    textSize(20);
    text("Collect Stars and Avoid Asteroids", 170,100);
    
    if(keyDown("space"))
    {
      gameState = PLAY;
    }
  }
  if(gameState === PLAY)
  {
    nezuko.y = World.mouseY;

    if (starsGroup.isTouching(nezuko)) 
    {
      starsGroup.destroyEach();
      score += 2;
      twinkle_sound.play();
    }
    else if (asteroidsGroup.isTouching(nezuko)) 
    {
      asteroidsGroup.destroyEach();
      nezuko.destroy();
      gameover_sound.play();
      gameState = END;
    }

    if(mouseY < 10)
    {
      nezuko.y = 10;
    }

    nezuko.collide(invisibleBorder_1);
    nezuko.collide(invisibleBorder_2);

    spawnStars();
    spawnAsteroids();

    drawSprites();

    fill("black")
    textSize(15);
    text("Score: " + score, 520,20);

  }

  if(gameState === END)
  {
    fill("blue");
    textSize(45);
    text("Game Over", 210,100);

    fill("purple");
    textSize(15);
    text("Press space to Restart", 240,140);
    
    if(keyDown("space"))
    {
      gameState = PLAY;
      score = 0;

      nezuko = createSprite(100,200);
      nezuko.addImage(nezukoImg);
      nezuko.scale = 0.1;
    }
  }
}

function spawnStars()
{
  if(frameCount % 120 === 0)
  {
    star = createSprite(550,Math.round(random(20,180)));
    star.addImage(starImg);
    star.scale = 0.02;
    star.velocityX = -5;
    star.lifetime = 700;
    starsGroup.add(star);
  }
}

function spawnAsteroids()
{
  if(frameCount % 200 === 0)
  {
    asteroid = createSprite(550,Math.round(random(20,180)));
    asteroid.addImage(asteroidImg);
    asteroid.scale = 0.07;
    asteroid.velocityX = -5;
    asteroid.lifetime = 700;
    asteroidsGroup.add(asteroid);
  }
}