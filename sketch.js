var backImage,backgr;
var player, player_running;
var ground,ground_img;
var foodGrp,banana,bananaImg;
var obstacleGroup,obstacle,obstaceImage;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score;

var gameOver,gameOverImg;

function preload(){
  backImage=loadImage("jungle.jpg");
  bananaImg=loadImage("banana.png");
  obstaceImage=loadImage("stone.png");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  gameOverImg=loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,200,20,20);
  gameOver.addImage(gameOverImg);
  
  foodGrp=new Group();
  obstacleGroup=new Group();

  score = 0;
}

function draw() { 
  //player.debug = true;
  background(0);
  console.log("playerScale: "+player.scale);

  if(gameState===PLAY){

    gameOver.visible=false;
    
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    
    spawnFood();
    spawnObstacles();

    if(obstacleGroup.isTouching(player)){
      gameState=END;
    }
  }

  if(foodGrp.isTouching(player)){
    foodGrp.destroyEach();
    score = score+2;
    player.scale+= + score/1000;
  }

  drawSprites();
  stroke("black");
  textSize(20);
  fill("black");
  text("SCORE: "+score,100,30);

  if(gameState===END){
    backgr.velocityX = 0;
    player.velocityY = 0;
    player.visible=false;
    obstacleGroup.setVelocityXEach(0);
    foodGrp.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(0);
    foodGrp.setLifetimeEach(0);
    gameOver.visible=true;
  }
}

function spawnFood(){
  if(frameCount%300===0){
    banana = createSprite(900,200,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImg);
    banana.scale=0.05;
    banana.velocityX=-4;
    banana.lifetime=300;
    player.depth=banana.depth+1;
    foodGrp.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount%100===0){
    obstacle = createSprite(800,320,10,40);
    obstacle.x = random(800,900);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}