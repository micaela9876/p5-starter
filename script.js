//preview: python -m http.server

let allBalls = [];

function setup() {
  createCanvas(windowWidth-100, windowHeight-100);
  background(30);
  for(let i  = 0; i < 50; i++){
   allBalls.push(new Ball(random(width),random(height),random(50)));
  }
}

function draw() {
  background(30);
  for(let ball of allBalls){
  ball.update(); 
  // Calculate physics
  ball.checkKeys(); // Check for keyboard input
  ball.checkEdges();
  ball.display();
  }
}

class Ball {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(10),random (10));
    this.acc = createVector(random(10),random (10));
    this.r = r;
    this.topSpeed = 60;
    this.friction = 0.99; 
    this.yellow= (random(255),random(255),random(255));
    this.red= (random(255),random(255),random(255));
    this.green= (random(255),random(255),random(255));

  }

  // Method to check keyboard input and apply forces
  checkKeys() {
    let forceMagnitude = 12;
    
    if (keyIsDown(LEFT_ARROW))  this.applyForce(createVector(-forceMagnitude, 0));
    if (keyIsDown(RIGHT_ARROW)) this.applyForce(createVector(forceMagnitude, 0));
    if (keyIsDown(UP_ARROW))    this.applyForce(createVector(0, -forceMagnitude));
    if (keyIsDown(DOWN_ARROW))  this.applyForce(createVector(0, forceMagnitude));
  }

  // The "Force" pattern: Force adds to Acceleration
  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    // 1. Acceleration changes Velocity
    this.vel.add(this.acc);
    
    // 2. Limit the speed so it doesn't go infinite
    this.vel.limit(this.topSpeed);
    
    // 3. Velocity changes Position
    this.pos.add(this.vel);
    
    // 4. Apply friction (velocity decay)
    this.vel.mult(this.friction);
    
    // 5. Reset acceleration for the next frame
    this.acc.mult(0);
  }

  display() {
    fill(this.red,this.yellow,this.green);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);
  }
  checkEdges() {
    if(this.pos.x < 0){
     
      this.vel.x *= -1;
    }
    if(this.pos.x > width){
      
      this.vel.x *= -1;
    }
    if(this.pos.y < 0){
      
      this.vel.y *= -1;
    }
    if(this.pos.y > height){
      
      this.vel.y *= -1;
    }

  }
}

draw();