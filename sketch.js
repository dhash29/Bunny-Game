const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var bg_img;
var food;
var rabbit;
var rabbit_sprite;
var button;
var cryingAnim
var blinkingAnim
var eatingAnim

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  cryingAnim = loadAnimation('sad_1.png', 'sad_2.png', 'sad_3.png')
  blinkingAnim = loadAnimation('blink_1.png', 'blink_2.png', 'blink_3.png')
  eatingAnim = loadAnimation('eat_0.png', 'eat_1.png', 'eat_2.png', 'eat_3.png', 'eat_4.png')
  blinkingAnim.playing = true
  eatingAnim.playing = true
  cryingAnim.playing = true
  eatingAnim.looping = false
  cryingAnim.looping = false
}
function setup()
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  blinkingAnim.frameDelay = 20
  cryingAnim.frameDelay = 20
  eatingAnim.frameDelay = 20

  rabbit_sprite = createSprite(400, 630)
  rabbit_sprite.addImage(rabbit)
  rabbit_sprite.scale = 0.2

  rabbit_sprite.addAnimation('blinking', blinkingAnim)
  rabbit_sprite.addAnimation('crying', cryingAnim)
  rabbit_sprite.addAnimation('eating', eatingAnim)

  rabbit_sprite.changeAnimation('blinking')


  fruit_con = new Link(rope,fruit);



  button = createImg("cut_button.png")
  button.size(50,50)
  button.position(220, 10)
  button.mouseClicked(drop)


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  

}

function draw() 
{
  background(51);

  image(bg_img,width/2,height/2,490,690);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }


  if(collide(fruit, rabbit_sprite)== true){
    rabbit_sprite.changeAnimation('eating')
  }
  
  if(collide(fruit, ground.body)==true){
    rabbit_sprite.changeAnimation('crying')
  }



  rope.show();
  Engine.update(engine);
  ground.show();

 
   drawSprites()
}


function drop(){
  rope.break()
  fruit_con.detach()
  fruit_con = null
}


function collide(physicsbody,p5sprite){
  if(physicsbody!=null){
         


  var realDistance = dist(physicsbody.position.x, physicsbody.position.y, p5sprite.position.x, p5sprite.position.y)
  if(realDistance<70){
    World.remove(engine.world, fruit)
    fruit = null
    return true;
  }
  else{
    return false
  }
}
}