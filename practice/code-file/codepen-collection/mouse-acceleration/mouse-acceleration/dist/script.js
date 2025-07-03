const movers = new Array(10)

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  smooth()
  background(255)
  
  for(let i = 0; i < movers.length; i++) {
    movers[i] = new Mover()
  }
}

function draw() {
  background(255)
  
  for(let m of movers) {
    m.update()
    m.checkEdges()
    m.display()
  }
}

class Mover {
  
  constructor() {
    this.location = createVector(random(width), random(height))
    this.velocity = createVector(0, 0)
    this.acceleration = createVector(0, 0)
    this.topspeed = 4
    
    this.color = color(random(255), random(255), random(255))
  }
  
  // 가속도와 관련된 코드가 들어있는 함수
  update() {
    
    // 마우스를 향하는 벡터를 생성합니다.
    let mouse = createVector(mouseX, mouseY)
    let dir = p5.Vector.sub(mouse, this.location)
    
    // 벡터를 정규화합니다.
    dir.normalize()
    
    // 크기를 변경합니다.
    dir.mult(0.5)
    
    // 만들어진 벡터를 가속도로 설정합니다.
    this.acceleration = dir
    
    // 실제로 물체를 움직이는 코드입니다.
    // 가속도로 속도를 변경하고, 속도로 위치를 변경합니다.
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.topspeed)
    this.location.add(this.velocity)
  }
  
  display() {
    
    let angle = this.velocity.heading()
    
    stroke(0)
    fill(this.color)
    
    push()
    
    translate(this.location.x, this.location.y)
    rotate(angle)
    
    triangle(-25, -10, 0, 0, -25, 10)
    
    pop()
  }
  
  checkEdges() {
    if(this.location.x > width) {
      this.location.x = 0
    }
    else if(this.location.x < 0) {
      this.location.x = width
    }
    
    if(this.location.y > height) {
      this.location.y = 0
    }
    else if(this.location.y < 0) {
      this.location.y = height
    }
  }
  
}