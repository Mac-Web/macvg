const oneP = document.getElementById("onep");
const twoPWork = document.getElementById("twopwork");
const btns = document.getElementById("btns");
const cards = document.getElementById("cards");
const classic = document.getElementById("classic");
const timed = document.getElementById("timed");
const countdown = document.getElementById("time");
const cover = document.getElementById("cover");
const scoreElement = document.getElementById("score");
const appleElement = document.getElementById("apple");
const munch = new Audio("munch.mp3");
munch.volume = 0.3;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let blockSize = 20;
let widthInBlocks = width / blockSize;
let heightInBlocks = height / blockSize;
let score = 0;
let speed = 100;
let circle = function (x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};
let Block = function (col, row) {
  this.col = col;
  this.row = row;
};
Block.prototype.drawSquare = function (color) {
  let x = this.col * blockSize;
  let y = this.row * blockSize;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, blockSize, blockSize, [10]);
};
Block.prototype.drawCircle = function (color) {
  let centerX = this.col * blockSize + blockSize / 2;
  let centerY = this.row * blockSize + blockSize / 2;
  ctx.fillStyle = color;
  circle(centerX, centerY, blockSize / 2, true);
};
Block.prototype.drawImage = function () {
  let x = this.col * blockSize;
  let y = this.row * blockSize;
  ctx.drawImage(appleElement, x, y, blockSize, blockSize);
};
Block.prototype.equal = function (otherBlock) {
  return this.col === otherBlock.col && this.row === otherBlock.row;
};
let Snake = function () {
  this.segments = [new Block(7, 5), new Block(6, 5), new Block(5, 5)];
  this.direction = "right";
  this.nextDirection = "right";
};
Snake.prototype.draw = function (color) {
  for (let i = 0; i < this.segments.length; i++) {
    this.segments[i].drawSquare(color);
  }
};

Snake.prototype.checkCollision = function (head) {
  let leftCollision = head.col === -1;
  let rightCollision = head.col === widthInBlocks;
  let topCollision = head.row === -1;
  let bottomCollision = head.row === heightInBlocks + 0.5;
  let wallCollision =
    leftCollision || topCollision || rightCollision || bottomCollision;
  let selfCollision = false;
  for (let i = 0; i < this.segments.length; i++) {
    if (head.equal(this.segments[i])) {
      selfCollision = true;
    }
  }
  return wallCollision || selfCollision;
};
Snake.prototype.setDirection = function (newDirection) {
  if (this.direction === "up" && newDirection === "down") {
    return;
  } else if (this.direction === "right" && newDirection === "left") {
    return;
  } else if (this.direction === "down" && newDirection === "up") {
    return;
  } else if (this.direction === "left" && newDirection === "right") {
    return;
  }
  this.nextDirection = newDirection;
};
let Apple = function () {
  let ran1 = Math.floor(Math.random() * widthInBlocks);
  let ran2 = Math.floor(Math.random() * heightInBlocks);
  this.position = new Block(ran1, ran2);
};
Apple.prototype.draw = function () {
  this.position.drawImage(appleElement, 10, 10);
};
Apple.prototype.move = function () {
  let randomCol = Math.floor(Math.random() * (widthInBlocks - 2) + 1);
  let randomRow = Math.floor(Math.random() * (heightInBlocks - 2) + 1);
  this.position = new Block(randomCol, randomRow);
};
scoreElement.classList.remove("red");
oneP.addEventListener("click", () => {
  btns.style.display = "none";
  cards.style.display = "flex";
});
twoPWork.addEventListener("click", () => {
  cover.style.display = "none";
  scoreElement.style.display = "block";
  let snake = new Snake();
  let snake2 = new Snake();
  let apple = new Apple();
  let apple2 = new Apple();
  let gameLoop = function () {
    let timeOut = setTimeout(gameLoop, speed);
    let gameOver = function () {
      clearTimeout(timeOut);
      scoreElement.textContent = "Game Over! Score: " + score;
      scoreElement.classList.add("red");
      scoreElement.setAttribute("style", "color: red; display: block;");
    };
    Snake.prototype.move = function () {
      let head = this.segments[0];
      let newHead;
      this.direction = this.nextDirection;
      if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row);
      } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
      } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
      } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
      }
      if (this.checkCollision(newHead)) {
        gameOver();
        return;
      }
      this.segments.unshift(newHead);
      if (newHead.equal(apple.position) || newHead.equal(apple2.position)) {
        munch.play();
        score++;
        scoreElement.innerHTML = "Score: " + score;
        scoreElement.style.color = "green";
        setTimeout(() => {
          scoreElement.style.color = "white";
        }, 250);
        if (newHead.equal(apple.position)) {
          apple.move();
        } else {
          apple2.move();
        }
        speed -= 3;
      } else {
        this.segments.pop();
      }
    };
    ctx.clearRect(0, 0, width, height);
    snake.move();
    snake.draw("blue");
    snake2.move();
    snake2.draw("red");
    apple.draw();
    apple2.draw();
  };
  gameLoop();
  let directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    87: "up",
    65: "left",
    83: "down",
    68: "right",
  };
  document.body.addEventListener("keydown", function (event) {
    let newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
      if (
        event.keyCode == 87 ||
        event.keyCode == 65 ||
        event.keyCode == 83 ||
        event.keyCode == 68
      ) {
        snake2.setDirection(newDirection);
      } else {
        snake.setDirection(newDirection);
      }
    }
  });
});

