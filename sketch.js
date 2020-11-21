var gameState = "play";

var tower, towerImage;
var door, doorImage, doorGroup;

var climber, climberImage, climberGroup;

var ghost, ghostImage;

var block, blockGroup;

function preload() 
{
  towerImage = loadImage("tower.png");
  
  doorImage = loadImage("door.png");
  
  climberImage = loadImage("climber.png");

  ghostImage = loadImage("ghost-standing.png");
  
}

function setup() 
{
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImage);
  
  tower.velocityY = 5;
  
  doorGroup = new Group();
  climberGroup = new Group();
  blockGroup = new Group();
  
  ghost = createSprite(200, 500);
  ghost.addImage("ghost_running", ghostImage);
  ghost.scale = 0.4;
}

function draw()
{
  background("black");
  
if (gameState === "play"){
  
  if (climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if (keyDown("space")){
    ghost.velocityY = -10;
  }
  ghost.velocityY = ghost.velocityY + 0.5;
  
  if (keyDown("left_arrow")){
    ghost.x = ghost.x - 5;
  }
  if (keyDown("right_arrow")){
    ghost.x = ghost.x + 5;
  }
  if (tower.y>400)
    {
      tower.y = 200;
    }
  
  if (blockGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gameState = "end";

  }
  myDoors();
  
  drawSprites();
} 
if (gameState === "end"){
  fill("white");
  stroke("yellow");
  strokeWeight(2);
  textSize(30);
  text("Game Over!!", 220, 290);
}  
}

function myDoors()
{
  if (frameCount%100 === 0){
    
    door = createSprite(Math.round(random(100, 500)), -50);
    door.addImage("door", doorImage);
    door.velocityY = 5;
    door.lifetime = 130;
    doorGroup.add(door);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    
    climber = createSprite(door.x, 10);
    climber.addImage("climber", climberImage);
    climber.velocityY = 5;
    climber.lifetime = 118;
    climberGroup.add(climber);
    
    block = createSprite(200, 15, climber.width, 2);
    block.x = door.x;
    blockGroup.add(block);
    
  }
}