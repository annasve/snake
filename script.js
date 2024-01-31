//listeners
document.addEventListener('keydown', keyPush);

//the canvas
const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
console.log(ctx);

//game stuff
const title = document.querySelector('.score');

let score = 0;

const fps = 10;

//the snake
const snakeSize = 50;
let snakeSpeed = snakeSize;
let snakePosX = 0;
let snakePosY = canvas.height / 2;

let velocityX = 1;
let velocityY = 0;

//food
let foodPosX, foodPosY;

//grid tiles
const tileCountX = canvas.width / snakeSize;
const tileCountY = canvas.height / snakeSize;

///////////////////
//snake move loop
function gameLoop() {
  moveStuff();
  drawStuff();
  setTimeout(gameLoop, 1000 / fps); //framerate {fps} frames per second
}

//(run on startup)
gameLoop();
resetFood();

function moveStuff() {
  //the snake moves
  snakePosX += snakeSpeed * velocityX;
  snakePosY += snakeSpeed * velocityY;

  //wall collision
  if (snakePosX > canvas.width - snakeSize) {
    snakePosX = 0;
  }
  if (snakePosX < 0) {
    snakePosX = canvas.width;
  }
  if (snakePosY > canvas.height - snakeSize) {
    snakePosY = 0;
  }
  if (snakePosY < 0) {
    snakePosY = canvas.height;
  }

  //food collision
  if (foodPosX === snakePosX && snakePosY === foodPosY) {
    score++;
    title.textContent = score;
    resetFood();
  }
}

function drawStuff() {
  ////background
  rectangle('#C9A0DC', 0, 0, canvas.width, canvas.height);

  ////grid
  drawGrid();

  ////snake
  rectangle('#a0dcc9', snakePosX, snakePosY, snakeSize, snakeSize);

  ////food
  rectangle('fuchsia', foodPosX, foodPosY, snakeSize, snakeSize);
}

function rectangle(color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

/////////////////////////////////////////////

// //keyboard controls - improved version - the snake moves on its own, you only give it directions
function keyPush(evt) {
  switch (evt.key) {
    //condition: prevent going to the opposite direction (down) right "through" its body
    case 'ArrowLeft':
      if (velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
      }
      break;
    case 'ArrowRight':
      if (velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
      }
      break;
    case 'ArrowUp':
      if (velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
      }
      break;
    case 'ArrowDown':
      if (velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
      }
      break;
  }
}

// //grid
function drawGrid() {
  for (let i = 0; i < tileCountX; i++) {
    for (let j = 0; j < tileCountY; j++) {
      rectangle(
        '#fff',
        snakeSize * i,
        snakeSize * j,
        snakeSize - 1,
        snakeSize - 1,
      );
    }
  }
}

//random food position
function resetFood() {
  foodPosX = Math.floor(Math.random() * tileCountX) * snakeSize;
  foodPosY = Math.floor(Math.random() * tileCountY) * snakeSize;
  //snakeSize - represents tile width
}
