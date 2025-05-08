///<reference path="p5.global.d.ts" />

class Game {
    lives = 3;
    score = 0;
    targetRows = 10;
    targetCols = 4;

    drawUI(){
        fill("black");
        textSize(25);
        textAlign("left");
        text(`Score: ${this.score}`, 20, 30);
        textAlign("right");
        text(`${this.lives}:Lives`, width - 20, height - 15);
    }

    checkGameState() {
        if (targets.length === 0) {
            background("teal");
            textSize(150);
            textAlign(CENTER, CENTER);
            fill("white");
            text("Congrats!! You won!", width / 2, height / 2);
            noLoop();
        } else if (this.lives <= 0) {
            background("red");
            textSize(120);
            textAlign(CENTER, CENTER);
            fill("white");
            text("HAHAHAHAHA YOu Lost", width / 2, height / 2);
            noLoop();
        }
    }

}
  
  class Paddle {
    constructor() {
      this.x = 0;
      this.y = height - 100;
      this.width = 160;
      this.height = 20;
    }
    setup() {
        this.y = height - 100;
    }
    draw() {
      this.x = mouseX - this.width / 2;
      fill("teal");
      rect(this.x, this.y, this.width, 20);
    }
  }
  class Ball {
    constructor() {
      this.x = random(0, width);
      this.y = height - 100;
      this.vx = 5;
      this.vy = -5;
      this.size = 20;
    }
    draw() {
      fill("white");
      this.x += this.vx;
      this.y += this.vy;
      ellipse(this.x, this.y, this.size);
      this.bounceOffWalls();
      this.bounceOffPaddle();
      this.bounceOffTargets();
      this.checkOutOfBounds();
    }
  
    bounceOffWalls() {
      if (this.x - this.size / 2 <= 0 || this.x + this.size / 2 >= width) {
        this.vx = -this.vx;
      }
      if (this.y - this.size / 2 <= 0) {
        this.vy = Math.abs(this.vy);
      }
    }
    checkOutOfBounds() {
        if (this.y - this.size / 2 > height) {
          game.lives--;
          noLoop(); // pause the game
          setTimeout(() => {
            this.reset();
            loop(); // resume the game
          }, 1000); // 1 second pause
        }
      }
      reset() {
        this.x = width / 2;
        this.y = height - 120;
        this.vx = 5;
        this.vy = -5;
      }
  
    bounceOffTargets() {
      for (let i in targets) {
        let target = targets[i];
        if (
          this.x < target.x + target.width &&
          this.x + this.size > target.x &&
          this.y < target.y + target.height &&
          this.y + this.size > target.y
        ) {
          this.vy *= -1;
          targets.splice(i, 1);
          game.score += 15;
          //sped
          this.vx = min(this.vx * 1.25, 10);
          this.vy = min(this.vy * 1.25, 10);
          //change size
          paddle.width = min(max(paddle.width * random(0.85, 1.15), 40), 250);
        }
      }
    }
  
    bounceOffPaddle() {
      const halfSize = this.size / 2;
      if (
        this.x + halfSize > paddle.x &&
        this.x - halfSize < paddle.x + paddle.width &&
        this.y + halfSize > paddle.y &&
        this.y - halfSize < paddle.y + paddle.height
      ) {
        this.vy = -Math.abs(this.vy);
        this.vx *= random(0.85, 1.15);
        this.y = paddle.y - halfSize;
        paddle.width = random(50, 150);
      }
    }
}
  

    
  class Target {
    constructor(xIndex, yIndex) {
        this. width = width / 8;
        this.height = 30;
        this.x = xIndex * this.width;
        this.y = yIndex * (this.height + 5);
        this.visible = true;
    }
    draw() {
      fill(random(144, 224, 239),random(255, 255, 245),random(40),random(180));
      rect(this.x, this.y, this.width, this.height);
    }
  }
  
  let game;
  let paddle;
  let ball;
  let targets = [];
  
  var setup = function () {
    createCanvas(windowWidth, windowHeight);
  
    game = new Game();
    paddle = new Paddle();
    paddle.setup();
    ball = new Ball();
  
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y <= 5; y++) {
        targets.push(new Target(x, y));
      }
    }
  };
  
  var draw = function () {
    background(66);
    // draw game
    game.checkGameState();
    game.drawUI();
    // draw ball
    ball.draw();
    // draw targets
    for (let target of targets) {
      if(target.visible)target.draw();
    }
    // draw paddle
    paddle.draw();

     if(game.live<= 0) {
            noLoop();
            textSize(40);
            fill("white");
            textAlign(CENTER);
            text("You Lost HAHAHAH", width/2, height / 2);
          }
    };

  