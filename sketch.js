var PLAY = 1;
var END = 0;
var gameState=1;

var sword,fruit,monster,score,r,randomFruit,fruitGroup,enemyGroup;
var swordImage,monsterImage,gameOverImage,fruit1,fruit2,fruit3,
fruit4;

function preload(){
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");

}

function setup()  {
  createCanvas(displayWidth-10,displayHeight-10);
  
 sword = createSprite(40,200,20,20); 
 sword.addImage(swordImage);
 sword. scale = 1.3
       
  sword.setCollider("rectangle",0,0,100,90);
  
    fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  score = 0;
  
  gameover=createSprite(300,100,20,100);
           gameover.addImage(gameOverImage);
          gameover.visible=true;
          gameover.scale=0.5;
 
  
  

}

function draw(){
  background("lightBlue");

  if (gameState === PLAY)  {
    gameover.visible = false;
    fruits();
    enemy();
      
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
    if(fruitGroup.isTouching(sword))  {
      fruitGroup.destroyEach();
      
      knifeSwooshSound.play();
      score = score+2;
      
    }
  
  else{
   if (enemyGroup.isTouching(sword)){
    gameOverSound.play();
    enemyGroup.destroyEach();
          fruitGroup.destroyEach();
    
          fruitGroup.velocityX=0;
          enemyGroup.velocityX=0;
         
         sword.addImage(gameOverImage);
          sword.scale=1;
          sword.x=300;
          sword.y=300; 
     gameState = END
     
    
  }
  
  }
  drawSprites();
  text("score: "+ score,200,90);
}
}
function fruits(){
          if(World.frameCount%80===0){
            fruit=createSprite(400,200,20,20);
            fruit.scale=0.5;
            r=Math.round(random(1,4));
            if(r==1){
              fruit.addImage(fruit1);
            } else if(r==2){
              fruit.addImage(fruit2);
            } else if(r==3){
              fruit.addImage(fruit3);
            }else{
              fruit.addImage(fruit4);
            }
            fruit.y=Math.round(random(750,50));

            
            fruit.setLifetime=100;

            position=Math.round(random(1,2));
            if(position==1){
              fruit.x=1300;
              fruit.velocityX=-(7+(score/4));
            }
            else
              {
                if(position==2){
                  fruit.x=0;
                  fruit.velocityX=(7+(score/4));
                }
              }
            fruitGroup.add(fruit);

          }
}

function enemy()  {
  if(World.frameCount%200===0) {
    monster = createSprite(800,800,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(10,850));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    monster.scale = 2
    enemyGroup.add(monster);
  }
}
