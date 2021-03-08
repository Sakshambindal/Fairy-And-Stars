var starImg, fairyImg, bgImg;
var fairy , fairyVoice, ff;
var star, starBody, starG;
var score=0;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	starImg = loadImage("images/star.png");
	fairyImg = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
	bgImg = loadImage("images/starNight.png");
	fairyVoice = loadSound("sound/JoyMusic.mp3");

}

function setup() {
	createCanvas(800, 750);

	// fairyVoice.play();

	fairy = createSprite(130, 520);
	fairy.addAnimation("fairyflying",fairyImg);  
	fairy.scale =0.25;
	
    ff = createSprite(255,510,25,25);
    ff.visible = false
	

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);
	
	Engine.run(engine);

	starG = new Group();
}


function draw() {
  background(bgImg);

  ff.depth = starG.depth+1;

  if(keyDown(LEFT_ARROW)){
	fairy.x = fairy.x - 5;
	ff.x = ff.x - 5
}
if(keyDown(RIGHT_ARROW)){
	fairy.x = fairy.x + 5;
    ff.x=ff.x+5;
}
if(frameCount % 80 === 0){
	starFalling();
}
if(ff.isTouching(starG)){
	starG.setVelocityYEach(0);
	score = score+1;
	starG.destroyEach();
}	

	fairyVoice.play(); 

  drawSprites();
  textSize(20);
  fill("white");
  text("Score: " + score,375,50);
}

function keyPressed() {
	//write code here
    
}

function starFalling() {
	star = createSprite(Math.round(random(20,650)),30);
	star.addImage(starImg);
	star.velocityY=2 + score/3;
	star.scale = random(0.1,0.25);
	starG.add(star);
}
