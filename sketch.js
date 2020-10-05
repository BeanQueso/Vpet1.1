

 var fedTime,feed, addFood,dog,dogImg, happyDog, database, foodS, foodStock, food;

function preload()
{
  dogImg = loadImage("images/Dog.png");
  happyDog = loadImage(" images/happydog.png");
}

function setup() {
  createCanvas(500, 500); 
  database = firebase.database(); 
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.5;
  food = new Food();
  food.getFoodStock();

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  
  addFood=createButton("Add Food");
  addFood.position(800,95);
 

}




function draw() {  

  background(46,139,87);
  /*if(keyWentDown(UP_ARROW)){
    if(food.foodStock<=0){
      food.foodStock = 0;
    }else{
      food.foodStock = food.foodStock-1;
    }
   
    food.updateStock(food.foodStock);
    dog.addImage(happyDog);
    
    

  }*/
  var fedTime=database.ref('Feedtime');
  fedTime.on("value", function(data){
    food.lastFed=data.val();
  });
  fill("blue")
  if(food.lastFed>=12){
    text("Last Feed : "+food.lastFed%12+"PM", 350, 30);
  }else if(food.lastfed===0){
    text("Last Feed : 12AM", 350, 30);
  }else{
    text("Last Feed : "+food.lastFed+" AM", 350, 30);
  }

  food.display();
  feed.mousePressed(feedDog);  
  addFood.mousePressed(addFoods);



 

  drawSprites();
  fill(0,0,255);
  textSize(15);
  //text("Note: Press UP_ARROW Key to fead The dog Milk ", 20, 30);
  text("FoodStock: "+food.foodStock, 20,70 );
  
}
function feedDog(){
  if(food.foodStock<=0){
    food.foodStock = 0;
  }else{
    food.foodStock = food.foodStock-1;
  }

 
 
  food.updateStock(food.foodStock);
  dog.addImage(happyDog);
 
  
  
}
function addFoods(){
  food.foodStock++;

}


