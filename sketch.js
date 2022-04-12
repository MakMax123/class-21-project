var jokerRunning, joker;
var BatmanRunning, Batman,BatmanDead;
var GothamImg, Gotham;
var obstacleGroup, Obstacle1 , Obstacle2, Obstacle3;
var gameState = play;
var play = 1;
var END = 0;
var invisibleGround;

function preload()
{
GothamImg = loadImage("Gotham.webp");


batmanSound = loadSound("batmanSound.mp3");
batmanSound.loop();

BatmanRunning = loadAnimation("batman running.png","batman running 2.jpg");
BatmanDead = loadAnimation("batman dead.png");

jokerRunning = loadAnimation("joker running.jpg");
joker = loadAnimation("cartoon Joker.png");


Obstacle1 = loadImage("Obstacle1.png");
Obstacle2 = loadImage("Obstacle2.png");
Obstacle3 = loadImage("Obstacle3.png");

}

function setup()
 {
  createCanvas(600,600);

  Gotham = createSprite(300,400);
  Gotham.addImage("Gotham",GothamImg);
  Gotham.x = Gotham.length/2;

  obstacleGroup = createGroup()

  Batman = createSprite(200,200,50,50);
  Batman.scale = 0.3;
  Batman.addAnimation("ALive",BatmanRunning);
  Batman.addAnimation("Dead",BatmanDead);

  joker = createSprite(100,200,50,50);
  joker.scale = 0.3;
  joker.addAnimation("running",jokerRunning);
  joker.addAnimation("joker",joker);
 
  invisibleGround = createSprite(150,175,300,20);
  invisibleGround.visible = false;
 }

function draw()
 {
   background(255);

   if(gameState === play)
   {
       if(keyDown("space"))
       {
           Batman.velocityX=-5;
       }

       Batman.velocityX= Batman.velocityX +1;
       joker.y= Batman.y+10;
       Gotham.velocityX = -3;

       if(Gotham.x>width)
       {
          Gotham.x = Gotham.width/2
       }

       spawnObstacles();

       if(obstacleGroup.isTouching(Batman))
       {
           gameState = END;
       }
    }
    else if(gameState === END)
    {
        Gotham.velocityX= 0;
        Batman.velocityX=0;
        joker.velocityX=0;

        joker.changeAnimation("joker",joker);
        Batman.changeAnimation("Dead",BatmanDead);

        obstacleGroup.destroyEach();
    }
   Batman.collide(invisibleGround);
   joker.collide(invisibleGround);

   
   drawSprites();
 }

 function spawnObstacles()
 {
if(frameCount % 60 === 0)
{
  var obstacle = createSprite(200,400,10,40);
  obstacle.velocityX = -4;
  
  var rand = Math.round(random(1,3));
  switch(rand)
  {
      case 1: obstacle.addImage(Obstacle1);
      break;
      case 2: obstacle.addImage(Obstacle2);
      break;
      case 3: obstacle.addImage(Obstacle3);
      break;
      default: break;
  }

  obstacle.sclae = 0.5;
  obstacle.lifetime =300;

  obstacleGroup.add(obstacle);

   Batman.depth = Gotham.depth;
   Batman.depth = Batman.depth+1;

   joker.depth = Batman.depth;
}
 }