//---------GAME MODE CODES BELOW------------

classic.addEventListener("click", () => {
  cover.style.display = "none";
  scoreElement.style.display = "block";
  let snake = new Snake();
  let apple = new Apple();
  let gameLoop = function () {
    let timeOut = setTimeout(gameLoop, speed);
    let gameOver = function () {
      clearTimeout(timeOut);
      scoreElement.textContent = "Game Over! Score: " + score;
      scoreElement.classList.add("red");
      scoreElement.setAttribute("style", "color: red; display: block;");
    };
    Snake.prototype.move = function () {
      let head = this.segments[0];
      let newHead;
      this.direction = this.nextDirection;
      if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row);
      } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
      } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
      } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
      }
      if (this.checkCollision(newHead)) {
        gameOver();
        return;
      }
      this.segments.unshift(newHead);
      if (newHead.equal(apple.position)) {
        munch.play();
        score++;
        scoreElement.innerHTML = "Score: " + score;
        scoreElement.style.color = "green";
        setTimeout(() => {
          scoreElement.style.color = "white";
        }, 250);
        apple.move();
        speed -= 3;
      } else {
        this.segments.pop();
      }
    };
    ctx.clearRect(0, 0, width, height);
    snake.move();
    snake.draw("blue");
    apple.draw();
  };
  gameLoop();
  let directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    87: "up",
    65: "left",
    83: "down",
    68: "right",
  };
  document.body.addEventListener("keydown", function (event) {
    let newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
      snake.setDirection(newDirection);
    }
  });
});

timed.addEventListener("click", () => {
  cover.style.display = "none";
  scoreElement.style.display = "block";
  countdown.style.visibility = "visible";
  let snake = new Snake();
  let apple = new Apple();
  let seconds = 30;
  let over = false;
  let count = setInterval(() => {
    seconds--;
    if (seconds <= 9) {
      countdown.innerHTML = `0:0${seconds}`;
      if (seconds <= 0) {
        countdown.style.visibility = "hidden";
        over = true;
      }
    } else {
      countdown.innerHTML = `0:${seconds}`;
    }
  }, 1000);
  let gameLoop = function () {
    let timeOut = setTimeout(gameLoop, speed);
    let gameOver = function () {
      clearTimeout(timeOut);
      clearInterval(count);
      scoreElement.textContent = "Game Over! Score: " + score;
      scoreElement.classList.add("red");
      scoreElement.setAttribute("style", "color: red; display: block;");
    };
    if (over === true) {
      gameOver();
    }
    Snake.prototype.move = function () {
      let head = this.segments[0];
      let newHead;
      this.direction = this.nextDirection;
      if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row);
      } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
      } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
      } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
      }
      if (this.checkCollision(newHead)) {
        gameOver();
        return;
      }
      this.segments.unshift(newHead);
      if (newHead.equal(apple.position)) {
        munch.play();
        score++;
        scoreElement.innerHTML = "Score: " + score;
        scoreElement.style.color = "green";
        setTimeout(() => {
          scoreElement.style.color = "white";
        }, 250);
        apple.move();
        speed -= 3;
      } else {
        this.segments.pop();
      }
    };
    ctx.clearRect(0, 0, width, height);
    snake.move();
    snake.draw("blue");
    apple.draw();
  };
  gameLoop();
  let directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    87: "up",
    65: "left",
    83: "down",
    68: "right",
  };
  document.body.addEventListener("keydown", function (event) {
    let newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
      snake.setDirection(newDirection);
    }
  });
});
