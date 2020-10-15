var tower,towerI
var door,doorI,doorGroup
var climber,climberI,climberGroup
var ghost,ghostI
var inclimber,inclimberGroup
var gameState="play"
var sound

function preload(){
  towerI=loadImage("tower.png");
  
  doorI=loadImage("door.png");
  doorGroup=new Group();
  
  climberI=loadImage("climber.png");
  climberGroup=new Group();
  
  ghostI=loadImage("ghost-standing.png");
  
  sound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600)
  tower=createSprite(300,300);
  tower.addImage("tower",towerI);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostI);
  ghost.scale=0.4;
  
  inclimberGroup=new Group();
  sound.loop();
}

function draw(){
  background(0);
  if(gameState==="play"){
  if(tower.y>400){
    tower.y=200;
  }
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.5;
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(inclimberGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  spawnDoor();
  drawSprites();
  }
  if(gameState==="end"){
    fill("yellow");
    textSize(30);
    text("Game Over",300,300);
  }
}
function spawnDoor(){
  if(frameCount%250===0){
  door=createSprite(200,-50);
  door.addImage(doorI);
  door.velocityY=1;
  door.x=Math.round(random(120,400));
  door.lifetime=650;
  doorGroup.add(door);
    ghost.depth=door.depth;
    ghost.depth+=1;
    climber=createSprite(200,10);
    climber.addImage(climberI);
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=600;
    climberGroup.add(climber);
    inclimber=createSprite(200,15);
    inclimber.width=climber.width;
    inclimber.height=2;
    inclimber.x=door.x;
    inclimber.velocityY=1;
    inclimber.visible=false;
    inclimberGroup.add(inclimber);
  }
}
